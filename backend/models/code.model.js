import mongoose from "mongoose";

const codeSchema = mongoose.Schema({
    tpocode:{
        type:String,
        required:true,
        unique: true
    },
    isUsed: { 
        type: Boolean,
        default: false 
    },
},
{timestamp:true});
const Code = mongoose.model('Code',codeSchema)

export default Code;