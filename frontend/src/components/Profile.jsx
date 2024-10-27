import React from "react";
import Navbar from "./reusable/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Mail, Contact, Pen } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Label } from "@radix-ui/react-label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import USER_API_END_POINT from "@/utils/endpoint";

const isResume = true


const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  
  const profile = user?.profile || {}; 

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-slate-50 border border-gray-50 rounded-2xl my-5 p-8">
        <div className="flex items-center rounded-xl bg-blue-300 p-2 gap-4">
          <Avatar className="w-28 h-28 flex items-center">
            <AvatarImage
              src={
                "https://cdn-icons-png.flaticon.com/512/9187/9187532.png"
                
              }
              alt="Profile Photo"
              className="rounded-full"
            />
          </Avatar>

          <div className="p-4 h-28 w-full flex justify-between">
            <div>
              <h1 className="font-medium text-2xl">{user.fullname}</h1>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
            <Button variant="outline">
              <Pen onClick={() => setOpen(true)} />
            </Button>
          </div>
        </div>

        <div className="my-8 bg-blue-300 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Mail className="text-xl" />
              <span className="text-lg w-48">{user.email}</span>
            </div>

            <div className="flex items-center gap-2 sm:ml-8 mt-2 sm:mt-0">
              <MdLocationPin className="text-2xl" />
              <span className="text-lg">{profile.location}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-8">
            <div className="flex items-center gap-2">
              <Contact className="text-xl" />
              <span className="text-lg w-48">{user.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-2 sm:ml-8 mt-2 sm:mt-0">
              <FaGithub className="text-xl" />
              {profile.gitHubLink ? (
                <a
                  href={profile.gitHubLink}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {profile.gitHubLink}
                </a>
              ) : (
                <span>Not Available</span>
              )}
            </div>
          </div>
        </div>

        <div className="my-8 bg-blue-300 p-4 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold mb-4">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.length > 0 ? (
              profile.skills.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full shadow-md"
                >
                  {item}
                </div>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
       
          
        {user.role === "Student" ?  <div className="bg-blue-300 grid items-center p-4 rounded-lg gap-2">
          <Label className="text-xl font-semibold">Resume</Label>
          {/* {profile.resume?.length > 0 ? (
            <a target="blank" href={user?.profile.resume[0]}>
              View Resume
            </a>
          ) : (
            <span>Not Available</span>
          )} */}

          {
            isResume ? <a target="blank" href={`${USER_API_END_POINT}/files/${user.profile.resume[0]}`} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>
            : <span>NA</span>
            
          }
        </div>:<div></div>}

        {/* <div className="bg-blue-300 grid items-center p-4 rounded-lg gap-2">
          <Label className="text-xl font-semibold">Resume</Label>
          {/* {profile.resume?.length > 0 ? (
            <a target="blank" href={user?.profile.resume[0]}>
              View Resume
            </a>
          ) : (
            <span>Not Available</span>
          )} */}

          {/* {
            isResume ? <a target="blank" href={`${USER_API_END_POINT}/files/${user.profile.resume[0]}`} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>
            : <span>NA</span>
            
          }
        </div> */}

          {user.role === "Student" ? <div className="max-w-7xl mx-auto my-8 bg-blue-300 p-4 rounded-lg shadow-lg">
          <h1 className="font-semibold mb-2 text-xl">Applied Jobs</h1>
          <AppliedJobsTable />
        </div> : <div></div> }
        {/* <div className="max-w-7xl mx-auto my-8 bg-blue-300 p-4 rounded-lg shadow-lg">
          <h1 className="font-semibold mb-2 text-xl">Applied Jobs</h1>
          <AppliedJobsTable />
        </div> */}

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
