import Company from "../models/company.model.js"

export const checkJobAccepted = async(req,res,next)=>{
  try {
    const recruiterId= req.id;
    console.log(recruiterId);
    
    const recruiter = await Company.findOne({userId:recruiterId});

    if (!recruiter){
      return res.status(403).json({msg:"Register The Company First"})
    }
    next();
  } catch (error) {
    console.log(error);
    
  }
}