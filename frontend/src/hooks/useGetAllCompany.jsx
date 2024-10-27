
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPANY_API_END_POINT } from '@/utils/endpoint'
import { setCompanies } from '@/redux/companySlice'
import store from '@/redux/store'

const useGetAllCompany = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    
    useEffect(()=>{
        const fetchCompany = async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
                console.log(res.data);
                
                if(res.data.success){
                    let companies =[];
                    if(Array.isArray(res.data)){
                        companies = res.data.company;
                    }else if(typeof res.data === 'object' && res.data !=null){
                        companies = [res.data.company];
                    }else{
                        console.log('Fetched data is neither an data or object');
                        
                    }
                    // dispatch(setCompanies(res.data.company));
                    // const userCompanies = companies.filter(company=>company.userId)

                    const userCompanies = companies.filter(company => company.userId === user._id);
                    const isCompanyRegistered = userCompanies.length > 0;
                    dispatch(setCompanies(companies));
                    console.log('Dispatched companies', companies);
                    console.log('User Companies:', userCompanies);
                    console.log('Is Company Registered:', isCompanyRegistered);
                    
                }
            }
            catch(e){
                console.log(e);
                
            }
        }
        fetchCompany();
    },[dispatch])
  
}

export default useGetAllCompany