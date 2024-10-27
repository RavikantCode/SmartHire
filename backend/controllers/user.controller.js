import Code from '../models/code.model.js';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
import crypto from "crypto"
import  sendEmail  from '../utils/sendEmail.js'
import fs from 'fs';
import path from 'path';
import PDFParser from "pdf2json"

import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const register = async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role,location} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role || !location){
            return res.status(400).json({
                msg:"Something is missing",
                success:false 
            })
    }
    const user = await User.findOne({email});
    if(user){
         return res.status(400).json({
            msg:"User already exist with the email", 
            success:false
         })
    }
    if(role === 'TPO'){
        const {tpocode} = req.body;
       
        
        if(!tpocode){
            return res.status(400).json({msg:"TPO code is required"})
        }
        const validCode = await Code.findOne({tpocode:tpocode});
        if(!validCode){
            return res.status(400).json({
                msg:"Invalid TPO Code"
            })
        }
        if (validCode.isUsed) {
            return res.status(400).json({ msg: "Code has already been used" });
        }
        validCode.isUsed = true;
        await validCode.save();
    }

    await User.create({
        fullname,
        email,
        phoneNumber,
        password,
        role
    })

    return res.status(200).json({msg:"Account created successfully",
        success:true,
        userId: User._id 
       
    })
    
}
catch(e){
    console.log(e);
    
}
}

export const login=async(req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.json({msg:"Something is missing",
                success:false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:"incorrect email or password",
                success:false
            })
        }
       
        if(password != user.password){
            return res.status(403).json({
                msg:"Incorrect email or password",
                success:false
            })
        };
       
        if(role != user.role){
            return res.status(400).json({
                msg:"user doesnt Exist",
                success:false
            })
        }
        const tokenData={
            userId:user._id
        }
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            msg:`welcome back ${user.fullname}`,
            user,
            success:true
        })
    }
    catch(e){
        console.log(e);
        
    }
}
export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie('token',"",{maxAge:0}).json({msg:'Logged out successfully',
            success:true
        })
    }catch(e){
        console.log(e);
        
    }
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const update = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, location, github, bio, skills } = req.body;
        const file = req.file;
        console.log("checl=kig from backend for file",file);
        
        let resumePath = '';
        let pdfContent = '';
        
        if (file) {
            resumePath = file.path; 
          
            if (!fs.existsSync(resumePath)) {
                return res.status(404).json({ msg: 'File not found', success: false });
            }

            const pdfParser = new PDFParser();
            const parsePdf = () => {
                return new Promise((resolve, reject) => {
                    pdfParser.on('pdfParser_dataError', errData => reject(errData.parserError));
                    pdfParser.on('pdfParser_dataReady', pdfData => {
                        let extractedText = ''; 

                        
                        pdfData.Pages.forEach(page => {
                            page.Texts.forEach(textItem => {
                                textItem.R.forEach(r => {
                                    extractedText += decodeURIComponent(r.T) + ' '; 
                                });
                            });
                        });

                        resolve(extractedText); 
                    });

                    pdfParser.loadPDF(resumePath);
                });
            };

            pdfContent = await parsePdf(); 
        } else {
            console.error('No file uploaded');
            return res.status(400).json({ msg: 'No file uploaded', success: false });
        }
        
        let skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];

        const userId = req.id; 
        let user = await User.findById(userId);

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ msg: "User not found", success: false });
        }
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile.location = location || user.profile.location;
        user.profile.github = github || user.profile.github;
        user.profile.bio = bio || user.profile.bio;
        user.profile.skills = skillsArray.length > 0 ? skillsArray : user.profile.skills;

        if (file) {
          
            
            user.profile.resume = resumePath; 
            user.profile.resumeOriginalName = file.originalname;
         
            user.profile.resumeInfo = pdfContent;
        }
        await user.save();
     return res.status(200).json({
            msg: "Profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
            success: true,
        });

    } catch (e) {
        console.error('Error updating profile:', e);
        return res.status(500).json({ msg: "Server error", success: false });
    }
};

  

export const forgetPassword = async(req,res)=>{
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(404).json({
        msg:"User Not Found",
        success:false
    })

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    const url = `http://localhost:5173/resetpassword/${resetToken}`

    const message = `Click on the link to reset Password. ${url}`

   
    sendEmail(user.email,"SmartHire Reset password",message)


    res.status(200).json({
        msg:`Reset Token as been sent to ${user.email}`
    })
}

export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({ msg: "Invalid or expired token", success: false });
    }

    user.password = newPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({ msg: "Password reset successful", success: true });
};
