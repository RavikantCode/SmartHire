import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
import User from "../models/user.model.js";

export const joboffers = async (req, res) => {
  try {
    const keyword = req.query.keyword || " ";
    const job = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate({ path: "companyId" })
      .sort({ createdAt: -1 });

    if (job.length === 0) {
      return res.status(404).json({
        msg: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const updateJobOffers = async (req, res) => {
  try {
    const JobId = req.params.id;
    const { isAccepted } = req.body;

    if (isAccepted !== "accepted" && isAccepted !== "rejected") {
      return res.status(403).json({ msg: "Invalid Status" });
    }

    if (!JobId) {
      return res.status(400).json({ msg: "Invalid JobId" });
    }

    await Job.updateMany({ _id: { $in: JobId } }, { isAccepted: isAccepted });

    return res.status(200).json({
      msg:`Job is ${isAccepted}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const acceptCompany = async (req, res) => {
    try {
      const companyId = req.params.id;
      const {isAccepted} = req.body; 
  
      if (!companyId) {
        return res.status(400).json({ msg: "Invalid Company Id" });
      }
  

      if (isAccepted !== "accepted" && isAccepted !== "rejected") {
        return res.status(403).json({ msg: "Invalid Status" });
      }
  

      await Company.updateMany({_id:{ $in:companyId}},{isAccepted:isAccepted});

  
      return res.status(200).json({
        msg:`Company ${isAccepted}`,
        success: true,
      });
  
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ msg: "Internal Server Error" }); 
    }
  };
  
  

export const getAllCompany = async (req, res) => {
  try {
    const company = await Company.find();
    return res.status(200).json({
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        msg: "Company Doesn't Exist",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.status(200).json({
      students,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};
