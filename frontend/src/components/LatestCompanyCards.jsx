import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from "./ui/button";
import { useSelector } from 'react-redux';
import useGetStudentCompany from "@/hooks/useGetStudentCompany";
import { FaLink } from 'react-icons/fa';

function LatestCompanyCards() {
  useGetStudentCompany(); 
  const { studentCompany } = useSelector(store => store.company);

  return (
    <div className='border border-gray-100 p-3 max-w-lg rounded-xl bg-white shadow-xl cursor-pointer'>
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {studentCompany && studentCompany.length > 0 ? (
            studentCompany.map((company, index) => (
              <CarouselItem key={index}>
                <div className='p-2'>
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
                    <h1 className='font-medium text-lg'>{company.name}</h1>
                    <p className='text-sm text-gray-500'>{company.location}</p>
                  </div>
                  <div className='mt-2'>
                  <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">{company.description}</p>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline ml-4">
                    <FaLink className="mr-1" /> Visit Website
                  </a>
                </div>
                  </div>
                  {/* <div className='flex items-center justify-center gap-2 mt-4'>
                    <Button className="rounded-full bg-blue-100 text-blue-700 hover:bg-white hover:border-blue-500" variant="outline">View Jobs</Button>
                  </div> */}
                </div>
              </CarouselItem>
            ))
          ) : (
            <p>No Companies Found</p>
          )}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default LatestCompanyCards;
