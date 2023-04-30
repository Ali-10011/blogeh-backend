const express = require("express");
const { getBlogs, uploadBlog } = require("../controllers/blogsController");

const router = express.Router();

//GET messages
router.get("/home/blogs", getBlogs);

//POST a single message
router.post("/home/new-blog", uploadBlog);



//Exporting Modules
module.exports = router;