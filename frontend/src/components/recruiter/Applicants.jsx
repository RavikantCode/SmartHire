import React, { useEffect } from 'react'
import Navbar from '../reusable/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/endpoint'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import store from '@/redux/store'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                console.log("data from API", res.data);
                dispatch(setApplicants(res.data.job));
                console.log('applicants set to redux', res.data.job);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

 
    const applicationCount = applicants?.applications?.length || 0;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Applicants{' '}({applicationCount})
                    </h1>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {applicationCount > 0 ? (
                        <ApplicantsTable />
                    ) : (
                        <p>No applicants found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applicants;
