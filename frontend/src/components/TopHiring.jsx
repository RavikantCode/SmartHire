import React from 'react';
import LatestCompanyCards from './LatestCompanyCards';
import { useSelector } from 'react-redux';

const randomJobs = [1];

function TopHiring() {
  const {user} = useSelector(store=>store.auth);


  if(!user){
    return<div className='mt-10'>
      .
    </div>;
  } 

  return (
    <>
      <h1 className='text-4xl font-bold text-center mt-8 mb-5'>
        Top <span className='text-blue-700'>Hiring Companies</span>
      </h1>
      <div className='max-w-xl mx-auto my-2'>
        <div className='flex justify-center'>
          <div className='grid grid-cols-1 gap-4'>
            {randomJobs.map((item, index) => (
              <div key={index} className='w-full'>
                <LatestCompanyCards />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHiring;
