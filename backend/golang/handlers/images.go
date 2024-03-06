package handlers

import (
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetImages(c *gin.Context) {
	images, err := services.LoadImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, images)
}
