export default {
  getBooks: () => {
    return {
      code: 200,
      data: {
        bookData: [
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
      code: 200,
      data: {
        blogData: [
          {
            title: 'DevOps',
            repoNames: [
              {
                blogName: "Tony.Wu's Blog",
                tags: ['Devops'],
                url: 'https://www.itnotetk.com/',
              },
              {
                blogName: '运维咖啡吧',
                tags: ['Devops'],
                url: 'https://blog.ops-coffee.cn/',
              },
            ],
          },
          {
            title: 'Backend',
            repoNames: [
              {
                blogName: 'Learn or Die',
                tags: ['GCP', 'Devops'],
                url: 'https://tn710617.github.io/zh-tw/about/',
              },
              {
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
}
