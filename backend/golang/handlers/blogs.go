package handlers

import (
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

func (bh *BlogHandler) GetBlogByTitle(ctx *gin.Context) {
	title := ctx.Param("title")

	blog, err := bh.service.GetBlogByTitle(ctx, title)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, blog)
}

func (bh *BlogHandler) GetRepoByName(ctx *gin.Context) {
	name := ctx.Query("blogName")

	repo, err := bh.service.GetRepoByName(ctx, name)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, repo)
}

// func (bh *BlogHandler) CreateBlog(ctx *gin.Context) {
// 	var newBlog models.Blog
// 	if err := ctx.ShouldBindJSON(&newBlog); err != nil {
// 		ctx.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	createdBlog, err := bh.service.CreateBlog(ctx, newBlog)
// 	if err != nil {
// 		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	ctx.JSON(http.StatusCreated, createdBlog)
// }

// func (bh *BlogHandler) UpdateBlog(c *gin.Context) {
// 	var blog models.Blog

// 	if err := c.ShouldBindJSON(&blog); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	id, err := primitive.ObjectIDFromHex(c.Param("id"))
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
// 		return
// 	}
// 	blog.ID = id

// 	updatedBlog, err := bh.service.UpdateBlog(c, blog)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, updatedBlog)
// }

// func (bh *BlogHandler) UpdateRepo(c *gin.Context) {
// 	var repo models.Repo
// 	fmt.Print("ok")
// 	if err := c.ShouldBindJSON(&repo); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	blogID, err := primitive.ObjectIDFromHex(c.Param("blogID"))
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog ID format"})
// 		return
// 	}
// 	repoID, err := primitive.ObjectIDFromHex(c.Param("repoID"))
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid repo ID format"})
// 		return
// 	}
// 	repo.ID = repoID

// 	err = bh.service.UpdateRepo(c, blogID, repo)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "Repo updated successfully"})
// }

// func (bh *BlogHandler) UpdateBlogDetail(c *gin.Context) {
// 	var blogUpdate models.BlogUpdate
// 	if err := c.ShouldBindJSON(&blogUpdate); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	blogID := c.Param("id")
// 	if err := bh.service.UpdateBlogDetail(c, blogID, blogUpdate); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "Blog detail updated successfully"})
// }
