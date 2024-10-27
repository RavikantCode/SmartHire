import React, { useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/endpoint";
import { useDispatch, useSelector } from "react-redux";
import { MdCurrencyRupee } from "react-icons/md";
import { setSearchQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const dispatch = useDispatch();
  const { allJobs ,searchQuery} = useSelector((state) => state.job);

  const [selectedValue, setSelectedValue] = useState({
    experience: 1,
    jobType: "",
    jobRole: "",
    locations: [],
    position: "",
    salary: 10,
  });
  console.log("bhai yeh kya ho raha hain", selectedValue);

 
  const { experience, jobType, jobRole, locations, position, salary } =
    selectedValue;

  const roles = [
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Blockchain Developer",
  ];

  const locationsOptions = [
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Delhi",
  ];

  const positions = [
    "Junior Level",
    "Mid Level",
    "Senior Level",
    "Manager",
    "CTO",
    "Director",
  ];

 
  useEffect(() => {
    
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, {
        params: selectedValue,
        withCredentials: true,
      });
      console.log("smart hun maine",response.data.job);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedValue]);

 
  const handleChange = (key, value) => {
    setSelectedValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleLocationChange = (location) => {
    setSelectedValue((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((loc) => loc !== location)
        : [...prev.locations, location],
    }));
  };

  const resetFilters = () => {
    setSelectedValue({
      experience: 1,
      jobType: "",
      jobRole: "",
      locations: [],
      position: "",
      salary: 10,
    });
  };

  return (
    <div className="p-2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        <button
          className="text-sm text-blue-500 hover:shadow-xs hover:text-blue-700"
          onClick={resetFilters}
        >
          Remove Filters
        </button>
      </div>
      <hr className="my-4 border-gray-300" />

    
      <div className="mb-4">
        <h3 className="font-medium mb-2">Job Type</h3>
        <div>
          {["full-time", "part-time", "internship"].map((type) => (
            <label className="block mb-2" key={type}>
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={jobType === type}
                onChange={() => handleChange("jobType", type)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />

     
      <div className="mb-4">
        <h3 className="font-medium mb-2">Department</h3>
        <div>
          {roles.map((role, index) => (
            <label className="block mb-2" key={index}>
              <input
                type="radio"
                name="jobRole"
                value={role}
                checked={jobRole === role}
                onChange={() => handleChange("jobRole", role)}
                className="mr-2"
              />
              {role}
            </label>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />

    
      <div className="mb-4">
        <h3 className="font-medium mb-2">Experience (Years)</h3>
        <input
          type="range"
          min="0"
          max="10"
          step="1" 
          value={experience} 
          onChange={(e) =>
            handleChange("experience", parseInt(e.target.value, 10))
          } 
          className="range-slider"
        />
        <div className="flex justify-between text-sm">
          <span>0 Years</span>
          <span>{experience >= 10 ? "10" : `${experience} Years`}</span>
          <span>10+ Years</span>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />
     
      <div className="mt-10">
        <h3 className="font-medium mb-2">Location</h3>
        <div>
          {locationsOptions.map((location, index) => (
            <label className="block mb-2" key={index}>
              <input
                type="checkbox"
                value={location}
                checked={locations.includes(location)}
                onChange={() => handleLocationChange(location)}
                className="mr-2"
              />
              {location}
            </label>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />

     
      <div className="mb-4">
        <h3 className="font-medium mb-2">Position Level</h3>
        <div>
          {positions.map((pos, index) => (
            <label className="block mb-2" key={index}>
              <input
                type="radio"
                name="position"
                value={pos}
                checked={position === pos}
                onChange={() => handleChange("position", pos)}
                className="mr-2"
              />
              {pos}
            </label>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />

     
      <div className="mb-4">
        <h3 className="font-medium mb-2">Salary Range</h3>
        <div className="relative">
  <input
    type="range"
    min="1"           
    max="100"         
    step="1"         
    value={salary}    
    onChange={(e) => handleChange("salary", Number(e.target.value))}
    className="range-slider"
  />
  <div className="flex justify-between text-sm absolute top-8 left-0 right-0">
    <span className="flex items-start">
      1 LPA
    </span>
    <span className="flex items-start">
      {salary} LPA
    </span>
    <span className="flex items-start">
      100 LPA+
    </span>
  </div>
</div>

      </div>
    </div>
  );
};

export default FilterCard;
