package services

import (
	"fmt"
	"go-dashboard/models"
	"go-dashboard/repository"
	"go-dashboard/utils/ssl"
)

type SSLService struct {
	repo *repository.MongoSSLRepository
}

func NewSSLService(repo *repository.MongoSSLRepository) *SSLService {
	return &SSLService{
		repo: repo,
	}
}

func (s *SSLService) AddSSL(domain string) (*models.SSLInfo, error) {
	fmt.Println("svc ok")
	sslInfo, err := ssl.GetSSLInfo(domain)
	if err != nil {
		return nil, err
	}
	return s.repo.AddSSL(sslInfo)
}
