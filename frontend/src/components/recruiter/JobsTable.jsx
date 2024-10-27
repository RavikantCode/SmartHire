import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobsTable = () => {
  const { allRecruiterJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    if (allRecruiterJobs && Array.isArray(allRecruiterJobs)) {
      const filteredJobs = allRecruiterJobs.filter((job) => {
        if (!searchJobByText) {
          return true; 
        }
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
      setFilterJobs(filteredJobs);
    }
  }, [allRecruiterJobs, searchJobByText]); 

  return (
    <div className="mt-12">
      <Table>
        <TableCaption>A list of Your Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Name</TableHead>
            <TableHead>Total Applicants</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.__v}</TableCell>
                <TableCell>
                  {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell>
                <Badge
            className={`p-2 ${
              job.isAccepted === 'accepted'
                ? 'bg-green-500 text-white'
                : job.isAccepted === 'pending'
                ? 'bg-yellow-500 text-black'
                :'bg-red-500 text-white'
              
            }`}
          >
            {job.isAccepted}
          </Badge>
                </TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/ViewApplications/${job._id}/applicants`)}
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-5" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No jobs found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
