package config

import (
	"context"
	"encoding/json"
	"fmt"
	"go-dashboard/models"
	"log"
	"os"
	"time"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var Config Configuration

type Configuration struct {
	Mock    bool
	API     map[string]struct{ Mock bool }
	MongoDB struct {
		HOST     string `mapstructure:"host"`
		Port     int    `mapstructure:"port"`
		Database string `mapstructure:"database"`
		Username string `mapstructure:"username"`
		Password string `mapstructure:"password"`
	} `mapstructure:"mongodb"`
}

func LoadConfig() {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Failed to read config file: %s", err)
	}
	err := viper.Unmarshal(&Config)
	if err != nil {
		log.Fatalf("Failed to unmarshal config: %v", err)
	}
}

func ConnectMongoDB() *mongo.Client {
	LoadConfig()
	// 构建 MongoDB 连接的 URI
	uri := fmt.Sprintf("mongodb://%s:%s@%s:%d",
		Config.MongoDB.Username,
		Config.MongoDB.Password,
		Config.MongoDB.HOST,
		Config.MongoDB.Port,
	)

	// 设置连接超时时间为 30 秒
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// 连接到 MongoDB
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping MongoDB
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	fmt.Println("Connected to MongoDB successfully")
	return client
}

func InitMockData(client *mongo.Client, databaseName string, collectionName string, mockDataFilePath string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 讀取mockData.json檔案
	bytes, err := os.ReadFile(mockDataFilePath)
	if err != nil {
		log.Fatalf("Error reading mock data file: %v", err)
	}

	// 解析JSON數據
	var blogs []models.Blog
	if err := json.Unmarshal(bytes, &blogs); err != nil {
		log.Fatalf("Error unmarshalling mock data: %v", err)
	}

	// for i := range blogs {
	// 	blogs[i].ID = primitive.NewObjectID()
	// 	for j := range blogs[i].RepoNames {
	// 		blogs[i].RepoNames[j].ID = primitive.NewObjectID()
	// 	}
	// }

	// 獲取集合的句柄
	collection := client.Database(databaseName).Collection(collectionName)

	var documents []interface{}
	for _, blog := range blogs {
		documents = append(documents, blog)
	}

	// 插入數據到MongoDB
	result, err := collection.InsertMany(ctx, documents)
	if err != nil {
		log.Fatalf("Error inserting mock data into MongoDB: %v", err)
	}

	fmt.Printf("Inserted %d documents into collection %s\n", len(result.InsertedIDs), collectionName)
}

func ShouldMock(apiName string) bool {
	globalMock := Config.Mock
	apiMockPath := "api." + apiName + ".mock"
	// apiMock := fmt.Sprintf("api.%s.mock", apiName)
	if viper.IsSet(apiMockPath) {
		return viper.GetBool(apiMockPath)
		// return Config.API[apiName].Mock
	} else {
		return globalMock
	}
}
