import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/endpoint'
import store from '@/redux/store'
import { toast } from 'sonner'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchQuery} = useSelector(store=>store.job)      //misses setAllJobs
    console.log('search query kya hain bahi',searchQuery);
    
    useEffect(()=>{
        const fetchAllJobs = async()=>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true})
                if(res.data.success){
                    // console.log("Yo Yo",res.data.job[0].requirements);
                
                    dispatch(setAllJobs(res.data.job));
                }
            }
            catch(e){ 
                console.log(e);
                
                // dispatch(setAllJobs([]))
                toast.error(`Job Not Found For ${searchQuery}`);
            }
        }
        fetchAllJobs();
    },[searchQuery,dispatch])
  
}

export default useGetAllJobs