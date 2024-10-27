import Company from "../models/company.model.js"

export const checkRecruiterAccepted = async(req,res,next)=>{
  try {
    const recruiterId= req.id;
    console.log(recruiterId);
    
    const recruiter = await Company.findOne({userId:recruiterId});

    if (!recruiter || recruiter.isAccepted !== 'accepted'){
      return res.status(403).json({msg:"Acces Denied!,Recruiter Not Accepted Yet"})
    }
    next();
  } catch (error) {
    console.log(error);
    
  }
}