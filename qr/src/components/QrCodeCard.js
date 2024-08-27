import React, { useState } from 'react';
import QRCode from 'qrcode';
import './QrCodeCard.css'; // Assuming your CSS is in this file

function QrCodeCard() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleGenerate = async () => {
    if (!url) {
      setAlertMessage('Enter The Url');
      setTimeout(() => setAlertMessage(''), 5000);
      return;
    }
    try {
      const generatedQrCode = await QRCode.toDataURL(url);
      setQrCode(generatedQrCode);
    } catch (error) {
      console.error('QR Code generation failed:', error);
    }
  };

  const handleClear = () => {
    setUrl('');
    setQrCode('');
  };

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="qr-code-generator">
      <h1>QR Code Generator</h1>
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <div className="button-group">
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      {qrCode && (
        <div className="qr-code-container">
          <img src={qrCode} alt="qr-code" />
          <a download="qrCode.png" href={qrCode} className="download-button">
            Download
          </a>
          <footer className="footer">
            Created by @ 
            <a href="https://github.com/Nobitaspeaks2711" target="_blank" rel="noopener noreferrer">
              vaibhav
            </a>
          </footer>
        </div>
      )}
    </div>
  );
}

export default QrCodeCard;
