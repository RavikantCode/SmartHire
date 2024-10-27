import { Label } from "@radix-ui/react-label";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";
import USER_API_END_POINT from '@/utils/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading } from '@/redux/authSlice';
import { useEffect } from "react";

function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCodeInput,setShowCodeInput] = React.useState(false)
  const [input, setInput] = React.useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
    role: "",
    tpocode:''
  });
  const navigate = useNavigate();
  const {loading,user} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const changeRoleHandler = (value) => {
    setInput((prev) => ({ ...prev, role: value }));
    setShowCodeInput(value==='TPO')
  };

  const changeCodeHandler = (e)=>{
    setInput((prev)=>({...prev,tpocode:e.target.value}));
  }

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const eventSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,input,{
        headers:{"Content-type":"application/json"},
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.msg)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg)
    }finally{
      dispatch(setLoading(false))
    }
    };

    useEffect(()=>{
      if(user){
        navigate('/')
      }
    })

  return (
    <>
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl bg-white">
        <div className="select-none">
          <h1>
            <span className="text-4xl font-bold text-blue-700">Smart</span>
            <span className="text-2xl">Hire</span>
          </h1>
        </div>

        <div className="select-none">
          <p className="font-semibold">Already Registered?{" "}<Link to="/Login" className="text-blue-700 underline font-semibold">Login{" "}</Link>Here</p>
        </div>
      </div>

      <div id="main" className="bg-slate-100 max-w-8xl w-full p-16 flex justify-evenly">
      
        <div id="leftpanel" className="select-none">
          <div id="image" className="border shadow-md p-5 bg-white rounded-3xl flex flex-col justify-center items-center">
            <img className="rounded-xl h-40 w-40" src="https://static.naukimg.com/s/7/104/assets/images/white-boy.a0d2814a.png" alt="Registration Illustration" />
            <h1 className="font-semibold flex justify-center text-lg m-2">Register Now and Get</h1>
            <ul className="space-y-3 flex flex-col w-64">
              {[
                "Build SmartHire Profile and let recruiters find you",
                "Get Job Posting Delivered Right To Your Mail",
                "Ranks candidates by highest percentage scores"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <IoIosCheckmarkCircle className="inline text-2xl text-green-600 mr-2" />
                  <p>{item}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div id="rightpanel" className="border bg-white rounded-3xl p-20 shadow-md w-3/5">
          <div className="mb-9">
            <h2 className="text-xl font-semibold select-none">
              Create Your SmartHire Profile
            </h2>
            <p className="text-gray-400 select-none">
              A Comprehensive web framework for campus placement
            </p>
          </div>

          <form onSubmit={eventSubmitHandler} className="flex flex-col gap-4">
            {[
              { name: "fullname", label: "Full Name", type: "text", placeholder: "Enter Your Name" },
              { name: "email", label: "Email ID", type: "email", placeholder: "Enter Your Email" },
              { name: "phoneNumber", label: "Mobile Number", type: "text", placeholder: "Enter Your Mobile Number" },
              { name: "location", label: "Location", type: "text", placeholder: "Enter Your Location" }
            ].map((field, index) => (
              <div key={index} className="flex flex-col my-2 w-full">
                <Label className="font-semibold select-none" htmlFor={field.name}>
                  {field.label}<span className="text-red-600">*</span>
                </Label>
                <input
                  name={field.name}
                  className="p-2 rounded-2xl border"
                  type={field.type}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  placeholder={field.placeholder}
                  required
                />
              </div>
            ))}

            <div className="flex flex-col my-2 w-full">
              <Label className="font-semibold select-none" htmlFor="password">
                Password<span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <input
                  name="password"
                  className="p-2 w-full rounded-2xl border"
                  type={showPassword ? 'text' : 'password'}
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Enter Your Password"
                  required
                  minlength="8" maxlength="20"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                {/* <small>Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, and one number.</small> */}
                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                  {showPassword ? <BsEyeSlash onClick={handleShowPassword} /> : <BsEye onClick={handleShowPassword} />}
                </div>
                
              </div>
              <small>Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, and one number.</small>

            </div>

            <div className="flex flex-col my-2 w-40">
              <Label className="font-semibold select-none" htmlFor="role">
                Select Role<span className="text-red-600">*</span>
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-gray-400 w-28 rounded-lg">{input.role || "Select Role"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="select-none">Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={input.role} onValueChange={changeRoleHandler}>
                    <DropdownMenuRadioItem value="TPO">TPO</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Student">Student</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Recruiter">Recruiter</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {showCodeInput && (
              <div className="flex flex-col my-2 w-full max-w-xs">
                <Label className="font-semibold select-none" htmlFor="tpocode">Enter TPO Code<span className="text-red-600">*</span></Label>
                <input id="tpocode" name="tpocode" className="p-2 rounded-2xl border" type="text" value={input.tpocode} onChange={changeCodeHandler} placeholder="Enter TPO Code" required/>
              </div>
            )}

            <Button type="submit" className="w-full rounded-3xl bg-blue-500 select-none">Register</Button>
          </form>

        </div>
      </div>
    </>
  );
}

export default Signup;
