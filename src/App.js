import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrSize, setQrSize] = useState(128); // Default size
  const [qrColor, setQrColor] = useState('#000000'); // Default color

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSizeChange = (e) => {
    setQrSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setQrColor(e.target.value);
  };

  const generateQRCode = () => {
    setQrValue(inputValue);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <label>
        Text to encode:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text to encode (usually a URL)"
        />
      </label>
      <label>
        Size:
        <input
          type="number"
          value={qrSize}
          onChange={handleSizeChange}
          placeholder="Size of the QR Code"
          min="64"
          max="512"
        />
      </label>
      <label>
        Colour:
        <input
          type="color"
          value={qrColor}
          onChange={handleColorChange}
        />
      </label>
      <button onClick={generateQRCode}>Create QR Code</button>
      {qrValue && (
        <QRCodeCanvas
          value={qrValue}
          size={parseInt(qrSize, 10)}
          fgColor={qrColor}
        />
      )}
    </div>
  );
}

export default App;
