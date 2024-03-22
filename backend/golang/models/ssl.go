package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type SSLInfo struct {
    ID                 primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
    Domain             string             `bson:"domain" json:"domain"`
    Expiry             string             `bson:"expiry" json:"expiry"`
    Issuer             string             `bson:"issuer" json:"issuer"`
    Subject            string             `bson:"subject" json:"subject"`
    SerialNumber       string             `bson:"serial_number" json:"serial_number"`
    SignatureAlgorithm string             `bson:"signature_algorithm" json:"signature_algorithm"`
}