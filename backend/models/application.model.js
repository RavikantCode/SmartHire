import mongoose, { model } from "mongoose";

const applicationsSchema=mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
   
        score: {
            type: Number,
        }
    
},{timestamps:true})

const Application = mongoose.model('Application',applicationsSchema);

export default Application