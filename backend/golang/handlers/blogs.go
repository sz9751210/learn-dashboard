package handlers

import (
	"github.com/gin-gonic/gin"
	"go-dashboard/services"
	"net/http"
)

func GetBlogs(c *gin.Context) {
	blogs, err := services.LoadBlogs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, blogs)
}
