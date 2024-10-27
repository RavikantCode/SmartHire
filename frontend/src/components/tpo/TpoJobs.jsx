import React, { useState, useEffect } from "react";
import Navbar from "../reusable/Navbar";
import Job from "../Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function TpoJobs() {
  const [displayed, setDisplayed] = useState([]);

  const { TpoJobs } = useSelector((store) => store.job);
  console.log("checkkkkkkkkkkkk",TpoJobs);
  
  useEffect(() => {
    if (TpoJobs?.job && Array.isArray(TpoJobs.job)) {
      setDisplayed(TpoJobs.job);
    } else {
      setDisplayed([]);
    }
  }, [TpoJobs]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 p-4">
        {displayed.length === 0 ? (
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
          <div className="flex flex-wrap gap-5">
            {displayed.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-none"
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

export default TpoJobs;
