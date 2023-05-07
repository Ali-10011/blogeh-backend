const url = require("url");
const blogsModel = require("../models/blogsModel");

const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await blogsModel.find().limit(10).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogsModel
      .find({ username: req.username })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//posting a single blog
const uploadBlog = async (req, res) => {
  try {
    const blog = await new blogsModel({
      username: req.username,
      title: req.body.title,
      body: req.body.body,
    }).save();

    if (!blog) {
      res.status(404).json({ message: "Cannot Complete Request" });
    } else {
      res.status(200).json(blog);
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//deleting a Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await blogsModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!blog) {
      res.status(404).json({ message: "No such entry !" });
    } else {
      res.status(200).json({ message: "Successfully Deleted !" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Getting a Single Blog
const getSingleBlog = async (req, res) => {
  try {
    const blog = await blogsModel.findOne({
      _id: req.params.id,
    });

    if (!blog) {
      res.status(404).json({ message: "No such entry !" });
    } else {
      res.status(200).json({ blog });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update a Single Blog
const updateBlog = async (req, res) => {
  try {
    const blog = await blogsModel.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    );

    if (!blog) {
      res.status(404).json({ message: "Cannot Update" });
    } else {
      res.status(200).json({ message: "Successfully Updated" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRecentBlogs,
  getBlogs,
  uploadBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
};
