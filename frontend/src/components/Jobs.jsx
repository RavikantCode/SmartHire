import React, { useEffect, useState } from "react";
import Navbar from "./reusable/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { motion } from "framer-motion";

function Jobs() {
  const { allJobs, searchQuery } = useSelector(store => store.job);
  console.log("jobs from Jobsss",allJobs);
  
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
          // job?.experience.toLowerCase().includes(searchQuery.toLowerCase())||
          // job?.jobType.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex gap-5 p-4">
        <div className="w-[30%] border shadow-lg rounded-xl p-4">
          <FilterCard />
        </div>

        {allJobs.length === 0 ? (
          <div className="text-3xl bg-blue-400 w-[75%] rounded-2xl text-gray-400 flex justify-center items-start p-4">
            <div className="flex flex-col items-center">
              <img
                className="h-72 select-none"
                src="https://static.naukimg.com/s/0/0/i/Events/eventsSwiperLeft-ot.png"
                alt="No Jobs"
              />
              <div className="select-none">No Job For Now</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap h-1 w-full gap-8"> 
            {allJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
                className="w-full  sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-none" 
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
