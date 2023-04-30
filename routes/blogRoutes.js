const express = require("express");
const { getBlogs, uploadBlog, deleteBlog, getSingleBlog, updateBlog } = require("../controllers/blogsController");

const router = express.Router();

//GET blogs
router.get("/home/blogs", getBlogs);

//GET a single blog
router.get("/home/blogs/:id", getSingleBlog);

//POST a single blog
router.post("/home/new-blog", uploadBlog);

//delete a single blog
router.delete("/home/blogs/:id", deleteBlog)

//update a single blog
router.patch("/home/blogs/:id", updateBlog)


//Exporting Modules
module.exports = router;