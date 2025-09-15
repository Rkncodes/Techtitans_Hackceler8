const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email
const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Smart Food Management" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(',') : to,
      subject,
      html,
      attachments
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Email templates
const emailTemplates = {
  welcome: (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a085;">Welcome to Smart Food Management!</h2>
      <p>Hi ${name},</p>
      <p>Welcome to our Smart Food Waste Management System. You're now part of a community working to reduce food waste and create a sustainable future.</p>
      <p>Get started by:</p>
      <ul>
        <li>Booking your first meal</li>
        <li>Exploring the surplus food available</li>
        <li>Checking out the leaderboard</li>
      </ul>
      <p>Together, we can make a difference!</p>
      <p>Best regards,<br>Smart Food Management Team</p>
    </div>
  `,

  surplusAlert: (ngoName, surplusDetails) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">New Surplus Food Available!</h2>
      <p>Hi ${ngoName},</p>
      <p>There's new surplus food available for collection:</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #16a085; margin: 15px 0;">
        <strong>Meal Type:</strong> ${surplusDetails.mealType}<br>
        <strong>Quantity:</strong> ${surplusDetails.quantity} ${surplusDetails.unit}<br>
        <strong>Hostel:</strong> ${surplusDetails.hostel}<br>
        <strong>Expires:</strong> ${new Date(surplusDetails.expiryTime).toLocaleString()}
      </div>
      <p>Please claim this surplus as soon as possible to help reduce food waste.</p>
      <a href="${process.env.CLIENT_URL}/surplus" style="background-color: #16a085; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Surplus</a>
      <p>Best regards,<br>Smart Food Management Team</p>
    </div>
  `,

  weeklyReport: (stats) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a085;">Weekly Impact Report</h2>
      <p>Here's your impact for this week:</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
        <div style="background-color: #e8f8f5; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0; color: #16a085;">${stats.mealsAttended}</h3>
          <p style="margin: 5px 0; color: #666;">Meals Attended</p>
        </div>
        <div style="background-color: #fef9e7; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0; color: #f39c12;">${stats.greenCredits}</h3>
          <p style="margin: 5px 0; color: #666;">Green Credits Earned</p>
        </div>
      </div>
      <p>Keep up the great work in reducing food waste!</p>
      <p>Best regards,<br>Smart Food Management Team</p>
    </div>
  `
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  return await sendEmail(
    email,
    'Welcome to Smart Food Management!',
    emailTemplates.welcome(name)
  );
};

// Send surplus alert to NGOs
const sendSurplusAlert = async (ngoEmails, ngoName, surplusDetails) => {
  return await sendEmail(
    ngoEmails,
    'New Surplus Food Available - Urgent',
    emailTemplates.surplusAlert(ngoName, surplusDetails)
  );
};

// Send weekly report
const sendWeeklyReport = async (email, stats) => {
  return await sendEmail(
    email,
    'Your Weekly Impact Report',
    emailTemplates.weeklyReport(stats)
  );
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendSurplusAlert,
  sendWeeklyReport,
  emailTemplates
};
