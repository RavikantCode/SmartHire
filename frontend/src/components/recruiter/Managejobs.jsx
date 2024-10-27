import React, { useEffect, useState } from "react";
import Navbar from "../reusable/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import JobsTable from "./JobsTable";
import useGetRecruiterJobs from "@/hooks/useGetRecruiterJobs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";



const Managejobs = () => {
  useGetRecruiterJobs();
  const [input, setInput] = useState("");

   const navigate = useNavigate();

   const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(setSearchJobByText(input))
   },[input])

 
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Input
              className="border rounded-3xl px-4 py-2 shadow-lg focus:outline-none hover:shadow-blue-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => navigate("/Recruiter/jobs/post")}
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              New Job
            </Button>
          </div>
          <JobsTable/>
        </div>
      </div>
    </div>
  );
};

export default Managejobs;
