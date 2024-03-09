export default {
  getContainers: () => {
    return {
      code: 200,
      data: {
        containerData: [
          {
            id: '1',
            name: 'kubemanage',
            image: 'kubernetes:latest',
            status: 'Exited',
            cpu: 0,
            ports: '8080',
            memory: 0,
          },
          {
            id: '2',
            name: 'mysql-1',
            image: 'mysql:8.0',
            status: 'Exited',
            cpu: 1.4,
            ports: '3306',
            memory: 4.1,
          },
        ],
      },
    }
  },
  getImages: () => {
    return {
      code: 200,
      data: {
        imageData: [
          { id: '1', repository: 'nginx', tag: 'latest', size: '132MB' },
          { id: '2', repository: 'redis', tag: 'alpine', size: '27MB' },
        ],
      },
    }
  },
}
