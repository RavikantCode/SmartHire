import React, { useEffect, useState } from 'react';
import Navbar from '../reusable/Navbar';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useGetTpoJobs from '@/hooks/useGetTpoJobs';
import useGetTpoCompany from '@/hooks/useGetTpoCompany'; 
import AcceptJobCard from './AcceptJobCard';
import { FaLink, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'; 
import Footer from '../Footer';

const TpoDash = () => {
  useGetTpoJobs();
  useGetTpoCompany(); 
  const [loading, setLoading] = useState(true);
  const { TpoJobs } = useSelector(store => store.job);
  const { TpoCompany } = useSelector(store => store.company); 
  const location = useLocation();
  const selectedCompanyId = new URLSearchParams(location.search).get('companyId');

  useEffect(() => {
    if (TpoJobs?.job || TpoCompany?.length > 0) {
      setLoading(false);
    }
  }, [TpoJobs, TpoCompany]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-slate-100 min-h-screen p-4">
        <div className="bg-blue-200 rounded-xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 shadow-lg mb-8">
          <h2 className="col-span-full text-xl font-bold text-center text-blue-700">Job Offers</h2>
          {TpoJobs?.job?.length > 0 ? (
            TpoJobs.job.slice(0, 3).map((job, index) => (
              <div key={job._id || index} className="bg-white shadow-md rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
                <AcceptJobCard job={job} />
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-xl flex justify-center items-center h-full">No Job Offers Available</span>
          )}
          <div className="col-span-full flex justify-center items-center mt-4">
            {TpoJobs?.job?.length > 0 && (
              <Link
                to="/TPOJobs"
                className="text-blue-700 font-semibold text-center hover:underline transition-colors duration-300"
              >
                View More Job Offers
              </Link>
            )}
          </div>
        </div>

        <div className="bg-blue-200 rounded-xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 shadow-lg">
          <h2 className="col-span-full text-xl font-bold text-center text-blue-700">Companies</h2>
          {TpoCompany && TpoCompany.length > 0 ? (
            TpoCompany.slice(0, 3).map((company, index) => (
              <Link
                key={company._id || index}
                to={`/TpoCompany?companyId=${company._id}`} 
                className={`bg-white shadow-md rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl ${selectedCompanyId === company._id ? 'bg-yellow-200' : ''}`} // Highlight if selected
              >
                <div className="flex flex-col items-center">
                  <img
                    // src={'https://via.placeholder.com/150'} 
                    src={ "https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg"} 

                    alt={company.name || 'Company Logo'}
                    className="w-16 h-16 object-contain mb-4"
                  />
                  <h1 className="font-medium text-lg text-center">{company.name || 'Company Name'}</h1>
                  <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                    <FaMapMarkerAlt className="text-blue-500 mr-1" />
                    <p>{company.location || 'Location not specified'}</p>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <FaInfoCircle className="text-blue-500 mr-1" />
                    <p>{company.description || 'No description available.'}</p>
                  </div>
                  <a
                    href={company.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mt-2"
                  >
                    <FaLink className="mr-1" /> Visit Website
                  </a>
                </div>
              </Link>
            ))
          ) : (
            <span className="text-gray-500 text-xl flex justify-center items-center h-full">No Companies Available</span>
          )}

          <div className="col-span-full flex justify-center items-center mt-4">
            {TpoCompany?.length > 0 && (
              <Link
                to="/TpoCompany"
                className="text-blue-700 font-semibold text-center hover:underline transition-colors duration-300"
              >
                View More Companies
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TpoDash;
