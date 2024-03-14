package handlers

import (
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSSL(c *gin.Context) {
	ssls, err := services.LoadSSL()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, ssls)
}
