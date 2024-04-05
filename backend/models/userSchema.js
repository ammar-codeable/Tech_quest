import mongoose from "mongoose";

const schema = mongoose.Schema;
const UsersSchema = new schema({
  id: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required : false,
  },
  
});

const Users = mongoose.model("Users", UsersSchema);
export default Users;