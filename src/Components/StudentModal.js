import React, { useState, useEffect } from 'react';

const StudentModal = ({ show, onHide, onSubmit, title, student }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">Weight</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
      {/* <div className="modal-backdrop show"></div> */}
    </div>
  );
};

export default StudentModal;