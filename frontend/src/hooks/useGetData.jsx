// import { setAllJobs, setJobScores } from '@/redux/jobSlice';
// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { JOB_API_END_POINT } from '@/utils/endpoint';
// import compareResumeWithJob from '@/utils/compareResumewithJob';

// const useGetData = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((store) => store.auth.user);
//     const resumeInfo = user?.profile?.resumeInfo;
  

    


//     // Function to submit job scores
//     const submitJobScores = async (jobScores) => {
//         try {
//             const promises = jobScores.map(({ jobId, score }) => {
//                 return axios.post(
//                     `${JOB_API_END_POINT}/${jobId}/score`, 
//                     { userId: user._id, score },
//                     { withCredentials: true }
//                 );
//             });
//             const responses = await Promise.all(promises);
            
//         } catch (error) {
//             console.error("Error submitting scores:", error);
//         }
//     }

//     useEffect(() => {
//         const fetchAllJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
//                 if (res.data.success) {
//                     const jobs = res.data.job;
                   

//                     const jobScores = []; 

//                     for (const job of jobs) {
//                         const jobId = job._id;

//                         // Check if job requirements exist
//                         if (job.requirements) { 
//                             const jobRequirements = job.requirements; 
                            
                    
//                             // Calculate matching score
//                             const score = compareResumeWithJob(resumeInfo, jobRequirements);
                           
                            
//                             jobScores.push({ jobId, score }); 
//                         } else {
//                             console.log(`No requirements available for Job ID ${jobId}.`);
//                         }
//                     }         

//                     // Submit all job scores at once
//                     if (jobScores.length > 0) {
//                         await submitJobScores(jobScores);  
//                     }
//                     dispatch(setAllJobs(jobs));
//                     dispatch(setJobScores(jobScores)); 
//                 }
//             } catch (e) {
//                 console.error("Error fetching jobs:", e);
//             }
//         };

//         if (resumeInfo) { // Fetch jobs only if resumeInfo is available
//             fetchAllJobs();
//         }
//     }, [dispatch, resumeInfo]);

//     return null; 
// };

// export default useGetData;
