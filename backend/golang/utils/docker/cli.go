package docker

import (
	"encoding/json"
	"go-dashboard/models"
	"os/exec"
	"strings"
)

// LoadImagesFromDockerCLI 调用Docker CLI获取镜像信息
func LoadImagesFromDockerCLI() ([]models.DockerImage, error) {
	cmd := exec.Command("docker", "images", "--format", `{"ID": "{{.ID}}", "Repository": "{{.Repository}}", "Tag": "{{.Tag}}", "Size": "{{.Size}}"}`)
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(output), "\n")
	var images []models.DockerImage
	for _, line := range lines {
		if line == "" {
			continue
		}
		var img models.DockerImage
		if err := json.Unmarshal([]byte(line), &img); err != nil {
			return nil, err
		}
		images = append(images, img)
	}

	return images, nil
}

func LoadContainersFromDockerCLI() ([]models.ContainerInfo, error) {
	cmd := exec.Command("docker", "container", "ls", "--format", `{"Name": "{{.Names}}", "Image": "{{.Image}}", "Status": "{{.Status}}", "Ports": "{{.Ports}}", "Size": "{{.Size}}"}`)
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(output), "\n")
	var containers []models.ContainerInfo
	for _, line := range lines {
		if line == "" {
			continue
		}
		var container models.ContainerInfo
		if err := json.Unmarshal([]byte(line), &container); err != nil {
			return nil, err
		}
		containers = append(containers, container)
	}

	return containers, nil
}
