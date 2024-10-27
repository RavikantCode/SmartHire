import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
//admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!requirements) missingFields.push("requirements");
    if (!salary) missingFields.push("salary");
    if (!location) missingFields.push("location");
    if (!jobType) missingFields.push("jobType");
    if (!experience) missingFields.push("experience");
    if (!position) missingFields.push("position");
    if (!companyId) missingFields.push("companyId");

    if (missingFields.length) {
      return res.status(400).json({ 
        msg: `Missing fields: ${missingFields.join(", ")}`, 
        success: false 
      });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        msg: "Company Not Found",
        success: false,
      });
    }

    if (company.isAccepted !== "accepted") {
      return res.status(403).json({
        msg: "Company has not been accepted yet. You can't post the job.",
        success: false,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      companyId: companyId,
      createdBy: req.id,
      isAccepted: "pending",
    });

    return res.status(200).json({ 
      msg: "Job created successfully", 
      success: true, 
      newJob 
    });
  } catch (e) {
    console.error(e); // Log error to console
    return res.status(500).json({ 
      msg: "An error occurred while creating the job", 
      success: false 
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || " ";

    const job = await Job.find({
      isAccepted: "accepted",
      $or: [
        { title: { $regex: keyword } },
        { description: { $regex: keyword } },
      ],
    })
      .populate({ path: "companyId", select: "companyName" })
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "companyId" })
      .sort({ createdAt: -1 });
    

    if (job.length === 0) {
      return res.status(404).json({ msg: "Jobs not found", success: false });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
//students
export const getAllJobsById = async (req, res) => {
  try {
    const JobId = req.params.id;
    const job = await Job.findById(JobId)
      .populate({
        path: "applications",
      })
      .populate({
        path: "companyId",
      });
    if (!job) {
      return res.status(404).json({ msg: "Jobs not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (e) {
    console.log(e);
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.body.id;
    const jobs = await Job.find({ adminId }).populate({
      path: "companyId",
    });
    if (jobs.length === 0) {
      return res.status(400).json({ msg: "Jobs Not Found", success: false });
    }
   

    return res.json({
      jobs: jobs.map((job) => ({
        ...job._doc,
        createdAt: job.createdAt,
      })),
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
export const SaveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        msg: "Job Not Found",
        success: false,
      });
    }
    const user = await User.findById(userId);
    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
      return res
        .status(200)
        .json({ success: true, msg: "Job saved successfully" });
    }

    return res
      .status(400)
      .json({ success: false, msg: "Job is already saved" });
  } catch (error) {
    console.log(error);
  }
};
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate({
        path:'savedJobs'
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

import Application from "../models/application.model.js";

export const saveScore = async (req, res) => {
    const { userId, score } = req.body;
    const {jobId} = req.params;

    if (!jobId || !userId || score === undefined) {
        return res.status(400).json({ message: 'Job ID, User ID, and score are required.' });
       }

    try {
        const application = await Application.findOne({ job: jobId, applicant: userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        application.score = score;
        await application.save();

        return res.status(200).json({ message: 'Score submitted successfully', application });
    } catch (error) {
        console.error("Error posting job score:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

