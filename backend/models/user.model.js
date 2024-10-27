import mongoose, { Schema, Types } from "mongoose";

const userSchema= mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        // unique:true
      
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['TPO','Student','Recruiter'],
        required:true
    },
    profile:{
        bio:{type:String,default:""},
        location:{type:String,default:""},
        skills:[{type:String}],
        resume:[{type:String}], // URL to resume file
        resumeOriginalName:{type:String},
        resumeInfo:{type:String},                  // testing mode
        gitHubLink:{type:String,default:""},         //added by suggestion
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{type:String,default:""}
    },
    savedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:'Job'}],
    resetPasswordToken:{type:String},
    resetPasswordExpire:{type:String},
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
   
    
    
},{timestamps:true});


const User = mongoose.model('User',userSchema);

export default User;