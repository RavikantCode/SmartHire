import mongoose from "mongoose";

const companySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        
    },
    website:{
        type:String,
       
    },
    location:{
        type:String,
       
    },
    logo:{
        type:String,
      
    },
    userId:{                     //phoneNumber
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isAccepted:{
        type:String,
        enum:['accepted','rejected','pending'],
        default:'pending'
    },
    jobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
    }]
},{timestamps:true})
const Company = mongoose.model('Company',companySchema)

export default Company


