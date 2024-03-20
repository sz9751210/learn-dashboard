package repository

import (
	"context"
	"go-dashboard/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoBlogRepository struct {
	client *mongo.Client
}

func NewMongoBlogRepository(client *mongo.Client) *MongoBlogRepository {
	return &MongoBlogRepository{client: client}
}

func (r *MongoBlogRepository) LoadBlogs(ctx context.Context) ([]models.Blog, error) {
	var blogs []models.Blog

	collection := r.client.Database("go-dashboard").Collection("blogs")
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var blog models.Blog
		if err := cursor.Decode(&blog); err != nil {
			return nil, err
		}
		blogs = append(blogs, blog)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return blogs, nil
}

func (r *MongoBlogRepository) CreateBlog(ctx context.Context, blog models.Blog) (*mongo.InsertOneResult, error) {
	collection := r.client.Database("go-dashboard").Collection("blogs")
	result, err := collection.InsertOne(ctx, blog)
	return result, err
}

func (r *MongoBlogRepository) UpdateBlog(ctx context.Context, blog models.Blog) (*mongo.UpdateResult, error) {
	collection := r.client.Database("go-dashboard").Collection("blogs")
	filter := bson.M{"_id": blog.ID}
	update := bson.M{"$set": blog}
	result, err := collection.UpdateOne(ctx, filter, update)
	return result, err
}

func (r *MongoBlogRepository) UpdateRepo(ctx context.Context, blogID primitive.ObjectID, repo models.Repo) error {
	collection := r.client.Database("go-dashboard").Collection("blogs")
	filter := bson.M{"_id": blogID, "repoNames.id": repo.ID}
	update := bson.M{"$set": bson.M{"repoNames.$": repo}}
	_, err := collection.UpdateOne(ctx, filter, update)
	return err
}
