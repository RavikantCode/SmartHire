import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanyUpdate = ({ openss, setOpenss }) => {
  const params = useParams();
  useGetCompanyById(params.id); // Fetch company data by ID
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // Reset file upload input
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Dialog open={openss}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpenss(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-center mb-1">
              <span className="text-blue-700 text-3xl">Update</span> Company
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Profile Photo */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Profile Photo</Label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="col-span-3"
                  accept="image/*"
                />
              </div>

              {/* Company Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Website */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={input.website}
                  onChange={handleInputChange}
                  className="col-span-3"
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
            </div>

            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
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
    </div>
  );
};

export default CompanyUpdate;
