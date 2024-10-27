import React, { useEffect } from 'react'
import Navbar from './reusable/Navbar'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Category from './Category'
import Footer from './Footer'
import TopHiring from './TopHiring'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {user}  =useSelector(store=>store.auth);
  const navigate=useNavigate()
  useGetAllJobs();

  useEffect(()=>{

      if(user?.role=== 'TPO'){
        navigate("/tpo/")
      }

      if(user?.role === 'Recruiter'){
        navigate("/recruiter/")
      }
  },[])

  return (
    <div className='bg-slate-50'>
         <Navbar></Navbar>    
         <HeroSection></HeroSection>
         {/* <Category></Category> */}
         <LatestJobs></LatestJobs>
         <TopHiring ></TopHiring>
         <Footer></Footer>
    </div>
  )
}

export default Home