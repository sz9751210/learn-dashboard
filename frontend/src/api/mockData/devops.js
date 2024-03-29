export default {
  getBooks: () => {
    return {
      status: 200,
      data: {
        data: [
          {
            title: '鳳凰專案｜看 IT部門如何讓公司從谷底翻身的傳奇故事',
            coverUrl:
              'https://cf-assets2.tenlong.com.tw/products/images/000/110/186/original/9789864765867.jpg?1525539935',
            authors: ['Gene Kim', 'Kevin Behr'],
            content: '看 IT部門如何讓公司從谷底翻身的傳奇故事',
            tags: ['devops'],
            url: 'https://example.com',
          },
          {
            title: '學徒模式－優秀軟體開發者的養成之路',
            coverUrl: 'https://cf-assets1.tenlong.com.tw/images/64457/original/A277.jpg',
            authors: ['Dave Hoover', 'Adewale Oshineye'],
            content:
              '你是否盡力延長作為軟體開發人員的職涯？在今日快速變化與技術的持續擴展，成功需要的不只是對技術的精通，為了專業地成長，你還需要軟性技能與有效學習的能力，本書內容是關於如何精進這些技能。Dave Hoover與Adewale Oshineye兩位作者收錄了許多行為模式，能幫助你讓個人技藝的各個基本面向更加完善。收錄了多年的研究、許多面談訪問以及歐萊禮線上論壇的回應，書中的模式包含了程式設計師、系統管理人員與設計師每天都會接觸到的困難狀況。這並不僅與財務上的成功有關，學徒模式也把軟體開發視作個人滿足的工具之一，閱讀本書能幫助你在生活與職涯兩方面都獲得最好的結果。',
            tags: ['self-development'],
            url: 'https://example.com',
          },
        ],
      },
    }
  },
  getBlogs: () => {
    return {
      status: 200,
      data: {
        data: [
          {
            id: 1, // 給每個 category 增加一個唯一的 id
            title: 'DevOps',
            repoNames: [
              {
                id: 101, // 給每個 blog 增加一個唯一的 id
                blogName: "Tony.Wu's Blog",
                tags: ['Devops'],
                url: 'https://www.itnotetk.com/',
              },
              {
                id: 102, // 確保每個 id 都是唯一的
                blogName: '运维咖啡吧',
                tags: ['Devops'],
                url: 'https://blog.ops-coffee.cn/',
              },
            ],
          },
          {
            id: 2, // 繼續為每個 category 指定唯一的 id
            title: 'Backend',
            repoNames: [
              {
                id: 201,
                blogName: 'Learn or Die',
                tags: ['GCP', 'Devops'],
                url: 'https://tn710617.github.io/zh-tw/about/',
              },
              {
                id: 202,
                blogName: 'Alan Tsai 的學習筆記',
                tags: ['Devops', 'Azure', 'Docker'],
                url: 'https://blog.alantsai.net/',
              },
            ],
          },
        ],
      },
    }
  },
  getRoadmap: () => {
    return {
      status: 200,
      data: {
        data: [
          {
            title: 'Learn a Programming Language',
            cardList: [
              {
                title: 'Python',
                desc: 'Python 是一门广泛使用的高级编程语言，以其清晰的语法和代码可读性而闻名。',
                link: 'https://www.python.org/',
              },
              {
                title: 'Golang',
                desc: 'Go 是由 Google 开发的一种静态强类型、编译型语言，以其并发机制和高效的性能而受到赞赏。',
                link: 'https://go.dev/',
              },
              {
                title: 'JavaScript',
                desc: 'JavaScript 是一种广泛用于网页开发的脚本语言，它使得网页可以实现客户端的脚本行为。',
                link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
              },
            ],
          },
          {
            title: 'Operating Systems',
            cardList: [
              {
                title: 'Linux',
                desc: 'Linux 是一种开源操作系统，广泛用于服务器、桌面和嵌入式系统中。',
                link: 'https://www.linux.org/',
              },
              {
                title: 'Windows',
                desc: 'Windows 是由微软开发的一系列操作系统家族，广泛用于个人电脑、服务器和移动设备中。',
                link: 'https://www.microsoft.com/en-us/windows',
              },
              {
                title: 'MacOS',
                desc: 'MacOS 是苹果公司为其Mac系列电脑开发的操作系统，以其优雅的用户界面和强大的性能而闻名。',
                link: 'https://www.apple.com/macos/',
              },
            ],
          },
          {
            title: 'VCS Hosting',
            cardList: [
              {
                title: 'GitHub',
                desc: 'GitHub 是一个基于 Git 的代码托管和协作平台，让软件开发项目的版本控制和协作变得更加高效。',
                link: 'https://github.com/',
              },
              {
                title: 'GitLab',
                desc: 'GitLab 是一个全面的 DevOps 平台，集成了代码托管、CI/CD 和监控等功能。',
                link: 'https://about.gitlab.com/',
              },
              {
                title: 'Git',
                desc: 'Git 是一个开源的分布式版本控制系统，用于高效地处理从小到大的项目版本管理。',
                link: 'https://git-scm.com/',
              },
            ],
          },
          {
            title: 'Containers',
            cardList: [
              {
                title: 'Docker',
                desc: 'Docker 是一个开放平台，用于开发、运送和运行应用程序，提供简单快捷的方式打包应用及其依赖项到一个可移植的容器中，然后发布到任何流行的 Linux 机器或 Windows 服务器。',
                link: 'https://www.docker.com/',
              },
              {
                title: 'Kubernetes',
                desc: 'Kubernetes 是一个开源平台，用于自动化容器化应用程序的部署、扩展和管理，提供了一个用于部署云原生应用的框架。',
                link: 'https://kubernetes.io/',
              },
              {
                title: 'Podman',
                desc: 'Podman 是一个无守护进程的容器引擎，用于开发、管理和运行OCI容器在你的系统上，Podman 提供了一个与 Docker 相类似的命令行界面（CLI），但不需要中央守护进程，并且可以以非特权用户运行。',
                link: 'https://podman.io/',
              },
            ],
          },
          {
            title: 'Cloud Providers',
            cardList: [
              {
                title: 'AWS',
                desc: 'AWS（Amazon Web Services）是全球最全面和广泛采用的云平台，提供超过200项的完整服务。',
                link: 'https://aws.amazon.com/',
              },
              {
                title: 'Azure',
                desc: 'Microsoft Azure 是一个不断扩大的云服务集合，支持计算、网络、数据库、分析、机器学习等服务。',
                link: 'https://azure.microsoft.com/',
              },
              {
                title: 'Google Cloud',
                desc: 'Google Cloud 提供安全的存储、强大的计算能力和集成的数据分析服务，以支持企业的数字转型。',
                link: 'https://cloud.google.com/',
              },
            ],
          },
          {
            title: 'Networks',
            cardList: [
              {
                title: 'VPC',
                desc: '虚拟私有云（VPC）允许用户在云计算环境中逻辑上隔离的部分进行资源配置。',
                link: 'https://aws.amazon.com/vpc/',
              },
              {
                title: 'VPN',
                desc: '虚拟专用网络（VPN）是一种用于增强私密性和安全性的网络技术，通过加密连接远程网络。',
                link: 'https://www.cisco.com/c/en/us/products/security/vpn-endpoint-security-clients/index.html',
              },
              {
                title: 'NAT',
                desc: '网络地址转换（NAT）是一种方法，允许一个IP地址空间中的多个设备通过另一个IP地址空间进行通信。',
                link: 'https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/4606-nat-overload.html',
              },
            ],
          },
          {
            title: 'IaC Providers',
            cardList: [
              {
                title: 'Terraform',
                desc: 'Terraform 是一个开源工具，用于构建、更改和版本控制基础设施安全高效地管理。',
                link: 'https://www.terraform.io/',
              },
              {
                title: 'Ansible',
                desc: 'Ansible 是一个简单的自动化平台，可以处理配置管理、应用程序部署、任务自动化等。',
                link: 'https://www.ansible.com/',
              },
              {
                title: 'Pulumi',
                desc: 'Pulumi 是云开发平台，使用熟悉的编程语言来定义和部署云基础设施。',
                link: 'https://www.pulumi.com/',
              },
            ],
          },
          {
            title: 'CICD',
            cardList: [
              {
                title: 'GitLab CI',
                desc: 'GitLab CI 是 GitLab 提供的持续集成服务，允许自动化地测试和部署代码。',
                link: 'https://docs.gitlab.com/ee/ci/',
              },
              {
                title: 'Jenkins',
                desc: 'Jenkins 是一个开源的自动化服务器，支持多种自动化任务。',
                link: 'https://www.jenkins.io/',
              },
              {
                title: 'Drone',
                desc: 'Drone 是一个自动化持续交付平台，专为快速、简单和高效的软件交付而设计。',
                link: 'https://drone.io/',
              },
              {
                title: 'GitHub Actions',
                desc: 'GitHub Actions 使您能够自动化、自定义和执行您的软件开发工作流程直接在您的GitHub存储库中。',
                link: 'https://github.com/features/actions',
              },
            ],
          },
          {
            title: 'Monitor',
            cardList: [
              {
                title: 'Prometheus',
                desc: 'Prometheus 是一个开源系统监控和警报工具包，设计用于可靠性和快速诊断系统。',
                link: 'https://prometheus.io/',
              },
              {
                title: 'Grafana',
                desc: 'Grafana 是一个开源的指标分析和可视化套件，广泛用于图表、图形和警报。',
                link: 'https://grafana.com/',
              },
              {
                title: 'Zabbix',
                desc: 'Zabbix 是一个企业级的开源监控解决方案，用于监控网络和应用程序的状态。',
                link: 'https://www.zabbix.com/',
              },
            ],
          },
          {
            title: 'Application Monitor',
            cardList: [
              {
                title: 'Jaeger',
                desc: 'Jaeger，用于分布式追踪，它帮助分析和监控微服务架构中的事务流。',
                link: 'https://www.jaegertracing.io/',
              },
              {
                title: 'OpenTelemetry',
                desc: 'OpenTelemetry 提供一套API、库、代理和收集器服务，用于追踪和报告云原生应用的性能。',
                link: 'https://opentelemetry.io/',
              },
              {
                title: 'Datadog',
                desc: 'Datadog 是一个监控和安全平台，用于云应用，集成了实时日志、监控和自动化警报。',
                link: 'https://www.datadoghq.com/',
              },
            ],
          },
          {
            title: 'Logging',
            cardList: [
              {
                title: 'Elasticsearch',
                desc: 'Elasticsearch 是一个分布式搜索和分析引擎，用于处理大量数据的搜索、分析和可视化。',
                link: 'https://www.elastic.co/elasticsearch/',
              },
              {
                title: 'Logstash',
                desc: 'Logstash 是一个开源的服务器端数据处理管道，能够同时从多个源采集数据，转换数据，然后将数据发送到您喜欢的“存储库”中。',
                link: 'https://www.elastic.co/logstash',
              },
              {
                title: 'Kibana',
                desc: 'Kibana 是一个开源的数据可视化仪表板，用于Elasticsearch，提供日志和时间序列分析、应用程序监控和操作UI。',
                link: 'https://www.elastic.co/kibana',
              },
            ],
          },
          {
            title: 'GitOps',
            cardList: [
              {
                title: 'FluxCD',
                desc: 'FluxCD 是一个工具，用于保持Kubernetes集群与Git仓库中的配置同步，实现自动化部署。',
                link: 'https://fluxcd.io/',
              },
              {
                title: 'ArgoCD',
                desc: 'ArgoCD 是一个声明式的、GitOps持续交付工具，用于Kubernetes应用程序的自动部署。',
                link: 'https://argoproj.github.io/argo-cd/',
              },
              {
                title: 'Kustomize',
                desc: 'Kustomize 是一个Kubernetes的配置管理工具，允许用户定制原始、无修改的Kubernetes配置文件。',
                link: 'https://kustomize.io/',
              },
            ],
          },
        ],
      },
    }
  },
  getSSLCerificate: () => {
    return {
      status: 200,
      data: {
        data: [
          {
            domain: 'a.com',
            expiry: '2025-03-19 23:59:59 UTC',
            issuer:
              'CN=Sectigo RSA Domain Validation Secure Server CA,O=Sectigo Limited,L=Salford,ST=Greater Manchester,C=GB',
            subject: 'CN=*.a.com',
            serial_number: '205711757175358895209486912598829571259',
            signature_algorithm: 'SHA256-RSA',
          },
          {
            domain: 'b.com',
            expiry: '2025-02-09 23:59:59 UTC',
            issuer:
              'CN=Sectigo RSA Domain Validation Secure Server CA,O=Sectigo Limited,L=Salford,ST=Greater Manchester,C=GB',
            subject: 'CN=*.b.com',
            serial_number: '205711757175358895209486912598829571259',
            signature_algorithm: 'SHA256-RSA',
          },
        ],
      },
    }
  },
}
