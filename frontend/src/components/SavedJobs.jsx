import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./reusable/Navbar";
import { JOB_API_END_POINT } from "@/utils/endpoint";
import Job from './Job';  // Import the Job component

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getsavedjob`, { withCredentials: true });
        if (res.data.success) {
          setSavedJobs(res.data.savedJobs);
        }
      } catch (error) {
        console.error("Error fetching saved jobs", error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Saved Jobs:({savedJobs.length})</h2>
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p>No saved jobs yet</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
