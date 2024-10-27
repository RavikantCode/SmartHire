
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '@/utils/endpoint'
import { setSingleCompany } from '@/redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchSingleCompany = async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})             //used for accepting and rejectng the company
                if(res.data.success){
                    console.log(res.data.company);
                
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch(e){
                console.log(e);
                
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
  
}

export default useGetCompanyById