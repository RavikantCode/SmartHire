import USER_API_END_POINT from '@/utils/endpoint';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
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
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  });
  const {loading,user} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeRoleHandler = (value) => {
    setInput((prev) => ({ ...prev, role: value }));
  };
  

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const eventSubmitHandler = async (e) => {
    e.preventDefault();

    
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{"Content-type":"application/json"},
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user))

        if (input.role === "TPO") {
          navigate("/tpo/");
        } else if (input.role === "Recruiter") {
          navigate("/recruiter/");
        } else   {
          navigate("/");
        }

        // navigate("/")
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
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl bg-white px-6">
        <div className="select-none">
          <h1>
            <span className="text-4xl font-bold text-blue-700">Smart</span>
            <span className="text-2xl">Hire</span>
          </h1>
        </div>

        <div>
          <Button className="bg-slate-100 text-black mr-5 hover:bg-blue-500 w-28 rounded-lg">Login</Button>
          <Button className="bg-blue-700 text-white w-28 rounded-lg hover:bg-blue-800">
            <Link to='/Signup'>Sign Up</Link>
          </Button>
        </div>
      </div>

      <div className='bg-gradient-to-r from-blue-700 to-blue-700 min-h-screen flex items-center justify-center'>
        <div className="bg-white max-w-6xl w-full p-10 flex justify-evenly shadow-2xl rounded-lg">
          <div id="leftpanel" className='flex flex-col justify-center items-center'>
            <div className="p-5 flex justify-center">
              <img className="rounded-xl h-80 w-72 shadow-lg" src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725148800&semt=ais_hybrid" alt="Login Illustration" />
            </div>
          </div>

          <div id="rightpanel" className="bg-white p-10 shadow-md w-2/5 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-8">Login Here</h2>

            <form onSubmit={eventSubmitHandler}>
              <div className="flex flex-col my-4 w-full">
                <Label className="font-semibold mb-2">Email ID</Label>
                <input
                  className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="flex flex-col my-4 w-full">
                <Label className="font-semibold mb-2">Password</Label>
                <div className="relative">
                  <input
                    name="password"
                    className="p-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type={showPassword ? 'text' : 'password'}
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Enter Your Password"
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer">
                    {showPassword ? (
                      <BsEyeSlash onClick={handleShowPassword} />
                    ) : (
                      <BsEye onClick={handleShowPassword} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col my-4 w-full">
                <Label className="font-semibold mb-2">Select Role</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-gray-500 w-full rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {role || "Select Role"}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={role}
                      onValueChange={(value) => {
                        setRole(value);
                        changeRoleHandler(value);
                      }}
                    >
                      <DropdownMenuRadioItem value="TPO">TPO</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Student">Student</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Recruiter">Recruiter</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {
                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>Please wait</Button> : 
                <div className="my-4">
                <Button type="submit" className="w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md">
                  Login
                </Button>
              </div>
              } 
            </form>
            <div className='flex justify-center text-blue-600 hover:text-blue-800 hover:underline  cursor-pointer'>
              {/* <h2>Forgot Password</h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
