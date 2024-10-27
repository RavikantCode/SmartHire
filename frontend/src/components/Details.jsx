import React, { useState, useEffect } from "react";
import Navbar from "./reusable/Navbar";
import { MdLocationPin } from "react-icons/md";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/endpoint";
import USER_API_END_POINT from "@/utils/endpoint";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Footer from "./Footer";

const Details = () => {
  const { user } = useSelector((store) => store.auth);
  console.log("details from user",user);
  
  const { singleJob } = useSelector((store) => store.job);

  console.log("single job from details",singleJob);
  

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const handleAcceptJob = async (id) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/UpdateOffers/${jobId}`,
        { isAccepted: "accepted" },
        { withCredentials: true }
      );
      console.log(res.data);
      
      if (res.data.success) {
        
        toast.success(res.data.msg);
      } else {
        toast.error("Failed to update the offers");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating the Job");
    }
  };

  const handleRejectJob = async (id) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/UpdateOffers/${jobId}`,
        { isAccepted: "rejected" },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        // toast.success(res.data.msg);
      } else {
        toast.error("Failed to update the offers");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating the Job");
    }
  };

  const handleSaveJob = async (id) => {
    try {
      const res = await axios.post(
        `${JOB_API_END_POINT}/savejob/${jobId}`,
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
      toast.error("Error Saving the Job");
    }
  };

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to apply for the job.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("job from details", res.data.job);

        if (res.data.success) {
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job details.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto p-10 grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="bg-white max-w-full p-4 h-56 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-semibold">{singleJob.title}</h1>
                  <p className="text-xs text-gray-600">
                    {singleJob.companyId.name}
                  </p>
                </div>
                <div className="bg-red-300 rounded-2xl h-16 w-16">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg"></img>
                  {singleJob.companyId.logo}
                </div>
              </div>

              <div className="flex gap-4 mt-2 items-center">
                <div className="flex items-center">
                  <RiShoppingBagLine className="mr-1" />
                  <p className="mr-2">{singleJob.description}</p>
                </div>
                <div className="h-4 w-px bg-gray-400"></div>
                <div className="flex items-center">
                  <FaIndianRupeeSign className="mr-1" />
                  <p>{singleJob.salary} LPA</p>
                </div>
              </div>

              <div className="flex gap-4 mt-2 items-center">
                <div className="flex items-center">
                  <MdLocationPin className="mr-1" />
                  <p className="mr-6">{singleJob.location}</p>
                </div>
                <div className="h-4 w-px bg-gray-400"></div>
                <div className="flex items-center">
                  <GrUserWorker className="mr-1" />
                  <p>{singleJob.jobType}</p>
                </div>
              </div>
              <hr className="mt-2" />
              <div className="flex mt-3 justify-between items-center">
                <div className="text-sm text-gray-500">
                  Posted: {singleJob?.createdAt.split("T")[0]}
                </div>
                <div className="h-6 w-px bg-gray-400 -ml-36"></div>
                <div className="text-sm text-gray-500 -ml-60">
                  Position: {singleJob.position}
                </div>

                {user.role === "TPO" ? (
                  <div className="flex gap-4 items-center">
     
                  
                    {singleJob.isAccepted === "rejected" ? (
                      <span className="text-red-500 font-semibold">
                      <button className="bg-red-600 p-2 rounded-xl text-white"> Rejected</button>
                     
                      </span>
                    ) : singleJob.isAccepted === "accepted" ? (
                      <span className="text-green-500 font-semibold">
                      <button className="bg-green-600 p-2 rounded-xl text-white">Accepted</button>
                      </span>
                    ) : (
                      
                      <>
  
                        <Button
                          onClick={() => handleRejectJob(jobId)}
                          className="flex-shrink-0 rounded-full text-red-400 border-red-400 px-4 py-2 text-sm"
                          variant="outline"
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleAcceptJob(jobId)}
                          className="flex-shrink-0 rounded-full bg-green-700 text-white text-sm px-4 py-2"
                          variant="outline"
                        >
                          Accept
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                   
                
                    {!isApplied && (
                      <Button
                        onClick={() => handleSaveJob(jobId)}
                        className="flex-shrink-0 rounded-full text-blue-700 border-blue-700 px-4 py-2 text-sm"
                        variant="outline"
                      >
                        Save
                      </Button>
                    )}
                     {/* {user.profile.resume.length !== 0 ? <Button
                      onClick={isApplied ? null : applyJobHandler}
                      className={`flex-shrink-0 rounded-full bg-blue-700 text-white text-sm px-4 py-2 ${
                        isApplied ? "bg-green-600" : ""
                      }`}
                      variant="outline"
                    >
                      {isApplied ? "Already Applied" : "Apply"}
                    </Button>:
                    <div>upload Resume</div>}  */}
                    {user.profile.resume.length !== 0 ? (
  <Button
    onClick={isApplied ? null : applyJobHandler}
    className={`flex-shrink-0 rounded-full bg-blue-700 text-white text-sm px-4 py-2 ${
      isApplied ? "bg-green-600" : ""
    }`}
    variant="outline"
  >
    {isApplied ? "Already Applied" : "Apply"}
  </Button>
) : (
  <Button
    onClick={() => toast.error("Please upload your resume first!")}
    className="flex-shrink-0 rounded-full bg-blue-700 text-white text-sm px-4 py-2"
  >
    Apply
  </Button>
)}

                    {/* <Button
                      onClick={isApplied ? null : applyJobHandler}
                      className={`flex-shrink-0 rounded-full bg-blue-700 text-white text-sm px-4 py-2 ${
                        isApplied ? "bg-green-600" : ""
                      }`}
                      variant="outline"
                    >
                      {isApplied ? "Already Applied" : "Apply"}
                    </Button> */}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white max-w-full p-4 min-h-[300px] my-5 rounded-2xl shadow-xl overflow-y-auto">
              <h1 className="text-xl font-semibold mb-2">Job Description</h1>
              <p className="text-gray-500 mb-4 text-sm">
                {singleJob.description}
              </p>
              <h1 className="text-sm font-semibold mb-2">Requirements:</h1>
              <p className="text-gray-500 mb-4 text-sm">
                {singleJob.requirements}
              </p>
              <h1 className="text-sm font-semibold">
                Total Applicants:{" "}
                <span className="text-gray-600 ml-2">
                  {singleJob.applications?.length}
                </span>
              </h1>
            </div>

            <div className="bg-white max-w-full p-4 my-5 rounded-2xl shadow-xl">
              <h1 className="text-xl font-semibold mb-2">About Company</h1>
              <p className="text-gray-500 text-sm">
                {singleJob.companyId.description}
              </p>
            </div>
          </div>

          <div className="bg-white max-w-[91%] p-8 rounded-2xl h-[81%] shadow-xl">
            <div className="text-3xl bg-blue-600 w-full rounded-2xl text-gray-400 flex justify-center items-start p-4">
              <div className="flex flex-col items-center">
                <img
                  className="h-72 select-none"
                  src="https://static.naukimg.com/s/0/0/i/Events/eventsSwiperLeft-ot.png"
                  alt="No Jobs"
                />
              </div>
            </div>

            <div className="mt-6 select-none">
              <h1 className="mb-2">
                <IoIosCheckmarkCircle className="inline text-xl text-green-600 mr-1" />
                Get Job Posting Delivered Right To Your Mail
              </h1>
              <h1>
                <IoIosCheckmarkCircle className="inline text-xl text-green-600 mr-1" />
                Ranks candidates by highest percentage score
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
