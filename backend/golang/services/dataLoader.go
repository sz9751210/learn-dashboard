package services

import (
	"encoding/json"
	"os"
	"go-dashboard/models"
	"path/filepath"
)

func LoadBooks() ([]models.Book, error) {
	var books []models.Book
	err := loadDataFromFile(filepath.Join("mockData", "books.json"), &books)
	return books, err
}

func LoadContainers() ([]models.ContainerInfo, error) {
	var containers []models.ContainerInfo
	err := loadDataFromFile(filepath.Join("mockData", "containers.json"), &containers)
	return containers, err
}

func LoadBlogs() ([]models.Blog, error) {
	var blogs []models.Blog
	err := loadDataFromFile(filepath.Join("mockData", "blogs.json"), &blogs)
	return blogs, err
}

func LoadImages() ([]models.DockerImage, error) {
	var images []models.DockerImage
	err := loadDataFromFile(filepath.Join("mockData", "images.json"), &images)
	return images, err
}

func loadDataFromFile(filePath string, data interface{}) error {
	fileBytes, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}
	err = json.Unmarshal(fileBytes, data)
	return err
}
