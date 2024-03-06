package models

type ContainerInfo struct {
	Name   string  `json:"name"`
	Image  string  `json:"image"`
	Status string  `json:"status"`
	CPU    float64 `json:"cpu"`
	Ports  []int   `json:"ports"`
	Memory float64 `json:"memory"`
}
