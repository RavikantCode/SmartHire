import React from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-700" colSpan={4}>You haven't applied for any jobs.</TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedjob) => (
              <TableRow key={appliedjob._id}>
                <TableCell>{new Date(appliedjob.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {appliedjob.job ? appliedjob.job.title : 'No job title available'}
                </TableCell>
                <TableCell>
                  {appliedjob.job && appliedjob.job.companyId 
                    ? appliedjob.job.companyId.name 
                    : 'No company available'}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={`p-2 ${appliedjob.status === 'rejected' ? 'bg-red-600' : appliedjob.status === 'accepted' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                    {appliedjob.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
