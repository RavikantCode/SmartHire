import React, { useEffect, useState } from "react";
import Navbar from "../reusable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/endpoint";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import store from "@/redux/store";

const CompanyPage = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: null 
    });
    console.log(input);
    

    const dispatch = useDispatch();

    const registerNewCompany = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        formData.append('logo', input.logo);
    
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
    
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.msg);
                const companyId = res?.data?.companyId;
                console.log("company ki id",companyId);
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                
                toast.error(error.response.data.msg);
            } else {
               

            }
        }
    };
    
    const changeEventHandler = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setInput({ ...input, logo: files[0] }); 
        } else {
            setInput({ ...input, [name]: value });
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="font-bold text-3xl text-center mb-4">Register Your Company</h1>
                <p className="text-gray-600 text-center mb-6">Please provide the details below.</p>

                <form onSubmit={registerNewCompany}>
                    <div className="mb-4">
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            placeholder="SmartHire Pvt Ltd, etc"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            placeholder="Company description"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Website</Label>
                        <Input
                            type="url"
                            name="website"
                            value={input.website}
                            placeholder="https://example.com"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            placeholder="Location"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Logo</Label>
                        <Input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={changeEventHandler}
                        
                        />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Button onClick={() => navigate("/recruiter")} variant="outline">Cancel</Button>
                        <Button type="submit" variant="solid">Continue</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyPage;
