const QRCode = require('qrcode');
const fs = require('fs').promises;
const path = require('path');

// Generate QR code as data URL
const generateQRDataURL = async (data) => {
  try {
    const qrString = typeof data === 'object' ? JSON.stringify(data) : data;
    const qrCodeDataURL = await QRCode.toDataURL(qrString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 200
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Generate QR code as buffer
const generateQRBuffer = async (data) => {
  try {
    const qrString = typeof data === 'object' ? JSON.stringify(data) : data;
    const buffer = await QRCode.toBuffer(qrString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 200
    });
    
    return buffer;
  } catch (error) {
    console.error('QR Code buffer generation error:', error);
    throw new Error('Failed to generate QR code buffer');
  }
};

// Save QR code to file
const saveQRToFile = async (data, filename) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads/qr-codes');
    
    // Ensure directory exists
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const qrString = typeof data === 'object' ? JSON.stringify(data) : data;
    const filePath = path.join(uploadsDir, `${filename}.png`);
    
    await QRCode.toFile(filePath, qrString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 200
    });
    
    return filePath;
  } catch (error) {
    console.error('QR Code file save error:', error);
    throw new Error('Failed to save QR code to file');
  }
};

module.exports = {
  generateQRDataURL,
  generateQRBuffer,
  saveQRToFile
};
