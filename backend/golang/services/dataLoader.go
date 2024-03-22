package services

import (
	"context"
	"encoding/json"
	"go-dashboard/config"
	"go-dashboard/models"
	"go-dashboard/repository"
	"go-dashboard/utils/docker"
	"go-dashboard/utils/ssl"
	"os"
	"path/filepath"
)

type BlogService struct {
	repo *repository.MongoBlogRepository
}

func NewBlogService(repo *repository.MongoBlogRepository) *BlogService {
	return &BlogService{
		repo: repo,
	}
}

func LoadBooks() ([]models.Book, error) {
	if config.ShouldMock("getBooks") {
		var books []models.Book
		err := loadDataFromFile(filepath.Join("mockData", "books.json"), &books)
		return books, err
	} else {
		return nil, nil
	}
}

func (bs *BlogService) LoadBlogs(ctx context.Context) ([]models.Blog, error) {
	if config.ShouldMock("getBlogs") {
		var blogs []models.Blog
		err := loadDataFromFile(filepath.Join("mockData", "blogs.json"), &blogs)
		return blogs, err
	} else {
		// ctx := context.TODO()
		// repo := repository.NewMongoBlogRepository(client)
		// return repo.LoadBlogs(ctx)
		return bs.repo.LoadBlogs(ctx)
	}
}

func (bs *BlogService) GetBlogByTitle(ctx context.Context, title string) (*models.Blog, error) {
	return bs.repo.FindBlogByTitle(ctx, title)
}

func (bs *BlogService) GetRepoByName(ctx context.Context, name string) (*models.Repo, error) {
	return bs.repo.FindRepoByName(ctx, name)
}

// func (bs *BlogService) CreateBlog(ctx context.Context, blog models.Blog) (*models.Blog, error) {
// 	blog.RepoNames[0].ID = primitive.NewObjectID()

// 	result, err := bs.repo.CreateBlog(ctx, blog)
// 	if err != nil {
// 		return nil, err
// 	}

// 	blog.ID = result.InsertedID.(primitive.ObjectID)
// 	return &blog, nil
// }

// func (bs *BlogService) UpdateBlog(ctx context.Context, blog models.Blog) (*models.Blog, error) {
// 	_, err := bs.repo.UpdateBlog(ctx, blog)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &blog, nil
// }

// func (bs *BlogService) UpdateRepo(ctx context.Context, blogID primitive.ObjectID, repo models.Repo) error {
// 	return bs.repo.UpdateRepo(ctx, blogID, repo)
// }

// func (bs *BlogService) UpdateBlogDetail(ctx context.Context, blogID string, blogUpdate models.BlogUpdate) error {
// 	return bs.repo.UpdateBlogDetail(ctx, blogID, blogUpdate)
// }

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

func GetSSLCertificates(domain string) (*models.SSLInfo, error) {
	return ssl.GetSSLInfo(domain)
}

func loadDataFromFile(filePath string, data interface{}) error {
	fileBytes, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}
	err = json.Unmarshal(fileBytes, data)
	return err
}
