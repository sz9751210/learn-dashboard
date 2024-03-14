package handlers

import (
	"crypto/tls"
	"fmt"
	"go-dashboard/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetSSLCertificateInfo(c *gin.Context) {
	domain := c.Query("domain")

	// 建立到域名的 TLS 連接
	conn, err := tls.Dial("tcp", domain+":443", nil)
	if err != nil {
		c.JSON(500, gin.H{"error": fmt.Sprintf("failed to connect: %v", err)})
		return
	}
	defer conn.Close()

	// 獲取遠端的 SSL 證書
	certs := conn.ConnectionState().PeerCertificates
	if len(certs) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no certificates found"})
		return
	}

	cert := certs[0]
	sslInfo := models.SSLInfo{
		Domain:             domain,
		Expiry:             cert.NotAfter.Format("2006-01-02 15:04:05 MST"),
		Issuer:             cert.Issuer.String(),
		Subject:            cert.Subject.String(),
		SerialNumber:       cert.SerialNumber.String(),
		SignatureAlgorithm: cert.SignatureAlgorithm.String(),
	}

	c.JSON(http.StatusOK, sslInfo)

}
