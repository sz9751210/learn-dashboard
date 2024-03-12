package models

type Blog struct {
	ID        uint   `json:"id"` // 給 Blog 增加一個唯一標識符 ID
	Title     string `json:"title"`
	RepoNames []Repo `json:"repoNames"`
}

type Repo struct {
	ID       uint     `json:"id"` // 給 Repo 增加一個唯一標識符 ID
	BlogName string   `json:"blogName"`
	Tags     []string `json:"tags"`
	Url      string   `json:"url"`
}
