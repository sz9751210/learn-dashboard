package repository

import (
	"context"
	"fmt"
	"go-dashboard/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoSSLRepository struct {
	client *mongo.Client
}

func NewMongoSSLRepository(client *mongo.Client) *MongoSSLRepository {
	return &MongoSSLRepository{client: client}
}

func (r *MongoSSLRepository) AddSSL(info *models.SSLInfo) (*models.SSLInfo, error) {
	fmt.Println("repo ok")
	collection := r.client.Database("go-dashboard").Collection("ssl")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctx, info)
	if err != nil {
		return nil, err
	}
	// 更新 info 結構以包含 MongoDB 分配的 _id
	id, ok := result.InsertedID.(primitive.ObjectID)
	if ok {
		info.ID = id
	}
	return info, nil
}

