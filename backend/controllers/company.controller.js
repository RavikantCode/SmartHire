import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerdCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; 
        console.log( name, description, website, location ,file);
        
        if (!name || !description || !website || !location) {
            return res.status(400).json({ msg: "Something is Missing", success: false });
        }

        const userId = req.id;
        // const AlreadyBuildedCompany = await Company.findOne({ userId });
        // if (AlreadyBuildedCompany) {
        //     return res.status(400).json({ msg: "You already registered the company" });
        // }

     
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).json({ msg: "Company already exists", success: false });
        }

    

        const company = await Company.create({
            name,
            description,
            website,
            location,
            file,
            userId,
            isAccepted:'pending'           //testing-mode
        });

        return res.status(200).json({
            msg: "Company registered successfully",
            success: true,
            companyId: company._id,
            userId
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
};



export const getCompany = async (req, res) => {
    try {
        const userId = req.id;                             //for newely recruiter to registered his company
        console.log("userid from backend",userId);
        
       
        const company = await Company.findOne({userId})
        if (!company) {
            return res.status(404).json({ msg: "Company Not Found", success: false });
        }

        return res.status(200).json({
            company,
            userId,
            success: true 
        });
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, msg: "Failed to fetch company data" });
    }
};


export const getCompanies=async(req,res)=>{            //testing mode
    try{                                                                    //this is for TPO
        const userId = req.id
        const company = await Company.findOne()
        if(!company){
            return res.status(404).json({msg:"Company Not Found",
                succees:false
            })
        }
        return res.status(200).json({
            company,
            succees:true
        })
        
    }catch(e){
        console.log(e);
        return res.status(500).json({ success: false, msg: "Failed to fetch company data" });
        
    }
}

export const getStudentCompanies=async(req,res)=>{            //testing mode
    try{
        const userId = req.id
        const company = await Company.find({
            isAccepted:"accepted"
        }).populate({
            path:'jobs',
            select: 'title description location salary',
        })
        if(!company){
            return res.status(404).json({msg:"Company Not Found",
                succees:false
            })
        }
        return res.status(200).json({
            company,
            succees:true
        })
        
    }catch(e){
        console.log(e);
        return res.status(500).json({ success: false, msg: "Failed to fetch company data" });
        
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id                                                    // i think with the help of it we will accept and reject the company
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({msg:"Company Doesnt Exist",
                succees:false
            })
        }
        return res.status(200).json({
            company,
            succees:true
        })
    }catch(e){
        console.log(e);
        
    }
}
export const updateCompany=async(req,res)=>{
    try{
        const {name,description,website,location} = req.body
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        //cloud

        const updateData = {name,description,website,location,logo}

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})

        if(!company){
            return res.status(404).json({ms:"Company Not Found"})
        }
        return res.status(200).json({msg:"Information Updated",
            succees:true
        })
    }
    catch(e){
        console.log(e);
        
    }
}