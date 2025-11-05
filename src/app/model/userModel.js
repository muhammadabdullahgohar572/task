import mongoose from "mongoose";

const UserSchmea = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_Email: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_Gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  Date:{
    type:Date,
    default:Date.now
  }
});

export const UserModel=mongoose.models.userData  || mongoose.model("userData",UserSchmea)