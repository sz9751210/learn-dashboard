package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Book struct {
	Title    string   `json:"title"`
	CoverUrl string   `json:"coverUrl"`
	Authors  []string `json:"authors"`
	Content  string   `json:"content"`
	Tags     []string `json:"tag"`
	Url      string   `json:"url"`
}

func getBooks(c *gin.Context) {

	books := []Book{
		{
			Title:    "鳳凰專案｜看 IT部門如何讓公司從谷底翻身的傳奇故事",
			CoverUrl: "https://cf-assets2.tenlong.com.tw/products/images/000/110/186/original/9789864765867.jpg?1525539935",
			Authors:  []string{"Gene Kim", "Kevin Behr"},
			Content:  "看 IT部門如何讓公司從谷底翻身的傳奇故事",
			Tags:     []string{"devops"},
			Url:      "https://example.com",
		},
		{
			Title:    "學徒模式－優秀軟體開發者的養成之路",
			CoverUrl: "https://cf-assets1.tenlong.com.tw/images/64457/original/A277.jpg",
			Authors:  []string{"Dave Hoover", "Adewale Oshineye"},
			Content:  "你是否盡力延長作為軟體開發人員的職涯？在今日快速變化與技術的持續擴展，成功需要的不只是對技術的精通，為了專業地成長，你還需要軟性技能與有效學習的能力，本書內容是關於如何精進這些技能。Dave Hoover與Adewale Oshineye兩位作者收錄了許多行為模式，能幫助你讓個人技藝的各個基本面向更加完善。收錄了多年的研究、許多面談訪問以及歐萊禮線上論壇的回應，書中的模式包含了程式設計師、系統管理人員與設計師每天都會接觸到的困難狀況。這並不僅與財務上的成功有關，學徒模式也把軟體開發視作個人滿足的工具之一，閱讀本書能幫助你在生活與職涯兩方面都獲得最好的結果。",
			Tags:     []string{"self-development"},
			Url:      "https://example.com",
		},
	}
	c.JSON(http.StatusOK, books)
}

func main() {
	r := gin.Default()

	// 設定CORS，以允許來自特定源的請求
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3100"},                            // 允許這個源的跨域請求
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}, // 允許的HTTP方法
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // 允許前端請求攜帶認證信息（cookies）
	}))
	r.GET("/api/getBooks", getBooks)
	r.Run(":8080")
}
