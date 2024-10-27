import React from "react";
import axios from "axios"; 
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import USER_API_END_POINT from "@/utils/endpoint";
import { FiSave } from "react-icons/fi";
import store from "@/redux/store";

function Navbar() {
  const { user } = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    console.log("Logout handler triggered");

    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });
      console.log("Logout response:", res.data); 
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.error("Logout error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage);
    }
  };

  

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl">
        <div className="select-none">
          <h1>
            <span className="text-4xl font-bold text-blue-700">Smart</span>
            <span className="text-2xl">Hire</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          {
            !user ? (
            <div className="flex gap-10">
              <Button className="bg-slate-200 text-black hover:bg-black hover:text-white w-28 rounded-lg">
                <Link to={'/Login'}>Login</Link>
              </Button>
              <Button className="bg-blue-700 w-28 rounded-lg">
                <Link to={'/SignUp'}>SignUp</Link>
              </Button>
            </div>
          ) : (
            <>
             {user.role === 'Recruiter' && (
                  <ul className="flex font-normal gap-8 cursor-pointer">
                    <li><Link to={'/recruiter/'}>Dashboard</Link></li>
                    <li><Link to={'/ManageJobs'}>Manage Jobs</Link></li>
                    {/* <li><Link to={'/ViewApplications'}>View Applications</Link></li> */}
                  </ul>
             )}
             {user.role === 'Student' && (
              <ul className="flex font-normal gap-8 cursor-pointer">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/jobs'}>Jobs</Link></li>
                <li><Link to={'/company'}>Companies</Link></li>
                <li><Link to={'/Browse'}>Browse</Link></li>
              </ul>
             )}
             {user.role === 'TPO' && (
              <ul className="flex font-normal gap-8 cursor-pointer">
                <li><Link to={'/tpo/'}>Home</Link></li>
                <li><Link to={'/TpoJobs'}>Joboffers</Link></li>
                <li><Link to={'/TpoCompany'}>Companies</Link></li>
  
              </ul>
             )}
             
              <div className="w-10">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-10 h-10 cursor-pointer">
                      <AvatarImage
                        src={user.profilePhoto || "https://cdn-icons-png.flaticon.com/512/9187/9187532.png"}
                        alt="@shadcn"
                        className="w-full h-full rounded-full"
                      />
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-96 h-[40rem]">
                    <div className="flex space-y-0 m-3">
                      <Avatar className="w-14 h-14 cursor-pointer">
                        <AvatarImage
                          src="https://cdn-icons-png.flaticon.com/512/9187/9187532.png"
                          alt="@shadcn"
                          className="w-full h-full rounded-full"
                        />
                      </Avatar>
                      <div>
                        <h3 className="font-semibold ml-4">{user.fullname}</h3>
                        <Button className="text-blue-600" variant="link">
                          <Link to={'/profile'}>View & Update Profile</Link>
                        </Button>
                      </div>
                    </div>
                    <hr />
                    {user.role === 'Student' || user.role === 'TPO' ?   <div className="flex w-fit my-2 gap-3 text-gray m-5">
                      <FiSave className="mt-2 text-2xl"/>
                      <Button variant="link"><Link to={`/SavedJobs`}>Saved Jobs</Link></Button>
                    </div> : <div></div>
                    }
                  

                    <div className="flex w-fit my-2 gap-3 text-gray m-5">
                      <LogOut className="mt-2"/>
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
