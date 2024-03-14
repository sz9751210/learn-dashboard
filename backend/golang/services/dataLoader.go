package services

import (
	"encoding/json"
	"go-dashboard/config"
	"go-dashboard/models"
	"go-dashboard/utils/docker"
	"os"
	"path/filepath"
)

func LoadBooks() ([]models.Book, error) {
	if config.ShouldMock("getBooks") {
		var books []models.Book
		err := loadDataFromFile(filepath.Join("mockData", "books.json"), &books)
		return books, err
	} else {
		return nil, nil
	}
}

func LoadBlogs() ([]models.Blog, error) {
	if config.ShouldMock("getBlogs") {
		var blogs []models.Blog
		err := loadDataFromFile(filepath.Join("mockData", "blogs.json"), &blogs)
		return blogs, err
	} else {
		return nil, nil
	}
}

func LoadImages() ([]models.DockerImage, error) {
	if config.ShouldMock("getImages") {
		var images []models.DockerImage
		err := loadDataFromFile(filepath.Join("mockData", "images.json"), &images)
		return images, err
	} else {
		return docker.LoadImagesFromDockerCLI()
	}
}

func LoadContainers() ([]models.ContainerInfo, error) {
	if config.ShouldMock("getContainers") {

		var containers []models.ContainerInfo
		err := loadDataFromFile(filepath.Join("mockData", "containers.json"), &containers)
		return containers, err
	} else {
		return docker.LoadContainersFromDockerAPI()
	}
}

func LoadSSL() ([]models.SSLInfo, error) {
	if config.ShouldMock("getSSL") {

		var ssls []models.SSLInfo
		err := loadDataFromFile(filepath.Join("mockData", "ssl.json"), &ssls)
		return ssls, err
	} else {
		return nil, nil
	}
}

func loadDataFromFile(filePath string, data interface{}) error {
	fileBytes, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}
	err = json.Unmarshal(fileBytes, data)
	return err
}
