import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from '../ui/table'; // Assuming you have a Table component for styling

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students'); // Replace with your API endpoint
        if (response.data.success) {
          setStudents(response.data.students); // Adjust based on your API response structure
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleRowClick = (studentId) => {
    navigate(`/student/${studentId}`); // Redirect to student details page
  };

  return (
    <div className="max-w-6xl mx-auto my-5 p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      {students.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact Number</th>
              <th className="p-2">Location</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} onClick={() => handleRowClick(student._id)} className="cursor-pointer hover:bg-gray-100">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.contactNumber}</td>
                <td className="p-2">{student.location}</td>
                <td className="p-2">
                  <button className="text-blue-500" onClick={() => handleRowClick(student._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default StudentTable;
