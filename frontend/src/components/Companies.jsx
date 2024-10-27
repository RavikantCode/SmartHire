import React from 'react';
import Navbar from './reusable/Navbar';
import { Button } from "./ui/button";
import { FaLink } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import useGetStudentCompany from '@/hooks/useGetStudentCompany';

function Companies() {
  useGetStudentCompany();
  const { studentCompany } = useSelector(store => store.company);
  console.log("student company", studentCompany);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Companies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentCompany && studentCompany.length > 0 ? (
            studentCompany.map((company, index) => (
              <div key={index} className="border border-gray-100 p-6 rounded-xl bg-white shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-200 ease-in-out">
              <div className="flex flex-col items-center">
 
  <img
    src={
      company.logo
        ? company.logo
        : "https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg"
    }
    alt={company.name}
    className="w-16 h-16 object-contain mb-4"
  />
  
  <div className="bg-blue-300 p-4 rounded-lg w-full text-center">
    <h1 className="font-medium text-lg">{company.name}</h1>
    <p className="text-sm text-gray-500">{company.location}</p>
  </div>
</div>


                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">{company.description}</p>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline ml-4">
                    <FaLink className="mr-1" /> Visit Website
                  </a>
                </div>
                {/* <div className="flex items-center justify-center gap-2 mt-6">
                  <Button className="rounded-full bg-blue-100 text-blue-700 hover:bg-white hover:border-blue-500" variant="outline">
                    View Jobs
                  </Button>
                </div> */}
              </div>
            ))
          ) : (
            <p>No Companies Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;
