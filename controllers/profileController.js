const { json } = require("express");
const Auth = require("../models/authModel");
const blogsModel = require("../models/blogsModel");
const bcrypt = require("bcryptjs");

const updateProfile = async (req, res) => {
  try {
    const user = await Auth.findOne({ username: req.body.username });

    if (user) {
      if (user.username != req.username) {
        return res.status(401).json({
          msg: "Already Exists, Please select a different username !",
        });
      }
    }

    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await Auth.findOneAndUpdate(
      { username: req.username },
      { username: req.body.username, password: encryptedPassword }
    );

    if (!updatedUser) {
      return res.status(201).json({ msg: "Cannot Completed Request" });
    } else {
      await blogsModel.updateMany(
        { username: req.username },
        { username: req.body.username }
      );
      return res.status(200).json({ msg: "Successfully Updated" });
    }
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const blogs = await blogsModel.find({ username: req.username });
    const blogsCount = blogs.length
    return res
      .status(500)
      .json({ username: req.username, blogsCount: blogsCount.toString() });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { updateProfile, getProfile };
