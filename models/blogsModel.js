const mongoose = require("mongoose"); //mongoose is the API that connects us with the database
const Schema = mongoose.Schema; //creating a schema for the database (schema for a table)


const blogsSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
      },
    title: 
    {
       type: String,
       required: true, 
    },   
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); //so we can know when the blog was last edited / created etc

const blogsModel = mongoose.model(
  "blogs",
  blogsSchema,
  "blogs"
); //now it will model the schema on the database

module.exports = blogsModel;