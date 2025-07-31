import React, { useState, useEffect } from 'react';
import { useLang, useAuth } from '../App';
import { api } from '../utils/api';
import { ArrowLeft, User, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { lang } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear messages when user starts typing
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate passwords match
      if (form.password && form.password !== form.confirmPassword) {
        setError(lang === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match');
        setLoading(false);
        return;
      }

      // Here you would typically send the data to your API
      console.log('Profile update data:', form);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(lang === 'th' ? 'บันทึกโปรไฟล์สำเร็จ!' : 'Profile saved successfully!');
      
      // Clear password fields
      setForm(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      
    } catch (err) {
      setError(lang === 'th' ? 'เกิดข้อผิดพลาดในการบันทึก' : 'Error saving profile');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const provinces = [
    { value: 'Bangkok', label: lang === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok' },
    { value: 'Chiang Mai', label: lang === 'th' ? 'เชียงใหม่' : 'Chiang Mai' },
    { value: 'Phuket', label: lang === 'th' ? 'ภูเก็ต' : 'Phuket' },
    { value: 'Pattaya', label: lang === 'th' ? 'พัทยา' : 'Pattaya' },
  ];

  const districts = [
    { value: 'Silom', label: lang === 'th' ? 'สีลม' : 'Silom' },
    { value: 'Sukhumvit', label: lang === 'th' ? 'สุขุมวิท' : 'Sukhumvit' },
    { value: 'Sathorn', label: lang === 'th' ? 'สาทร' : 'Sathorn' },
    { value: 'Pathumwan', label: lang === 'th' ? 'ปทุมวัน' : 'Pathumwan' },
  ];

  const exerciseFrequencies = [
    { value: 'Never', label: lang === 'th' ? 'ไม่เคยออกกำลังกาย' : 'Never' },
    { value: 'Rarely', label: lang === 'th' ? 'นานๆ ครั้ง' : 'Rarely' },
    { value: 'Sometimes', label: lang === 'th' ? 'บางครั้ง' : 'Sometimes' },
    { value: 'Often', label: lang === 'th' ? 'บ่อยครั้ง' : 'Often' },
    { value: 'Daily', label: lang === 'th' ? 'ทุกวัน' : 'Daily' },
  ];

  return (
    <div className="edit-profile-container">
      <style>{`
        .edit-profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          padding: 20px;
        }
        
                 .edit-profile-card {
           max-width: 900px;
           margin: 0 auto;
           background: white;
           border-radius: 12px;
           box-shadow: 0 20px 40px rgba(0,0,0,0.1);
           overflow: hidden;
         }
        
                 .edit-profile-header {
           background: linear-gradient(135deg, #4392B1 0%, #3a7a9a 100%);
           color: white;
           padding: 20px 24px;
           display: flex;
           align-items: center;
           gap: 12px;
         }
        
        .back-button {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .back-button:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .header-content {
          flex: 1;
        }
        
                 .header-title {
           font-size: 20px;
           font-weight: 600;
           margin: 0;
         }
         
         .header-subtitle {
           font-size: 13px;
           opacity: 0.9;
           margin: 2px 0 0 0;
         }
        
                 .profile-avatar {
           width: 48px;
           height: 48px;
           border-radius: 50%;
           background: rgba(255,255,255,0.2);
           display: flex;
           align-items: center;
           justify-content: center;
           border: 2px solid rgba(255,255,255,0.3);
         }
        
                 .edit-profile-content {
           padding: 24px;
         }
         
         .form-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
           gap: 16px;
         }
         
         .form-section {
           background: #f8fafc;
           padding: 16px;
           border-radius: 8px;
           border: 1px solid #e2e8f0;
         }
        
                 .section-title {
           font-size: 16px;
           font-weight: 600;
           color: #1e293b;
           margin-bottom: 12px;
           display: flex;
           align-items: center;
           gap: 8px;
         }
         
         .form-group {
           margin-bottom: 12px;
         }
        
        .form-label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
                 .form-input,
         .form-select {
           width: 100%;
           padding: 8px 12px;
           border: 2px solid #e5e7eb;
           border-radius: 6px;
           font-size: 14px;
           color: #1f2937;
           background: white;
           transition: all 0.2s;
           font-family: 'Kanit', 'Prompt', Arial, sans-serif;
         }
        
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #4392B1;
          box-shadow: 0 0 0 3px rgba(67, 146, 177, 0.1);
        }
        
        .form-input:read-only {
          background-color: #f9fafb;
          color: #6b7280;
        }
        
                 .form-row {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 12px;
         }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .message {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 500;
        }
        
        .error-message {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        
        .success-message {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        
                 .form-actions {
           display: flex;
           justify-content: flex-end;
           gap: 12px;
           margin-top: 20px;
           padding-top: 16px;
           border-top: 1px solid #e5e7eb;
         }
        
                 .btn {
           padding: 10px 20px;
           border: none;
           border-radius: 6px;
           font-weight: 500;
           cursor: pointer;
           font-size: 14px;
           transition: all 0.2s;
           font-family: 'Kanit', 'Prompt', Arial, sans-serif;
           display: flex;
           align-items: center;
           gap: 6px;
         }
        
        .btn-cancel {
          background: #f3f4f6;
          color: #374151;
        }
        
        .btn-cancel:hover {
          background: #e5e7eb;
        }
        
        .btn-save {
          background: #4392B1;
          color: white;
        }
        
        .btn-save:hover {
          background: #3a7a9a;
        }
        
        .btn-save:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .edit-profile-container {
            padding: 10px;
          }
          
          .edit-profile-header {
            padding: 20px;
          }
          
          .edit-profile-content {
            padding: 20px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="edit-profile-card">
        <div className="edit-profile-header">
          <button onClick={handleCancel} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-content">
            <h1 className="header-title">
              {lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}
            </h1>
            <p className="header-subtitle">
              {lang === 'th' ? 'อัปเดตข้อมูลส่วนตัวของคุณ' : 'Update your personal information'}
            </p>
          </div>
                     <div className="profile-avatar">
             <User size={24} />
           </div>
        </div>

        <div className="edit-profile-content">
          {error && (
            <div className="message error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="message success-message">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="section-title">
                  {lang === 'th' ? 'ข้อมูลส่วนตัว' : 'Personal Information'}
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'ชื่อ' : 'First Name'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'นามสกุล' : 'Last Name'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {lang === 'th' ? 'อีเมล' : 'Email'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    readOnly
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'เพศ' : 'Gender'}
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">{lang === 'th' ? 'เลือกเพศ' : 'Select Gender'}</option>
                      <option value="Male">{lang === 'th' ? 'ชาย' : 'Male'}</option>
                      <option value="Female">{lang === 'th' ? 'หญิง' : 'Female'}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'วันเกิด' : 'Birth Date'}
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={form.birthDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="form-section">
                <h3 className="section-title">
                  {lang === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Information'}
                </h3>
                
                <div className="form-group">
                  <label className="form-label">
                    {lang === 'th' ? 'ที่อยู่' : 'Address'}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {lang === 'th' ? 'เบอร์โทรศัพท์' : 'Contact Number'}
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'จังหวัด' : 'Province'}
                    </label>
                    <select
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">{lang === 'th' ? 'เลือกจังหวัด' : 'Select Province'}</option>
                      {provinces.map(province => (
                        <option key={province.value} value={province.value}>
                          {province.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'เขต/อำเภอ' : 'District'}
                    </label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">{lang === 'th' ? 'เลือกเขต' : 'Select District'}</option>
                      {districts.map(district => (
                        <option key={district.value} value={district.value}>
                          {district.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="form-section">
                <h3 className="section-title">
                  {lang === 'th' ? 'ข้อมูลสุขภาพ' : 'Health Information'}
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'ส่วนสูง (ซม.)' : 'Height (cm)'}
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      className="form-input"
                      min="100"
                      max="250"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'น้ำหนัก (กก.)' : 'Weight (kg)'}
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      className="form-input"
                      min="30"
                      max="200"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'มีโรคประจำตัว' : 'Medical Condition'}
                    </label>
                    <select
                      name="medicalCondition"
                      value={form.medicalCondition}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">{lang === 'th' ? 'เลือก' : 'Select'}</option>
                      <option value="Yes">{lang === 'th' ? 'มี' : 'Yes'}</option>
                      <option value="No">{lang === 'th' ? 'ไม่มี' : 'No'}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'ความถี่ในการออกกำลังกาย' : 'Exercise Frequency'}
                    </label>
                    <select
                      name="exerciseFrequency"
                      value={form.exerciseFrequency}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">{lang === 'th' ? 'เลือก' : 'Select'}</option>
                      {exerciseFrequencies.map(freq => (
                        <option key={freq.value} value={freq.value}>
                          {freq.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {form.medicalCondition === 'Yes' && (
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'ชื่อโรคประจำตัว' : 'Medical Condition Name'}
                    </label>
                    <input
                      type="text"
                      name="medicalConditionName"
                      value={form.medicalConditionName}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h3 className="section-title">
                  {lang === 'th' ? 'ข้อมูลเพิ่มเติม' : 'Additional Information'}
                </h3>
                
                <div className="form-group">
                  <label className="form-label">
                    {lang === 'th' ? 'อาชีพ' : 'Occupation'}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Change */}
              <div className="form-section full-width">
                <h3 className="section-title">
                  {lang === 'th' ? 'เปลี่ยนรหัสผ่าน' : 'Change Password'}
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'รหัสผ่านใหม่' : 'New Password'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={lang === 'th' ? 'ใส่รหัสผ่านใหม่ (ไม่บังคับ)' : 'Enter new password (optional)'}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'th' ? 'ยืนยันรหัสผ่านใหม่' : 'Confirm New Password'}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={lang === 'th' ? 'ยืนยันรหัสผ่านใหม่' : 'Confirm new password'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-cancel"
              >
                <X size={16} />
                {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
              </button>
              
              <button
                type="submit"
                className="btn btn-save"
                disabled={loading}
              >
                <Save size={16} />
                {loading 
                  ? (lang === 'th' ? 'กำลังบันทึก...' : 'Saving...')
                  : (lang === 'th' ? 'บันทึก' : 'Save')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
