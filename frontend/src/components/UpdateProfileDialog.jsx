import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import USER_API_END_POINT from "@/utils/endpoint";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    profilePhoto: user?.profile?.profilePhoto || null,
    fullname: user?.fullname || "",
    email: user?.email || "",
    contact: user?.phoneNumber || "",
    location: user?.profile?.location || "",
    github: user?.profile?.github || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: null, // Renamed for clarity
  });

  console.log(input);
  

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.contact);
    formData.append("location", input.location);
    formData.append("github", input.github);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.msg);
        setOpen(false); // Close the dialog only on success
        resetInputFields(); // Optionally reset input fields
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error updating profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetInputFields = () => {
    setInput({
      profilePhoto: null,
      fullname: "",
      email: "",
      contact: "",
      location: "",
      github: "",
      bio: "",
      skills: "",
      file: null,
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-center mb-1">
            <span className="text-blue-700 text-3xl">Update</span> Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            {/* Profile Photo */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                id="profilePhoto"
                type="file"
                name="profilePhoto" // Updated to match state
                onChange={handleFileChange}
                className="col-span-3"
                accept="image/*"
              />
            </div> */}

            {/* Full Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                name="contact"
                value={input.contact}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* GitHub */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={input.github}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

       
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {user.role === "Student"? <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file" // Updated id for clarity
                type="file"
                name="file" // Updated to match state
                onChange={handleFileChange}
                className="col-span-3"
                accept="application/pdf"
         
              />
            </div>:<div></div>}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file" // Updated id for clarity
                type="file"
                name="file" // Updated to match state
                onChange={handleFileChange}
                className="col-span-3"
                accept="application/pdf"
         
              />
            </div> */}

          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <div className="my-1 w-full">
                <Button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  Save
                </Button>
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
