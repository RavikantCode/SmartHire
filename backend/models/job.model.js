import mongoose from "mongoose";

const JobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    requirements:{
        type:String

    },
    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
        
    },
    position:{
        type:String,
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }],
    isAccepted:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    // scores: [{
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true
    //     },
    //     score: {
    //         type: Number,
    //         required: true
    //     }
    // }]
   
},{timestamps:true})

const Job = mongoose.model('Job',JobSchema)

 export default Job