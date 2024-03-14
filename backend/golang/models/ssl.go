package models

type SSLInfo struct {
	Domain             string `json:"domain"`
	Expiry             string `json:"expiry"`
	Issuer             string `json:"issuer"`
	Subject            string `json:"subject"`
	SerialNumber       string `json:"serial_number"`
	SignatureAlgorithm string `json:"signature_algorithm"`
}
