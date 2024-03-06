package docker

import (
    "os/exec"
    "strings"
    "go-dashboard/models"
    "encoding/json"
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
