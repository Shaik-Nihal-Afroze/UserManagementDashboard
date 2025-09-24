import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, onClose, initialData, lastId }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, id: String(initialData.id) });
    } else {
      setFormData({
        id: String(lastId + 1),
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [initialData, lastId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Number(formData.id) });
    onClose();
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form-container">
        <button className="user-form-close" onClick={onClose}>&times;</button>
        <h3>{initialData ? "Edit User" : "Add User"}</h3>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input type="text" name="id" value={formData.id} readOnly disabled />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <button type="submit">{initialData ? "Update User" : "Add User"}</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
