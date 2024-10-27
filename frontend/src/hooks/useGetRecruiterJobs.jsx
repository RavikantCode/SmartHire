import { setAllRecruiterJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/endpoint';
import store from '@/redux/store';

const useGetRecruiterJobs = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth)
  console.log(user);
  

  useEffect(() => {
    const fetchAllRecruiterJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjob`, { withCredentials: true });
        console.log("Job from API",res.data.jobs);
        
        if (res.data.success) {
          let jobs=[];
          console.log("job from local variable",jobs);
          
          console.log(res.data.jobs);
          // dispatch(setAllRecruiterJobs(res.data.jobs));
          jobs = res.data.jobs;

          const userJobs = jobs.filter(job => job.createdBy === user._id);
          dispatch(setAllRecruiterJobs(userJobs));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllRecruiterJobs();
  }, [dispatch]);
};

export default useGetRecruiterJobs;
