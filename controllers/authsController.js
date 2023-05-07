const Auth = require("../models/authModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    // Get user input
    const { username, password, email } = req.body;

    //Validate user input
    if (!(username && password && email)) {
      return res.status(400).send({ msg: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ username });

    if (oldUser) {
      return res.status(409).send({ msg: "User Already Exist. Please Login" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10); //hashing the password

    // Create user in our database
    const newUser = await Auth.create({
      //We will not store the password in database
      email: email,
      username: username,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    newUser.token = token;
    // return new user
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal Server ERROR" });
  }
};

const authenticateUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res.status(400).send({ msg: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await Auth.findOne({ username: username });

    if (!user) {
      return res.status(401).send({ msg: "This user does not exist" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      //comparing the actual password user entered with our hashed password
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // user
      return res.status(200).json({ token: token, msg: "Success" });
    }
    res.status(400).send({ msg: "Invalid Password" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server ERROR" });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
};
