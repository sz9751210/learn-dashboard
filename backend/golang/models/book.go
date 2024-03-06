package models

type Book struct {
	Title    string   `json:"title"`
	CoverUrl string   `json:"coverUrl"`
	Authors  []string `json:"authors"`
	Content  string   `json:"content"`
	Tags     []string `json:"tags"`
	Url      string   `json:"url"`
}
