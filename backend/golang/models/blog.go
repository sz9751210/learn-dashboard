package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BlogRepository interface {
	LoadBlogs(ctx context.Context) ([]Blog, error)
}

type Blog struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title"`
	RepoNames []Repo             `json:"repoNames" bson:"repoNames"`
}

type Repo struct {
	ID       primitive.ObjectID `json:"id" bson:"id,omitempty"`
	BlogName string             `json:"blogName" bson:"blogName"`
	Tags     []string           `json:"tags" bson:"tags"`
	Url      string             `json:"url" bson:"url"`
}
