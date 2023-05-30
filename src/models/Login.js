import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const loginSchema = new mongoose.Schema(
  {
    email: { type: String, maxlength: 100, trim: true, required: true },
    password: { type: String, minlength: 8, maxlength: 100, required: true },
  },
  { versionKey: false }
);

loginSchema.plugin(mongoosePaginate);

const Login = mongoose.model("login", loginSchema);

export default Login;
