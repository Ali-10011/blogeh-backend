const express = require("express");
const { getBlogs, uploadBlog, deleteBlog, getSingleBlog, updateBlog } = require("../controllers/blogsController");
const  verifyToken  = require("../middlewares/verifyToken");

const router = express.Router();

//GET blogs
router.get("/home/blogs", verifyToken, getBlogs);

//GET a single blog
router.get("/home/blogs/:id",verifyToken, getSingleBlog);

//POST a single blog
router.post("/home/new-blog", verifyToken, uploadBlog);

//delete a single blog
router.delete("/home/blogs/:id", verifyToken, deleteBlog)

//update a single blog
router.patch("/home/blogs/:id",verifyToken, updateBlog)


//Exporting Modules
module.exports = router;