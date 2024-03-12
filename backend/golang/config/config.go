package config

import (
	"context"
	"fmt"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"time"
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
