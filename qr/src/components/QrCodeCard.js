import React, { useState } from 'react';
import QRCode from 'qrcode';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <button onClick={handleGenerate}>Generate</button>
      <button onClick={handleClear}>Clear</button>
      {alertMessage && <div className="mt-2 mb-1">{alertMessage}</div>}
      {qrCode && (
        <div>
          <img src={qrCode} alt="qr-code" />
          <button>
            <a download="qrCode.png" href={qrCode} className="w-full">
              Download
            </a>
          </button>
        </div>
      )}
    </div>
  );
}

export default QrCodeCard;
