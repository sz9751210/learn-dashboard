package handlers

import (
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetContainers(c *gin.Context) {
	containers, err := services.LoadContainers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, containers)
}
