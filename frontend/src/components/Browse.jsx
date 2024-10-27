import React, { useEffect } from 'react';
import Navbar from './reusable/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


function Browse() {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  console.log("job from browse",allJobs);
  
  const dispatch=useDispatch()
  useEffect(()=>{
      return ()=>{
          // dispatch(setSearchQuery(''))
          dispatch(setSearchQuery(' '))
      }
    },[dispatch])
  console.log(allJobs);
  
  return (
    <div>
      <Navbar />
      <div className="bg-slate-50 h-screen">
        <div className='max-w-7xl mx-auto p-10'>
          <h1 className='font-bold text-xl mb-6'>Search Result ({allJobs.length})</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allJobs.map((job) => (
              <div key={job._id} className='w-full'>
                <Job job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
