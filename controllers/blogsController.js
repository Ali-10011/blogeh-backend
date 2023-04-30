const url = require("url");
const blogsModel = require("../models/blogsModel");

const getBlogs = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  try {
    const blogs = await blogsModel
      .find({ username: "test" })
      .limit(parseInt(queryObject.perpage))
      .skip((parseInt(queryObject.pageno) - 1)*parseInt(queryObject.perpage))
      .sort({ createdAt: -1 });
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

//posting a single blog
const uploadBlog = async (req, res) => {
  try {
    const blog = await new blogsModel({
      username: "test",
      title: req.body.title,
      body: req.body.body,
    }).save();

    console.log(blog);

    if (!blog) {
      res.status(404).json({ error: "Cannot Complete Request" });
    } else {
      res.status(200).json(blog);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getBlogs,
  uploadBlog,
};
