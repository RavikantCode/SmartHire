import React from "react";
import { Badge } from "./ui/badge";
import { Ghost, MapPin, Briefcase, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/endpoint";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const handleSaveJob = async (id) => {
    try {
      const res = await axios.post(
        `${JOB_API_END_POINT}/savejob/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
      } else {
        toast.error("Failed to save the job");
      }
    } catch (error) {
      console.log(error);
      toast.error('Job is Already Saved');
    }
  };

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      onClick={() => job?._id && navigate(`/description/${job._id}`)}
      className="transition-transform transform hover:scale-105 duration-200 ease-in-out"
    >
      <div className="border p-5 rounded-xl shadow-lg cursor-pointer bg-white border-gray-200 hover:shadow-2xl transition-shadow duration-300">
   
        <div className="mb-4 flex items-center">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage
              src={job?.companyLogo || "https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg"}
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div>
            <h1 className="font-bold text-lg text-gray-900">
              {job?.companyId?.name || "Company not available"}
            </h1>
          
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              <p>{job?.location || "Location not specified"}</p>
            </div>
          </div>
        </div>

     
        <div className="mb-2">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="font-semibold text-lg text-blue-600">
              {job?.title || "Title not available"}
            </h2>
          </div>
       
          <p className="text-sm text-gray-700 mt-1">
            {job?.description || "No description available."}
          </p>
        </div>

     
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Badge
            className={"bg-blue-100 text-blue-700 font-semibold"}
            variant={Ghost}
          >
            {job?.position
              ? `${job.position} Position`
              : "Position not specified"}
          </Badge>
          <Badge
            className={"bg-red-100 text-red-500 font-semibold"}
            variant={Ghost}
          >
            {job?.jobType || "Job type not specified"}
          </Badge>
          <Badge
            className={"bg-green-100 text-green-600 font-semibold badge"}
            variant={Ghost}
          >
            {job?.salary ? `${job.salary} LPA` : "Salary not available"}
          </Badge>
        </div>

      
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            {job?.createdAt
              ? daysAgoFunction(job.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job.createdAt)} days ago`
              : "Date not available"}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSaveJob(job._id);
            }}
            className="flex items-center gap-1 text-xs bg-slate-50 hover:text-blue-700 hover:bg-gray-200 transition-colors duration-300 rounded-md p-1"
          >
            <Bookmark className="w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
