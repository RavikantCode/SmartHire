import React, { useEffect, useState } from "react";
import Navbar from "../reusable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/endpoint";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { companies } = useSelector((state) => state.company);
  console.log("Companies from Redux:", companies);
  
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: null,
    location: "",
    jobType: "",
    experience: null,
    position: "",
    companyId: "", // Initialize as an empty string
  });

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Check if there is a registered company
    if (companies.length === 1) {
      setInput((prev) => ({
        ...prev,
        companyId: companies[0]._id, // Accessing the first company's _id
      }));
    }
  }, [companies]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        navigate('/ManageJobs');
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
    console.log("Form submitted", input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center mx-auto max-w-6xl justify-center w-screen my-5">
        <form onSubmit={handleSubmit} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>Please wait</Button>
          ) : (
            <Button className="w-full mt-4">Post Job</Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-400 font-bold text-center mt-4">
              Please Register a Company First, Before Posting
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
