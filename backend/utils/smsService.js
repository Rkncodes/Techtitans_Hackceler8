const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send SMS
const sendSMS = async (to, message) => {
  try {
    // Ensure phone number is in correct format
    const phoneNumber = to.startsWith('+') ? to : `+91${to}`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('SMS sent:', result.sid);
    
    return {
      success: true,
      sid: result.sid,
      status: result.status
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send bulk SMS
const sendBulkSMS = async (phoneNumbers, message) => {
  try {
    const results = await Promise.all(
      phoneNumbers.map(phone => sendSMS(phone, message))
    );

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return {
      success: true,
      total: phoneNumbers.length,
      successful,
      failed,
      results
    };
  } catch (error) {
    console.error('Bulk SMS error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// SMS templates
const smsTemplates = {
  surplusAlert: (mealType, quantity, hostel, expiryTime) => 
    `🍽️ SURPLUS ALERT: ${quantity}kg of ${mealType} available at ${hostel}. Expires: ${expiryTime}. Claim now: ${process.env.CLIENT_URL}/surplus`,
  
  bookingReminder: (name, mealType, time) =>
    `🔔 Hi ${name}, reminder: You have ${mealType} booked at ${time}. Don't forget to attend!`,
  
  creditUpdate: (credits, reason) =>
    `🌱 You earned ${credits} Green Credits for ${reason}! Total credits: Check your dashboard.`,
  
  weeklyUpdate: (attendance, credits, rank) =>
    `📊 Weekly Update: ${attendance}% attendance, ${credits} credits earned, Rank #${rank}. Keep it up! 🌟`
};

// Send surplus alert
const sendSurplusAlertSMS = async (phoneNumbers, surplusDetails) => {
  const message = smsTemplates.surplusAlert(
    surplusDetails.mealType,
    surplusDetails.quantity,
    surplusDetails.hostel,
    new Date(surplusDetails.expiryTime).toLocaleString()
  );
  
  return await sendBulkSMS(phoneNumbers, message);
};

// Send booking reminder
const sendBookingReminderSMS = async (phone, name, mealType, time) => {
  const message = smsTemplates.bookingReminder(name, mealType, time);
  return await sendSMS(phone, message);
};

module.exports = {
  sendSMS,
  sendBulkSMS,
  sendSurplusAlertSMS,
  sendBookingReminderSMS,
  smsTemplates
};
