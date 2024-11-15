import React, { useState, useEffect } from 'react';
import StudentModal from './StudentModal';
import DeleteModal from './DeleteModal';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://67281ba1270bd0b9755468a5.mockapi.io/ossexample');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (studentData) => {
    try {
      const response = await fetch('https://67281ba1270bd0b9755468a5.mockapi.io/ossexample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        fetchStudents();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdate = async (studentData) => {
    try {
      const response = await fetch(`https://67281ba1270bd0b9755468a5.mockapi.io/ossexample/${studentData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        fetchStudents();
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://67281ba1270bd0b9755468a5.mockapi.io/ossexample/${selectedStudent.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchStudents();
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Student Data Management</h1>
      
      <button className="btn btn-primary mb-3 me-2" onClick={() => setShowCreateModal(true)}>
        Create Student
      </button>

      <div>
        {students.map((student) => (
          <div className="card mb-3" key={student.id}>
            <div className="card-body">
              <h5 className="card-title">{student.name}</h5>
              <p className="card-text">Age: {student.age}</p>
              <p className="card-text">Gender: {student.gender}</p>
              <p className="card-text">Height: {student.height}</p>
              <p className="card-text">Weight: {student.weight}</p>
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => {
                  setSelectedStudent(student);
                  setShowUpdateModal(true);
                }}
              >
                Update
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setSelectedStudent(student);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <StudentModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="Create Student"
      />

      <StudentModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        onSubmit={handleUpdate}
        title="Update Student"
        student={selectedStudent}
      />

      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        studentName={selectedStudent?.name}
      />
    </div>
  );
};

export default StudentList;