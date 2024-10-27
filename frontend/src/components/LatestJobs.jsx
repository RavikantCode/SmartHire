import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

// Helper function to determine if a job is recent (within 7 days)
const isRecentJob = (createdAt) => {
  const jobDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - jobDate;
  return timeDifference <= 1 * 24 * 60 * 60 * 1000;
};

function LatestJobs() {
  const { allJobs } = useSelector(store => store.job);
  const {user} = useSelector(store=>store.auth);

  if(!user){
    return<div className=' mt-24'>
    .
  </div>;
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto my-20 -mb-2'>
        <h1 className='text-4xl font-bold text-center'>
          Latest <span className='text-blue-700'>Jobs Openings</span>
        </h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
          {
            allJobs.length === 0 
              ? <span className='text-gray-500 text-xl flex justify-end h-24 items-center'>No Job yet</span>
              : allJobs.map((job) => {
                  const isRecent = isRecentJob(job.createdAt);
                  return (
                    <div
                      key={job._id}
                      className={isRecent ? 'recent-job' : ''}
                    >
                      <LatestJobCards job={job} />
                    </div>
                  );
                })
          }
        </div>
      </div>
    </div>
  );
}

export default LatestJobs;
