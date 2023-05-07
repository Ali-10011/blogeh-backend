const mongoose = require("mongoose"); //mongoose is the API that connects us with the database
const Schema = mongoose.Schema; //creating a schema for the database (schema for a table)


const authSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
      },
    password: 
    {
        type: String,
        required: true,
    },
    following:
    {
      type: [String],
    }
  },
  { timestamps: true }
); 

const authModel = mongoose.model(
  "auths",
  authSchema,
  "auths"
);

module.exports = authModel;