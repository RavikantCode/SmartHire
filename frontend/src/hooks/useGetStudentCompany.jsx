import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '@/utils/endpoint';
import { setStudentCompany } from '@/redux/companySlice';

const useGetStudentCompany = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStudentCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/company`, { withCredentials: true });
                console.log('API response:', res.data);

                if (res.data.succees) {
                    const companyData = res.data.company;

                    if (Array.isArray(companyData)) {
                        dispatch(setStudentCompany(companyData));
                    } else {
                        console.log('Fetched data is not in expected array format');
                    }

                    console.log('Dispatched student companies:', companyData);
                } else {
                    console.error('API response does not indicate success.');
                }
            } catch (error) {
                console.error('Error fetching student company data:', error);
            }
        };

        fetchStudentCompany();
    }, [dispatch]);
};

export default useGetStudentCompany;
