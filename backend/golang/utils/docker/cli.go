package docker

import (
	"context"
	"encoding/json"
	"fmt"
	"go-dashboard/models"
	"log"
	"os/exec"
	"strconv"
	"strings"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
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

func LoadContainersFromDockerAPI() ([]models.ContainerInfo, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Printf("創建 Docker 客戶端時出錯: %v", err)
		return nil, err
	}

	containers, err := cli.ContainerList(context.Background(), container.ListOptions{All: true})
	if err != nil {
		log.Printf("列出 Docker 容器時出錯: %v", err)
		return nil, err
	}

	var containerInfos []models.ContainerInfo
	for _, c := range containers {
		cpuUsage, memUsage := LoadContainerStatsFromCLI(c.ID)

		portInfo := formatPorts(c.Ports)
		containerInfo := models.ContainerInfo{
			Name:   strings.TrimPrefix(c.Names[0], "/"),
			Image:  c.Image,
			Status: c.State,
			Ports:  portInfo,
			CPU:    cpuUsage,
			Memory: memUsage,
		}
		containerInfos = append(containerInfos, containerInfo)
	}

	return containerInfos, nil
}

func LoadContainerStatsFromCLI(containerID string) (cpuUsage float64, memUsage float64) {
	cmd := exec.Command("docker", "stats", "--no-stream", "--format", "{{.CPUPerc}} {{.MemUsage}}", containerID)
	output, err := cmd.Output()
	if err != nil {
		log.Printf("執行 docker stats 失敗: %v", err)
		return 0.0, 0.0
	}

	stats := strings.Fields(string(output))
	if len(stats) < 2 {
		log.Println("無法解析 docker stats 輸出")
		return 0.0, 0.0
	}

	cpuUsageStr := strings.TrimSuffix(stats[0], "%")
	cpuUsage, err = strconv.ParseFloat(cpuUsageStr, 64)
	if err != nil {
		log.Printf("解析 CPU 使用率失敗: %v", err)
		cpuUsage = 0.0
	}

	memUsageStr := strings.Fields(stats[1])[0]           // Assuming MemUsage is in the format "usage/total"
	memUsageStr = strings.TrimSuffix(memUsageStr, "MiB") // Remove the "MiB" unit
	memUsage, err = strconv.ParseFloat(memUsageStr, 64)
	if err != nil {
		log.Printf("解析內存使用量失敗: %v", err)
		memUsage = 0.0
	}

	return cpuUsage, memUsage
}

// formatPorts formats the port information for display.
func formatPorts(ports []types.Port) string {
	portInfo := ""
	for _, p := range ports {
		portInfo += fmt.Sprintf("%d->%d/%s ", p.PrivatePort, p.PublicPort, p.Type)
	}
	return portInfo
}
