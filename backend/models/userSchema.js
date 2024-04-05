import mongoose from "mongoose";

const schema = mongoose.Schema;
const UsersSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  report: {
    type: String,
  },
  role:{
    type: String,
    default:"user",
  },
  name:{
    type:String
  }
  
});

const Users = mongoose.model("Users", UsersSchema);
export default Users;