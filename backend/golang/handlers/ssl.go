package handlers

import (
	"fmt"
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SSLHandler struct {
	service *services.SSLService
}

func NewSSLHandler(service *services.SSLService) *SSLHandler {
	return &SSLHandler{service: service}
}

// func GetSSL(c *gin.Context) {
// 	ssls, err := services.LoadSSL()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, ssls)
// }

// func GetSSL(c *gin.Context) {
// 	domain := c.Query("domain")
// 	fmt.Println(domain)
// 	ssl, err := services.GetSSLCertificates(domain)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, ssl)
// }

func (sh *SSLHandler) AddSSL(ctx *gin.Context) {
	// domain := ctx.Query("domain")
	domain := ctx.PostForm("domain")
	fmt.Println(domain)
	ssl, err := sh.service.AddSSL(domain)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, ssl)
}

func (sh *SSLHandler) GetSSL(ctx *gin.Context) {
	domain := ctx.Query("domain")
	fmt.Println(domain)
	ssl, err := sh.service.GetSSLCertificates(domain)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, ssl)
}
