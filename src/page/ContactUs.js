import React, { useState } from 'react';
import { useLang } from '../App';

function ContactUs() {
  const { lang } = useLang();
  // Add Google Fonts import for Kanit and Prompt
  if (typeof document !== 'undefined' && !document.getElementById('kanit-prompt-font')) {
    const link = document.createElement('link');
    link.id = 'kanit-prompt-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&family=Prompt:wght@400;700&display=swap';
    document.head.appendChild(link);
  }
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  if (lang === 'en') {
    return (
      <div className="contact-page">
        <style>{`
          .contact-page {
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            background: #f2f8fc;
            color: #003049;
          }
          .fade-in { animation: fadeIn 1.1s ease; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
          .contact-header {
            text-align: center;
            background: linear-gradient(to bottom, #5996c8, #dceffc);
            padding: 56px 20px 36px;
            border-radius: 0 0 32px 32px;
            box-shadow: 0 4px 24px 0 rgba(30,136,229,0.08);
            position: relative;
          }
          .contact-header .brand-logo {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 18px auto;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
          }
          .contact-header h1 {
            font-size: 34px;
            margin-bottom: 10px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .contact-header p {
            font-size: 16px;
            max-width: 600px;
            margin: 0 auto;
            color: #155e75;
          }
          .icon-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 36px;
            gap: 36px;
          }
          .icon-item {
            text-align: center;
            width: 140px;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.08);
            padding: 18px 8px 14px 8px;
            transition: box-shadow 0.2s;
            font-size: 14px;
          }
          .icon-item:hover {
            box-shadow: 0 6px 18px rgba(30,136,229,0.16);
          }
          .icon-item img {
            width: 44px;
            height: 44px;
            margin-bottom: 10px;
          }
          .icon-item .email-break {
            word-break: break-all;
            font-size: 13px;
          }
          .contact-main-section {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
            gap: 40px;
            padding: 56px 20px 36px 20px;
            max-width: 1100px;
            margin: 0 auto;
          }
          .contact-form {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 2px 12px rgba(30,136,229,0.10);
            padding: 36px 32px;
            max-width: 420px;
            flex: 1 1 340px;
            position: relative;
            font-size: 15px;
          }
          .contact-form h2 {
            color: #003049;
            font-size: 22px;
            margin-bottom: 24px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .floating-label-group {
            position: relative;
            margin-bottom: 24px;
          }
          .floating-label-group input,
          .floating-label-group textarea {
            width: 100%;
            padding: 16px 12px 16px 12px;
            border-radius: 8px;
            border: 1.5px solid #b6e0f2;
            font-size: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            background: #f8fafc;
            outline: none;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .floating-label-group input:focus,
          .floating-label-group textarea:focus {
            border: 1.5px solid #1976d2;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
          }
          .floating-label {
            position: absolute;
            left: 14px;
            top: 16px;
            color: #888;
            font-size: 14px;
            pointer-events: none;
            background: transparent;
            transition: 0.2s cubic-bezier(.4,0,.2,1);
          }
          .floating-label-group input:not(:placeholder-shown) + .floating-label,
          .floating-label-group textarea:not(:placeholder-shown) + .floating-label,
          .floating-label-group input:focus + .floating-label,
          .floating-label-group textarea:focus + .floating-label {
            top: -10px;
            left: 10px;
            font-size: 12px;
            color: #1976d2;
            background: #fff;
            padding: 0 4px;
          }
          .contact-form button {
            background-color: #1976d2;
            color: white;
            padding: 14px 36px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
            cursor: pointer;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
            transition: background 0.2s, transform 0.1s;
          }
          .contact-form button:hover {
            background: #155e75;
            transform: translateY(-2px) scale(1.03);
          }
          .success-message {
            position: absolute;
            top: -38px;
            left: 0;
            right: 0;
            background: #d1fae5;
            color: #065f46;
            border-radius: 8px;
            padding: 12px 0;
            font-size: 15px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(16,185,129,0.10);
            animation: fadeIn 0.7s;
          }
          .contact-image {
            max-width: 340px;
            flex: 1 1 220px;
            text-align: center;
            background: #e3f2fd;
            border-radius: 18px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.08);
            padding: 32px 12px 18px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .contact-image img {
            width: 100%;
            max-width: 220px;
          }
          .cta-section {
            background: linear-gradient(90deg, #dff1fc 60%, #b6e0f2 100%);
            text-align: center;
            padding: 56px 20px;
            border-radius: 18px;
            margin: 48px auto 0 auto;
            max-width: 900px;
            box-shadow: 0 4px 18px rgba(30,136,229,0.10);
            animation: fadeIn 1.2s;
            font-size: 15px;
          }
          .cta-section h3 {
            font-size: 22px;
            margin-bottom: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .cta-section p {
            font-size: 14px;
            margin-bottom: 28px;
            color: #1976d2;
          }
          .cta-section button {
            background-color: #1976d2;
            color: white;
            padding: 14px 36px;
            border-radius: 8px;
            border: none;
            font-size: 15px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
            transition: background 0.2s, transform 0.1s;
          }
          .cta-section button:hover {
            background: #155e75;
            transform: translateY(-2px) scale(1.03);
          }
          @media (max-width: 1200px) {
            .contact-main-section {
              gap: 24px;
              padding: 36px 8px 24px 8px;
            }
          }
          @media (max-width: 900px) {
            .contact-main-section {
              flex-direction: column;
              gap: 24px;
              padding: 36px 8px 24px 8px;
            }
            .contact-form, .contact-image {
              max-width: 100%;
              border-radius: 14px;
              padding: 24px 12px;
            }
          }
          @media (max-width: 600px) {
            .contact-header h1 {
              font-size: 20px;
            }
            .contact-header p {
              font-size: 12px;
            }
            .icon-row {
              gap: 16px;
            }
            .icon-item {
              width: 100px;
              font-size: 11px;
              padding: 10px 4px 8px 4px;
            }
            .icon-item img {
              width: 28px;
              height: 28px;
            }
            .contact-main-section {
              padding: 12px 2vw 12px 2vw;
              gap: 10px;
            }
            .contact-form {
              padding: 12px 4px;
              font-size: 12px;
            }
            .contact-form h2 {
              font-size: 14px;
            }
            .floating-label-group input,
            .floating-label-group textarea {
              font-size: 12px;
              padding: 8px 6px 8px 6px;
            }
            .floating-label {
              font-size: 10px;
              left: 8px;
              top: 8px;
            }
            .floating-label-group input:not(:placeholder-shown) + .floating-label,
            .floating-label-group textarea:not(:placeholder-shown) + .floating-label,
            .floating-label-group input:focus + .floating-label,
            .floating-label-group textarea:focus + .floating-label {
              top: -8px;
              left: 6px;
              font-size: 9px;
              padding: 0 2px;
            }
            .contact-form button {
              font-size: 12px;
              padding: 8px 16px;
            }
            .success-message {
              font-size: 11px;
              padding: 8px 0;
            }
            .contact-image {
              padding: 8px 2px 8px 2px;
            }
            .contact-image img {
              max-width: 120px;
            }
            .cta-section {
              padding: 18px 4px;
              font-size: 12px;
            }
            .cta-section h3 {
              font-size: 14px;
            }
            .cta-section p {
              font-size: 10px;
              margin-bottom: 12px;
            }
            .cta-section button {
              font-size: 12px;
              padding: 8px 16px;
            }
          }
        `}</style>

        <div className="contact-header fade-in">
          <h1>Contact Us</h1>
          <p>
            If you have any questions or feedback, please don't hesitate to get in touch with us.
          </p>
          <div className="icon-row">
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location" />
              <p><strong>Location</strong><br />Bangkok, Thailand</p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email" />
              <p><strong>Email Address</strong><br /><span className="email-break">rehabitcontact@gmail.com</span></p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Phone" />
              <p><strong>Phone Number</strong><br />010-9999997</p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/2089/2089795.png" alt="Work Day" />
              <p><strong>Work Hours</strong><br />Sun-Fri: 09:00 - 17:00<br />Sat-Mon: 09:00 - 15:00</p>
            </div>
          </div>
        </div>

        <div className="contact-main-section fade-in">
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <h2>Get in Touch with Us</h2>
            {submitted && <div className="success-message">Thank you! Your message has been sent.</div>}
            <div className="floating-label-group">
              <input name="name" value={form.name} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">Name</label>
            </div>
            <div className="floating-label-group">
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder=" " />
              <label className="floating-label">Email</label>
            </div>
            <div className="floating-label-group">
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">Phone Number</label>
            </div>
            <div className="floating-label-group">
              <input name="subject" value={form.subject} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">Subject</label>
            </div>
            <div className="floating-label-group">
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder=" "></textarea>
              <label className="floating-label">Message</label>
            </div>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-image fade-in">
            <img src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" alt="Profile" />
          </div>
        </div>

        <div className="cta-section fade-in">
          <h3>Get Your Free Rehab Checkup<br />Let's Connect with Us</h3>
          <p>If you're interested in a free rehabilitation checkup, we'd love to hear from you.</p>
          <button>Contact Us</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="contact-page">
        <style>{`
          .contact-page {
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            background: #f2f8fc;
            color: #003049;
          }
          .fade-in { animation: fadeIn 1.1s ease; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
          .contact-header {
            text-align: center;
            background: linear-gradient(to bottom, #5996c8, #dceffc);
            padding: 56px 20px 36px;
            border-radius: 0 0 32px 32px;
            box-shadow: 0 4px 24px 0 rgba(30,136,229,0.08);
            position: relative;
          }
          .contact-header .brand-logo {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 18px auto;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
          }
          .contact-header h1 {
            font-size: 34px;
            margin-bottom: 10px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .contact-header p {
            font-size: 16px;
            max-width: 600px;
            margin: 0 auto;
            color: #155e75;
          }
          .icon-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 36px;
            gap: 36px;
          }
          .icon-item {
            text-align: center;
            width: 140px;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.08);
            padding: 18px 8px 14px 8px;
            transition: box-shadow 0.2s;
            font-size: 14px;
          }
          .icon-item:hover {
            box-shadow: 0 6px 18px rgba(30,136,229,0.16);
          }
          .icon-item img {
            width: 44px;
            height: 44px;
            margin-bottom: 10px;
          }
          .icon-item .email-break {
            word-break: break-all;
            font-size: 13px;
          }
          .contact-main-section {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
            gap: 40px;
            padding: 56px 20px 36px 20px;
            max-width: 1100px;
            margin: 0 auto;
          }
          .contact-form {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 2px 12px rgba(30,136,229,0.10);
            padding: 36px 32px;
            max-width: 420px;
            flex: 1 1 340px;
            position: relative;
            font-size: 15px;
          }
          .contact-form h2 {
            color: #003049;
            font-size: 22px;
            margin-bottom: 24px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .floating-label-group {
            position: relative;
            margin-bottom: 24px;
          }
          .floating-label-group input,
          .floating-label-group textarea {
            width: 100%;
            padding: 16px 12px 16px 12px;
            border-radius: 8px;
            border: 1.5px solid #b6e0f2;
            font-size: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            background: #f8fafc;
            outline: none;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .floating-label-group input:focus,
          .floating-label-group textarea:focus {
            border: 1.5px solid #1976d2;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
          }
          .floating-label {
            position: absolute;
            left: 14px;
            top: 16px;
            color: #888;
            font-size: 14px;
            pointer-events: none;
            background: transparent;
            transition: 0.2s cubic-bezier(.4,0,.2,1);
          }
          .floating-label-group input:not(:placeholder-shown) + .floating-label,
          .floating-label-group textarea:not(:placeholder-shown) + .floating-label,
          .floating-label-group input:focus + .floating-label,
          .floating-label-group textarea:focus + .floating-label {
            top: -10px;
            left: 10px;
            font-size: 12px;
            color: #1976d2;
            background: #fff;
            padding: 0 4px;
          }
          .contact-form button {
            background-color: #1976d2;
            color: white;
            padding: 14px 36px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
            cursor: pointer;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
            transition: background 0.2s, transform 0.1s;
          }
          .contact-form button:hover {
            background: #155e75;
            transform: translateY(-2px) scale(1.03);
          }
          .success-message {
            position: absolute;
            top: -38px;
            left: 0;
            right: 0;
            background: #d1fae5;
            color: #065f46;
            border-radius: 8px;
            padding: 12px 0;
            font-size: 15px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(16,185,129,0.10);
            animation: fadeIn 0.7s;
          }
          .contact-image {
            max-width: 340px;
            flex: 1 1 220px;
            text-align: center;
            background: #e3f2fd;
            border-radius: 18px;
            box-shadow: 0 2px 8px rgba(30,136,229,0.08);
            padding: 32px 12px 18px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .contact-image img {
            width: 100%;
            max-width: 220px;
          }
          .cta-section {
            background: linear-gradient(90deg, #dff1fc 60%, #b6e0f2 100%);
            text-align: center;
            padding: 56px 20px;
            border-radius: 18px;
            margin: 48px auto 0 auto;
            max-width: 900px;
            box-shadow: 0 4px 18px rgba(30,136,229,0.10);
            animation: fadeIn 1.2s;
            font-size: 15px;
          }
          .cta-section h3 {
            font-size: 22px;
            margin-bottom: 16px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
          }
          .cta-section p {
            font-size: 14px;
            margin-bottom: 28px;
            color: #1976d2;
          }
          .cta-section button {
            background-color: #1976d2;
            color: white;
            padding: 14px 36px;
            border-radius: 8px;
            border: none;
            font-size: 15px;
            font-family: 'Kanit', 'Prompt', Arial, sans-serif;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(30,136,229,0.10);
            transition: background 0.2s, transform 0.1s;
          }
          .cta-section button:hover {
            background: #155e75;
            transform: translateY(-2px) scale(1.03);
          }
          @media (max-width: 1200px) {
            .contact-main-section {
              gap: 24px;
              padding: 36px 8px 24px 8px;
            }
          }
          @media (max-width: 900px) {
            .contact-main-section {
              flex-direction: column;
              gap: 24px;
              padding: 36px 8px 24px 8px;
            }
            .contact-form, .contact-image {
              max-width: 100%;
              border-radius: 14px;
              padding: 24px 12px;
            }
          }
          @media (max-width: 600px) {
            .contact-header h1 {
              font-size: 20px;
            }
            .contact-header p {
              font-size: 12px;
            }
            .icon-row {
              gap: 16px;
            }
            .icon-item {
              width: 100px;
              font-size: 11px;
              padding: 10px 4px 8px 4px;
            }
            .icon-item img {
              width: 28px;
              height: 28px;
            }
            .contact-main-section {
              padding: 12px 2vw 12px 2vw;
              gap: 10px;
            }
            .contact-form {
              padding: 12px 4px;
              font-size: 12px;
            }
            .contact-form h2 {
              font-size: 14px;
            }
            .floating-label-group input,
            .floating-label-group textarea {
              font-size: 12px;
              padding: 8px 6px 8px 6px;
            }
            .floating-label {
              font-size: 10px;
              left: 8px;
              top: 8px;
            }
            .floating-label-group input:not(:placeholder-shown) + .floating-label,
            .floating-label-group textarea:not(:placeholder-shown) + .floating-label,
            .floating-label-group input:focus + .floating-label,
            .floating-label-group textarea:focus + .floating-label {
              top: -8px;
              left: 6px;
              font-size: 9px;
              padding: 0 2px;
            }
            .contact-form button {
              font-size: 12px;
              padding: 8px 16px;
            }
            .success-message {
              font-size: 11px;
              padding: 8px 0;
            }
            .contact-image {
              padding: 8px 2px 8px 2px;
            }
            .contact-image img {
              max-width: 120px;
            }
            .cta-section {
              padding: 18px 4px;
              font-size: 12px;
            }
            .cta-section h3 {
              font-size: 14px;
            }
            .cta-section p {
              font-size: 10px;
              margin-bottom: 12px;
            }
            .cta-section button {
              font-size: 12px;
              padding: 8px 16px;
            }
          }
        `}</style>

        <div className="contact-header fade-in">
          <h1>ติดต่อเรา</h1>
          <p>หากคุณมีคำถามหรือข้อเสนอแนะ กรุณาติดต่อเราได้เลย</p>
          <div className="icon-row">
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location" />
              <p><strong>ที่ตั้ง</strong><br />กรุงเทพฯ ประเทศไทย</p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email" />
              <p><strong>อีเมล</strong><br /><span className="email-break">rehabitcontact@gmail.com</span></p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Phone" />
              <p><strong>เบอร์โทรศัพท์</strong><br />010-9999997</p>
            </div>
            <div className="icon-item">
              <img src="https://cdn-icons-png.flaticon.com/512/2089/2089795.png" alt="Work Day" />
              <p><strong>เวลาทำการ</strong><br />อา-ศ: 09:00 - 17:00<br />ส-จ: 09:00 - 15:00</p>
            </div>
          </div>
        </div>

        <div className="contact-main-section fade-in">
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <h2>ติดต่อทีมงาน</h2>
            {submitted && <div className="success-message">ขอบคุณ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว</div>}
            <div className="floating-label-group">
              <input name="name" value={form.name} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">ชื่อ</label>
            </div>
            <div className="floating-label-group">
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder=" " />
              <label className="floating-label">อีเมล</label>
            </div>
            <div className="floating-label-group">
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">เบอร์โทรศัพท์</label>
            </div>
            <div className="floating-label-group">
              <input name="subject" value={form.subject} onChange={handleChange} required placeholder=" " />
              <label className="floating-label">หัวข้อ</label>
            </div>
            <div className="floating-label-group">
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder=" "></textarea>
              <label className="floating-label">ข้อความ</label>
            </div>
            <button type="submit">ส่งข้อความ</button>
          </form>
          <div className="contact-image fade-in">
            <img src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" alt="Profile" />
          </div>
        </div>

        <div className="cta-section fade-in">
          <h3>รับสิทธิ์ตรวจสุขภาพฟื้นฟูฟรี<br />เชื่อมต่อกับเรา</h3>
          <p>หากคุณสนใจรับสิทธิ์ตรวจสุขภาพฟื้นฟูฟรี เรายินดีให้คำปรึกษา</p>
          <button>ติดต่อเรา</button>
        </div>
      </div>
    );
  }
}

export default ContactUs;
