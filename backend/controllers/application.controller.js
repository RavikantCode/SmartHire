import compareResumeWithJob from "./compareResumeWithJob.js";
import  Application  from "../models/application.model.js";
import Job from "../models/job.model.js";
import sendMail from "../utils/sendEmail.js";
import User from "../models/user.model.js";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url'; 

export const applyJob =  async(req,res)=>{

    try {
        const userId = req.id;
        console.log("apply job id",userId);
        
        const jobId = req.params.id;
        if(!jobId){
             return res.status(400).json({
                msg:"Job is required",
                success:false 
             })
        }
        
      const existingApplication = await Application.findOne({job:jobId,applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                msg:"You have already Applied",
                success:false
            });
        }

        const job = await Job.findById(jobId);        //--//
        if(!job){
            return res.status(404).json({
                msg:"Job not found",
                success:false
            })
        }

        const user = await User.findById(userId);
        const resumeInfo = user?.profile?.resumeInfo;

        let score = 0;
        if (resumeInfo && job.requirements) {
            score = compareResumeWithJob(resumeInfo, job.requirements);
        }



        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
            score,
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            msg:"Job applied successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Internal Error",
            success:false
        })
        
    }
}
export const getAppliedJobs=async(req,res)=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"companyId",
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                msg:"No Application",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getApplicants=async(req,res)=>{
    try {
        const jobId = req.params.id
        console.log("JobId from backend",jobId);
        
        const job= await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
            path:'applicant'
           }
        });
        
        if(!job){
            return res.status(404).json({
                msg:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                msg: "Status is required",
                success: false,
            });
        }

        const application = await Application.findOne({ _id: applicationId }).populate('applicant','email fullname score');
        console.log(application.score);


        if (!application) {
            return res.status(404).json({
                msg: "Application not found",
                success: false,
            });
        }

        const email = application.applicant.email;
        const score = application.applicant.score;
        
        if (score < 2) {
            application.status = "rejected";

            const subject = `Application Rejected`;
            const plainTextMessage = `Dear ${application.applicant.fullname},\n\nWe regret to inform you that your application has been rejected due to your score being below the required threshold.\n\nBest Regards,\nThe Recruitment Team`;
            const htmlMessage = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #d9534f;">Application Rejected</h2>
                    <p>Dear ${application.applicant.fullname},</p>
                    <p>We regret to inform you that your application has been <strong style="color: #d9534f;">rejected</strong> due to your score being below the required threshold.</p>
                    <p>Best Regards,<br>The Recruitment Team</p>
                </div>`;

            await application.save();
            
            try {
                await sendMail(email, subject, plainTextMessage, htmlMessage);
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    msg: "Failed to send rejection email",
                    success: false,
                });
            }

            return res.status(200).json({
                msg: "Application automatically rejected due to low score and email sent",
                success: true,
            });
        }

    
        application.status = status.toLowerCase();
        
        const subject = `Application ${status}`;
        const statusColor = status.toLowerCase() === 'accepted' ? '#5cb85c' : '#d9534f';
        const plainTextMessage = `Dear ${application.applicant.fullname},\n\nWe are pleased to inform you that your application has been ${status.toLowerCase()}.\n\nBest Regards,\nThe Recruitment Team`;
        const htmlMessage = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: ${statusColor};">Application ${status}</h2>
                <p>Dear ${application.applicant.fullname},</p>
                <p>We are ${status.toLowerCase() === "accepted" ? "pleased" : "sorry"} to inform you that your application has been <strong style="color: ${statusColor};">${status.toLowerCase()}</strong>.</p>
                <p>Best Regards,<br>The Recruitment Team</p>
            </div>`;

        await application.save();

        try {
            await sendMail(email, subject, plainTextMessage, htmlMessage);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Failed to send status update email",
                success: false,
            });
        }

        return res.status(200).json({
            msg: "Status updated successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server error. Please try again later.",
            success: false,
        });
    }
};


export const getFiles = async (req, res) => {
    try {
      
            const { filename } = req.params;
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
    
            const filePath = path.join(__dirname, '..', 'middlewares', 'files', filename);
            console.log("Constructed file path:", filePath); 
         
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("File not found:", err);
                    return res.status(err.status).end(); 
                } else {
                    console.log('Sent:', filename);
                }
            });
        } catch (error) {
            console.error("Error sending file:", error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
};