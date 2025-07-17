import React, { useState } from 'react';

const EditProfile = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    province: '',
    district: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
    height: '',
    weight: '',
    medicalCondition: '',
    medicalConditionName: '',
    exerciseFrequency: '',
    occupation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert('Profile saved!');
  };

  return (
    <>
      <style>{`
        .edit-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 24px;
          background-color: #eff6ff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          font-family: 'Segoe UI', sans-serif;
        }
        .edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .edit-header h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
        }
        .edit-header img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #cbd5e1;
        }
        .edit-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .edit-form label {
          font-weight: 500;
          color: #334155;
          margin-bottom: 6px;
          display: block;
        }
        .edit-form input,
        .edit-form select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          color: #0f172a;
        }
        .edit-form input:read-only {
          background-color: #f1f5f9;
        }
        .edit-form .full-row {
          grid-column: 1 / -1;
        }
        .edit-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
          grid-column: 1 / -1;
        }
        .edit-buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          font-size: 14px;
        }
        .cancel-btn {
          background-color: #e2e8f0;
          color: #1e293b;
        }
        .save-btn {
          background-color: #2563eb;
          color: white;
        }
        .save-btn:hover {
          background-color: #1d4ed8;
        }
        .cancel-btn:hover {
          background-color: #cbd5e1;
        }
        @media (max-width: 1200px) {
          .edit-container {
            padding: 12px;
          }
        }
        @media (max-width: 900px) {
          .edit-header h2 {
            font-size: 18px;
          }
          .edit-header img {
            width: 48px;
            height: 48px;
          }
          .edit-form {
            gap: 10px;
          }
        }
        @media (max-width: 768px) {
          .edit-form {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .edit-container {
            margin: 10px auto;
            padding: 4px;
          }
          .edit-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .edit-header h2 {
            font-size: 14px;
          }
          .edit-header img {
            width: 32px;
            height: 32px;
          }
          .edit-form label {
            font-size: 12px;
          }
          .edit-form input,
          .edit-form select {
            font-size: 12px;
            padding: 6px 8px;
          }
          .edit-buttons button {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>

      <div className="edit-container">
        <div className="edit-header">
          <h2>Edit Profile</h2>
          <img src="https://via.placeholder.com/64" alt="Profile" />
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          {/* First Name */}
          <div>
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} />
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} readOnly />
          </div>

          {/* Address */}
          <div>
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>

          {/* Contact Number */}
          <div>
            <label>Contact Number</label>
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} />
          </div>

          {/* Province */}
          <div>
            <label>Province</label>
            <select name="province" value={form.province} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Bangkok">Bangkok</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label>District</label>
            <select name="district" value={form.district} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Silom">Silom</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </div>

          {/* Confirm Password */}
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Birth Date */}
          <div>
            <label>Birth Date</label>
            <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
          </div>

          {/* Height */}
          <div>
            <label>Height</label>
            <input type="number" name="height" value={form.height} onChange={handleChange} />
          </div>

          {/* Weight */}
          <div>
            <label>Weight</label>
            <input type="number" name="weight" value={form.weight} onChange={handleChange} />
          </div>

          {/* Medical Condition */}
          <div>
            <label>Medical Condition</label>
            <select
              name="medicalCondition"
              value={form.medicalCondition}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Medical Condition Name */}
          <div>
            <label>Medical Condition Name</label>
            <input
              name="medicalConditionName"
              value={form.medicalConditionName}
              onChange={handleChange}
            />
          </div>

          {/* Exercise Frequency */}
          <div>
            <label>Exercise Frequency</label>
            <input
              name="exerciseFrequency"
              value={form.exerciseFrequency}
              onChange={handleChange}
            />
          </div>

          {/* Occupation */}
          <div>
            <label>Occupation</label>
            <input name="occupation" value={form.occupation} onChange={handleChange} />
          </div>

          {/* Buttons */}
          <div className="edit-buttons">
            <button type="button" className="cancel-btn" onClick={() => alert('Cancelled')}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
