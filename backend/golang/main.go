package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"go-dashboard/handlers"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/api/books", handlers.GetBooks)
	router.GET("/api/blogs", handlers.GetBlogs)
	router.GET("/api/containers", handlers.GetContainers)
	router.GET("/api/images", handlers.GetImages)

	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
