const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

// Get Firestore instance
const db = admin.firestore();

// Send push notification
const sendPushNotification = async (tokens, payload) => {
  try {
    if (!Array.isArray(tokens)) {
      tokens = [tokens];
    }

    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: payload.icon || '/images/logo.png'
      },
      data: payload.data || {},
      tokens: tokens.filter(token => token && token.length > 0)
    };

    if (message.tokens.length === 0) {
      console.log('No valid tokens provided');
      return { success: false, message: 'No valid tokens' };
    }

    const response = await admin.messaging().sendMulticast(message);
    
    console.log('Push notification sent:', {
      successCount: response.successCount,
      failureCount: response.failureCount
    });

    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses
    };

  } catch (error) {
    console.error('Push notification error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send notification to topic
const sendTopicNotification = async (topic, payload) => {
  try {
    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: payload.icon || '/images/logo.png'
      },
      data: payload.data || {},
      topic: topic
    };

    const response = await admin.messaging().send(message);
    console.log('Topic notification sent:', response);
    
    return { success: true, messageId: response };
  } catch (error) {
    console.error('Topic notification error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  admin,
  db,
  sendPushNotification,
  sendTopicNotification
};
