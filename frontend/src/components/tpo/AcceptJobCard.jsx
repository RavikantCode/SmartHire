import React from 'react';
import { Badge } from '../ui/badge';
import { Ghost, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AcceptJobCard({ job }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (job?._id) {
      navigate(`/description/${job._id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="transition-transform transform hover:scale-105 duration-200 ease-in-out"
    >
      <div
        className={`border p-5 rounded-xl shadow-lg cursor-pointer bg-white border-gray-200 hover:shadow-2xl transition-shadow duration-300`}
      >
        {/* Company Section */}
        <div className="mb-4">
          <h1 className='font-bold text-xl text-gray-900'>{job?.companyId?.name}</h1>
          
          {/* Location with MapPin Icon */}
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <p>{job?.location}</p>
          </div>
        </div>

        {/* Job Title with Briefcase Icon */}
        <div className="mb-4">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className='font-semibold text-lg text-blue-600'>{job?.title}</h2>
          </div>
          
          {/* Job Description */}
          <p className='text-sm text-gray-700 mt-2'>{job?.description}</p>
        </div>

        {/* Badges Section */}
        <div className='flex flex-wrap items-center gap-3 mt-4'>
          <Badge className={'bg-blue-100 text-blue-700 font-semibold'} variant={Ghost}>
            {job?.position} Position
          </Badge>
          <Badge className={'bg-red-100 text-red-500 font-semibold'} variant={Ghost}>
            {job?.jobType}
          </Badge>
          <Badge className={'bg-green-100 text-green-600 font-semibold'} variant={Ghost}>
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default AcceptJobCard;
