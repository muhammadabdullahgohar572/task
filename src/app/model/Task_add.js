
import mongoose from "mongoose"

const Task_addschme=mongoose.Schema({
     user_iD: { type: mongoose.Schema.Types.ObjectId,  required: true },
    Task_Tittle:{
        type:String,
        required:true,
    },
    Task_description:{
        type:String,
        required:true,
    },
    Task_Satut:{
        type:String,
        enum:["complete","Pending"],
        default:"Pending"
    },
    date:{
        type:Date,
        default:Date.now()
    }

})

export const Taskmodel=mongoose.models.UserTask|| mongoose.model("UserTask",Task_addschme)