package handlers

import (
	"go-dashboard/services"
	"net/http"
	"github.com/gin-gonic/gin"
)

type BlogHandler struct {
	service *services.BlogService
}

func NewBlogHandeler(service *services.BlogService) *BlogHandler {
	return &BlogHandler{service: service}
}

// func GetBlogs(client *mongo.Client) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		blogs, err := services.LoadBlogs(client)
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}
// 		c.JSON(http.StatusOK, blogs)
// 	}
// }

func (bh *BlogHandler) GetBlogs(c *gin.Context) {
	blogs, err := bh.service.LoadBlogs(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, blogs)
}