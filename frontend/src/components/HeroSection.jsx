import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';
import store from '@/redux/store';

function HeroSection() {
  const [query,setQuery] = useState("");
  console.log("query section from Herosection",query);
  
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const {user} = useSelector(store=>store.auth);

 
  const searchJobHandler=()=>{
    if(user){
      dispatch(setSearchQuery(query));
      navigate('/browse')
    }
     
  }
  return (
    <>
        <div className=' p-2'>
            <div className='flex flex-col items-center text-center gap-2'>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 select-none">Discover, Apply &<br/>Land Your <span className='text-blue-700'>Ideal Career</span></h1>
                <p className='px-6 py-3 bg-white text-[#F83002] rounded-full select-none  font-semibold shadow-lg'>Your Ultimate Job Search Partner</p>
            </div>
            <br/>
            <div className="relative flex w-[60%] items-center gap-4 mx-auto">
              <div className=" w-full">
                <input onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="Find Your Job Right Now" className="outline-none w-full h-14 border border-gray-100 px-12 text-md rounded-full  shadow-xl focus:shadow-blue-200"/>
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
              </div>
              <Button onClick={searchJobHandler} className="absolute w-32 top-1/5 right-2 hover:bg-blue-700 rounded-full">Search</Button>
            </div>
        </div>
    </>
  )
}

export default HeroSection