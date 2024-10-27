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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { FcOk, FcCancel } from "react-icons/fc";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/endpoint";

const shortlisting = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [statuses, setStatuses] = useState({});
  const [updatedApplicants, setUpdatedApplicants] = useState(new Set()); // Track updated applicants

  const autoUpdateStatus = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        setStatuses((prevStatuses) => ({
          ...prevStatuses,
          [id]: status,
        }));
        setUpdatedApplicants((prevSet) => new Set(prevSet.add(id))); // Mark as updated
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while updating the status.");
    }
  };

  useEffect(() => {
    if (applicants?.applications?.length > 0) {
      applicants.applications.forEach((application) => {
        const { score, _id, status } = application;
        if (status === "pending" && score < 3 && !updatedApplicants.has(_id)) {
          autoUpdateStatus("Rejected", _id);
        }
      });
    }
  }, [applicants, updatedApplicants]); // Add updatedApplicants as a dependency

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setStatuses((prevStatuses) => ({
          ...prevStatuses,
          [id]: status,
        }));
        setUpdatedApplicants((prevSet) => new Set(prevSet.add(id))); // Mark as updated manually if using the handler
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while updating the status.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((application) => {
              const applicant = application.applicant;
              const currentStatus =
                statuses[application._id] || application.status;

              return (
                <TableRow key={applicant._id}>
                  <TableCell>{applicant.fullname}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.phoneNumber}</TableCell>
                  <TableCell>
                    {applicant.profile.resume ? (
                      <a
                        href={`${APPLICATION_API_END_POINT}/files/${applicant.profile.resume[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span>N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">{application.score}</TableCell>
                  <TableCell className="text-center">
                    {/* Show horizontal dots only if score > 4 and status is pending */}
                    {currentStatus === "pending" && application.score > 4 ? (
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal
                            className="cursor-pointer text-gray-600 hover:text-gray-800"
                            size={24}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          {shortlisting.map((status) => (
                            <div
                              key={status}
                              onClick={() =>
                                statusHandler(status, application._id)
                              }
                              className="flex w-full items-center my-2 cursor-pointer"
                            >
                              {status === "Accepted" ? <FcOk /> : <FcCancel />}
                              <span className="ml-2">{status}</span>
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span
                        className={`font-semibold ${
                          currentStatus === "accepted"
                            ? "text-green-400"
                            : currentStatus === "rejected"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center">
                No applicants available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
