import React, { useEffect } from 'react';
import Navbar from '../reusable/Navbar';
import { Button } from "../ui/button";
import { FaLink, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'; // Importing the icons
import { useSelector, useDispatch } from 'react-redux';
import useGetTpoCompany from '@/hooks/useGetTpoCompany'; // Custom hook that fetches company data
import axios from 'axios';
import { toast } from 'sonner';
import USER_API_END_POINT from '@/utils/endpoint'; // Import your API endpoint

function TpoCompany() {
  useGetTpoCompany(); // Fetch the company data using the custom hook
  const dispatch = useDispatch(); // Create a dispatch function to update the Redux state
  const { TpoCompany } = useSelector((state) => state.company); // Get TpoCompany from Redux

  useEffect(() => {
    console.log("TPO Company data ---- from redux", TpoCompany);
  }, [TpoCompany]);

  const handleAccept = async (companyId) => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/acceptCompany/${companyId}`, { isAccepted: "accepted" }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept the company.");
    }
    console.log('Accepted company ID:', companyId);
  };

  const handleReject = async (companyId) => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/acceptCompany/${companyId}`, { isAccepted: "rejected" }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject the company.");
    }
    console.log('Rejected company ID:', companyId);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-3xl font-extrabold mb-10 text-center text-gray-800">Top Companies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TpoCompany && TpoCompany.length > 0 ? (
            TpoCompany.map((item, index) => (
              <div
                key={index}
                className="relative border border-gray-200 rounded-2xl bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={ "https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg"} 
                    alt={item.name || 'Company Logo'}
                    className="w-20 h-20 object-contain mb-4 rounded-full bg-gray-50 shadow-md"
                  />
                  <div className="w-full text-center mt-2">
                    <h1 className="font-semibold text-xl text-gray-800">{item.name || 'Company Name'}</h1>
                    <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                      <FaMapMarkerAlt className="text-blue-500 mr-1" />
                      <p>{item.location || 'Location not specified'}</p>
                    </div>
                  </div>
                </div>  
                <div className="mt-6">
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FaInfoCircle className="text-blue-500 mr-1" /> 
                    <p>{item.description || 'No description available.'}</p>
                  </div>
                  <a
                    href={item.website || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLink className="mr-1" /> Visit Website
                  </a>
                </div>

                {item.isAccepted === 'accepted' ? (
                  <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Accepted</span>
                ) : item.isAccepted === 'rejected' ? (
                  <span className="absolute top-4 right-4 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">Rejected</span>
                ) : (
              
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      onClick={() => handleAccept(item._id)}
                      className="rounded-full bg-green-600 text-white px-6 py-2 shadow hover:bg-green-700 transition-all"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(item._id)} 
                      className="rounded-full bg-red-600 text-white px-6 py-2 shadow hover:bg-red-700 transition-all"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No companies available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TpoCompany;
