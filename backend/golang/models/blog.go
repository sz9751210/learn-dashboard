package models

type Blog struct {
	Title     string `json:"title"`
	RepoNames []Repo `json:"repoNames"`
}

type Repo struct {
	BlogName string   `json:"blogName"`
	Tags     []string `json:"tags"`
	Url      string   `json:"url"`
}
