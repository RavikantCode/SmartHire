import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'


const category = [
    "frontend developer",
    "backend developer",
    "structure developer",
    "data science ",
    "Graphic Designer",
    "full stack developer",
    "AI development",
    "Game Developer",
    "Cloud Enginner",
    "Data Scientist",
    "Bloack Chain Developer"
]
function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const searchJobHandler=()=>{
        dispatch(setSearchQuery(query));
        navigate('/browse')
    }

  return (
    <>
        <div className='w-full max-w-4xl mx-auto my-20'>
        <Carousel>
            <CarouselContent>
            {
                category.map((item,index)=>{
                    return <div className='p-2'>
                                <CarouselItem classname="md:basis-1/2 lg-basis-1/3">
                                    <Button onClick={()=>searchJobHandler(cat)} className="bg-white border shadow-md hover:bg-blue-700 hover:text-white text-blue-700 rounded-full" key={index}>{item}</Button>
                                </CarouselItem>
                            </div>
                })
            }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
        </div>
    </>
  )
}

export default Category