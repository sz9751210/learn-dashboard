package main

import (
	"context"
	"go-dashboard/config"
	"go-dashboard/handlers"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.LoadConfig()
	client := config.ConnectMongoDB()
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:3100", "http://localhost:3100"},   // 允許這個源的跨域請求
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}, // 允許的HTTP方法
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // 允許前端請求攜帶認證信息（cookies）
	}))

	router.GET("/api/books", handlers.GetBooks)
	router.GET("/api/blogs", handlers.GetBlogs)
	router.GET("/api/containers", handlers.GetContainers)
	router.GET("/api/images", handlers.GetImages)
	// router.GET("/api/ssl", handlers.GetSSLCertificateInfo)
	router.GET("/api/ssl", handlers.GetSSL)

	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
