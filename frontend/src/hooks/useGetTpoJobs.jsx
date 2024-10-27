import { setAllJobs, setTpoJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import USER_API_END_POINT from '@/utils/endpoint'
import store from '@/redux/store'

const useGetTpoJobs = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchTpoJobs = async()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/jobOffers`,{withCredentials:true})
                     
                    console.log("Jobs Fetched For TPO",res.data);
                
                    dispatch(setTpoJobs(res.data));
                
            }
            catch(e){
                console.log(e);
                
            }
        }
        fetchTpoJobs();
    },[])
  
}

export default useGetTpoJobs