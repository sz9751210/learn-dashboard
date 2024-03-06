package handlers

import (
	"github.com/gin-gonic/gin"
	"go-dashboard/services"
	"net/http"
)

func GetImages(c *gin.Context) {
	images, err := services.LoadImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, images)
}
