import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import USER_API_END_POINT from '@/utils/endpoint';
import { setTpoCompany } from '@/redux/companySlice';

const useGetTpoCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTpoCompany = async () => {
      try {
       
        const res = await axios.get(`${USER_API_END_POINT}/getCompany`, { withCredentials: true });             //see the userapiend point it means it from tpo 

          dispatch(setTpoCompany(res.data.company));   
        
      } catch (error) {
        console.error('Error while fetching companies:', error);
      }
    };

    fetchTpoCompany();
  }, [dispatch]);
};

export default useGetTpoCompany;
