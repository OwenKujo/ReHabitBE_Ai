import React from 'react';

function ContactUs() {
  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          font-family: 'Arial', sans-serif;
          background: #f2f8fc;
          color: #003049;
        }

        .contact-header {
          text-align: center;
          background: linear-gradient(to bottom, #5996c8, #dceffc);
          padding: 50px 20px 30px;
        }

        .contact-header h1 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .contact-header p {
          font-size: 14px;
          max-width: 600px;
          margin: 0 auto;
        }

        .icon-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 30px;
          gap: 30px;
        }

        .icon-item {
          text-align: center;
          width: 120px;
        }

        .icon-item img {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }

        .contact-form-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;
          background: #f0f8ff;
        }

        .contact-form {
          max-width: 500px;
          flex: 1;
        }

        .contact-form h2 {
          color: #003049;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .contact-form textarea {
          height: 100px;
          resize: vertical;
        }

        .contact-form button {
          background-color: #036;
          color: white;
          padding: 10px 30px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .contact-image {
          max-width: 300px;
          flex: 1;
          text-align: center;
        }

        .contact-image img {
          width: 100%;
          max-width: 300px;
        }

        .cta-section {
          background: #dff1fc;
          text-align: center;
          padding: 50px 20px;
          border-radius: 12px;
          margin: 40px auto;
          max-width: 900px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .cta-section h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .cta-section p {
          font-size: 14px;
          margin-bottom: 20px;
        }

        .cta-section button {
          background-color: #036;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          “If you have any questions, need assistance, or would like to schedule an appointment,
          please don’t hesitate to contact us — we’re here to help you with care and compassion.”
        </p>

        <div className="icon-row">
          <div className="icon-item">
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location" />
            <p><strong>Location</strong><br />Bangkok, Thailand</p>
          </div>
          <div className="icon-item">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email" />
            <p><strong>Email Address</strong><br />rehabitcontact@gmail.com</p>
          </div>
          <div className="icon-item">
            <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Phone" />
            <p><strong>Phone Number</strong><br />010-9999997</p>
          </div>
          <div className="icon-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2089/2089795.png" alt="Work Day" />
            <p><strong>Work Day</strong><br />Sun-Fri: 09:00 - 17:00<br />Sat-Mon: 09:00 - 15:00</p>
          </div>
        </div>
      </div>

      <div className="contact-form-section">
        <div className="contact-form">
          <h2>Get In touch With Us</h2>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message"></textarea>
          <button>Save</button>
        </div>
        <div className="contact-image">
          <img src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" alt="Profile" />
        </div>
      </div>

      <div className="cta-section">
        <h3>Get Your Free Rehab Checkup.<br />Let’s Connect With Us!</h3>
        <p>
          “If you have any questions, need assistance, or would like to
          schedule an appointment, please don’t hesitate to contact us”
        </p>
        <button>Contact us</button>
      </div>
    </div>
  );
}

export default ContactUs;
