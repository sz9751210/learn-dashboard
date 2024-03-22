package ssl

import (
	"crypto/tls"
	"fmt"
	"go-dashboard/models"
	"time"
)

func GetSSLInfo(domain string) (*models.SSLInfo, error) {

	conn, err := tls.Dial("tcp", domain+":443", nil)
	if err != nil {
		// c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to connect: %v", err)})
		return nil, fmt.Errorf("Failed to connect: %v", err)
	}
	defer conn.Close()

	cert := conn.ConnectionState().PeerCertificates[0]
	info := models.SSLInfo{
		Domain:             domain,
		Expiry:             cert.NotAfter.Format(time.RFC3339),
		Issuer:             cert.Issuer.CommonName,
		Subject:            cert.Subject.CommonName,
		SerialNumber:       cert.SerialNumber.String(),
		SignatureAlgorithm: cert.SignatureAlgorithm.String(),
	}

	// c.JSON(http.StatusOK, info)
	return &info, nil
}
