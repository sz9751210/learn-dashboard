package handlers

import (
	"go-dashboard/models"
	"go-dashboard/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BlogHandler struct {
	service *services.BlogService
}

func NewBlogHandeler(service *services.BlogService) *BlogHandler {
	return &BlogHandler{service: service}
}

func (bh *BlogHandler) GetBlogs(c *gin.Context) {
	blogs, err := bh.service.LoadBlogs(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, blogs)
}
func (bh *BlogHandler) CreateBlog(ctx *gin.Context) {
	var newBlog models.Blog
	if err := ctx.ShouldBindJSON(&newBlog); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	createdBlog, err := bh.service.CreateBlog(ctx, newBlog)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, createdBlog)
}
