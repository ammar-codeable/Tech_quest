import mongoose from "mongoose";

const schema = mongoose.Schema;
const UsersSchema = new schema({
  ID: {
    type: String,
    required: true,
  },
  Report: {
    type: String,
    required: false,
  },
  
});

const Users = mongoose.model("Users", UsersSchema);
export default Users;