package handlers

import (
	"github.com/gin-gonic/gin"
	"go-dashboard/services"
	"net/http"
)

func GetBooks(c *gin.Context) {
	books, err := services.LoadBooks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, books)
}
