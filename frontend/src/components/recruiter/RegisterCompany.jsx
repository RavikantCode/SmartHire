import React from "react";
import Navbar from "../reusable/Navbar";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import Footer from "../Footer";

const RegisterCompany = () => {
  useGetAllCompany(); // Fetch companies using the custom hook
  const navigate = useNavigate();
  const [openss, setOpenss] = React.useState(false);

  // Select companies and user from Redux store
  const { companies } = useSelector((store) => store.company);
  const { user } = useSelector((store) => store.auth);

  console.log("from register company", companies);
  console.log("user id from register", user._id);

  // Filter companies based on userId
  const userCompanies = companies.filter(company => company.userId === user._id);
  const isCompanyRegistered = userCompanies.length > 0;

  // Extracting company details
  const companyDetails = isCompanyRegistered ? userCompanies[0] : null;
  console.log("company deatils",companyDetails);
  

  return (
    <div>
      <Navbar />

      <div
        className="relative bg-cover bg-[left_top] bg-no-repeat h-[50vh] md:h-[60vh] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: "url('https://static.naukimg.com/s/0/0/i/role-collection-ot.png')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text on top of the image */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">Explore the Best Opportunities</h1>
          <p className="m-4 text-lg">
            Streamline your recruitment process and find the best talent with ease.
          </p>
          {/* <Button
            onClick={() => navigate("/company/create")}
            className="mt-6 px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Register Company
          </Button> */}
          {isCompanyRegistered?<Button onClick={()=>navigate('/ManageJobs')} className="bg-blue-600">Start Hiring</Button>:<Button
            onClick={() => navigate("/company/create")}
            className="mt-6 px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Register Company
          </Button>}
          
        </div>
      </div>

      {/* Additional section with company card and second image */}
      <div className="max-w-4xl mx-auto my-10 flex flex-col md:flex-row gap-10 items-start">
        {/* Company Card */}
        {companyDetails ? (
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 duration-300 ease-in-out relative max-w-xs w-full">
  {/* <FaEdit
    onClick={() => setOpenss(true)}
    className="text-white absolute top-4 right-4 cursor-pointer hover:text-blue-200 transition-colors duration-200"
  /> */}

  <div className="flex items-center mb-4">
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/016/119/079/small/factory-logo-factory-industrial-production-building-logo-template-vector.jpg" 
      alt="Company Logo"
      className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-lg"
    />
    <h1 className="text-3xl font-semibold text-white ml-4">
      {companyDetails.name}
    </h1>
  </div>

  <p className="text-white mb-2">{companyDetails.description}</p>

  <p className="text-white mb-2">
    Website:{" "}
    <a href={companyDetails.website} className="text-blue-200 hover:underline">
      {companyDetails.website}
    </a>
  </p>

  <p className="text-white mb-2">Location: {companyDetails.location}</p>


  <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${companyDetails.isAccepted === "accepted" ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
    {companyDetails.isAccepted === "accepted" ? 'Accepted' : 'Pending'}
  </div>
</div>

        ) : (
          <p className="text-gray-800">
         
          </p>
        )}

   
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <img
            src="https://static.naukimg.com/s/0/0/i/ff-services-ot.png"
            alt="Role Collection"
            className="w-full md:w-1/2 rounded-2xl mb-6 md:mb-0"
          />
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold">Find the Best Talent</h2>
            <p className="mt-4 text-gray-700">
              Streamline your recruitment process and discover skilled candidates with ease. Register your company to start hiring today.
            </p>
            <Button
              onClick={() => navigate("/ManageJobs")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Start Hiring
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterCompany;
