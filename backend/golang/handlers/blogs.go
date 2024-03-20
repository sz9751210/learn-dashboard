package handlers

import (
	"fmt"
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetBlogs(client *mongo.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		blogs, err := services.LoadBlogs(client)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, blogs)
	}
}
