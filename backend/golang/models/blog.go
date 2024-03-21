package models

type Blog struct {
	Title     string `json:"title" bson:"title"`
	RepoNames []Repo `json:"repoNames" bson:"repoNames"`
}

type Repo struct {
	BlogName string   `json:"blogName" bson:"blogName"`
	Tags     []string `json:"tags" bson:"tags"`
	Url      string   `json:"url" bson:"url"`
}
