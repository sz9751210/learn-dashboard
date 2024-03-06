package handlers

import (
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBlogs(c *gin.Context) {
	blogs, err := services.LoadBlogs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, blogs)
}
