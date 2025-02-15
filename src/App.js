import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { SketchPicker } from 'react-color';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrColor, setQrColor] = useState('#8a1a1e'); // Default color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
  const [showColorPicker, setShowColorPicker] = useState(false); // State for color picker visibility
  const [showBgColorPicker, setShowBgColorPicker] = useState(false); // State for background color picker visibility
  const qrRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleColorChange = (color, event) => {
    if (event.target.className.includes('saturation')) {
      setQrColor(color.hex);
      setShowColorPicker(false);
    } else {
      setQrColor(color.hex);
    }
  };

  const handleBgColorChange = (color, event) => {
    if (event.target.className.includes('saturation')) {
      setBgColor(color.hex);
      setShowBgColorPicker(false);
    } else {
      setBgColor(color.hex);
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const toggleBgColorPicker = () => {
    setShowBgColorPicker(!showBgColorPicker);
  };

  const generateQRCode = () => {
    if (inputValue.trim() !== '') {
      setQrValue(inputValue);
    } else {
      alert('Please enter text to encode.');
    }
  };

  const downloadQRCode = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const qrCanvas = qrRef.current.querySelector('canvas');
    const textAbove = truncateText(qrValue, 20);
    const textBelow = "Created by qrcode.buckmaster.ca";

    // Set canvas size
    canvas.width = qrCanvas.width;
    canvas.height = qrCanvas.height + 60; // Extra space for text

    // Draw the QR code onto the new canvas
    context.drawImage(qrCanvas, 0, 30);

    // Draw the text above the QR code
    context.font = '18px Arial';
    context.fillStyle = qrColor;
    context.textAlign = 'center';
    context.fillText(textAbove, canvas.width / 2, 20);

    // Draw the text below the QR code with a smaller font size
    context.font = '16px Arial'; // Reduced font size
    context.fillText(textBelow, canvas.width / 2, canvas.height - 10);

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    
    let filename = inputValue.replace(/^https?:\/\//, '');
    filename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20);
    
    if (!filename) {
      filename = 'qrcode';
    }
    
    a.href = url;
    a.download = `${filename}.png`;
    a.click();
  };

  const getComplementaryColor = (color) => {
    const r = 255 - parseInt(color.slice(1, 3), 16);
    const g = 255 - parseInt(color.slice(3, 5), 16);
    const b = 255 - parseInt(color.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <p className="expl-message">If you think you know what this does, you got it!</p>
      <label>
        Text to encode:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text to encode (usually a URL)"
        />
      </label>
      <div className="color-picker-container">
        <button onClick={toggleColorPicker}>
          {showColorPicker ? 'Close Color Picker' : 'Choose Color'}
        </button>
        <div
          className="color-display"
          style={{ backgroundColor: qrColor }}
        />
        {showColorPicker && (
          <div className="sketch-picker">
            <SketchPicker
              color={qrColor}
              onChange={(color, event) => handleColorChange(color, event)}
            />
            <button onClick={() => setShowColorPicker(false)}>Close</button>
          </div>
        )}
      </div>
      <div className="color-picker-container">
        <button onClick={toggleBgColorPicker}>
          {showBgColorPicker ? 'Close Background Picker' : 'Choose Background'}
        </button>
        <div
          className="color-display"
          style={{ backgroundColor: bgColor }}
        />
        {showBgColorPicker && (
          <div className="sketch-picker">
            <SketchPicker
              color={bgColor}
              onChange={(color, event) => handleBgColorChange(color, event)}
            />
            <button onClick={() => setShowBgColorPicker(false)}>Close</button>
          </div>
        )}
      </div>
      <div className="button-group">
        <button onClick={generateQRCode}>Create QR Code</button>
        {qrValue && <button onClick={downloadQRCode}>Download QR Code</button>}
      </div>
      {qrValue && (
        <div className="qr-container" ref={qrRef}>
          <p className="encoded-text" style={{ fontSize: '18px', top: '-40px' }}>
            {truncateText(qrValue, 20)}
          </p>
          
          <QRCodeCanvas
            value={qrValue}
            size={256} // Set a default size
            fgColor={qrColor}
            bgColor={bgColor} // Apply the background color
          />
          <div
            className="qr-overlay"
            style={{ border: `2px solid ${qrColor}` }}
          >
            BMI
          </div>
          <p className="qr-bottom-text" style={{ fontSize: '18px', bottom: '-20px' }}>
            Created by qrcode.buckmaster.ca
          </p>
        </div>
      )}
      <div className="disclaimer">
        <p>This service is totally free; the QR code has no expiry. We are The Buckmaster Institute, Inc., developing web apps at <a href="https://buckmaster.ca" target="_blank" rel="noopener noreferrer">buckmaster.ca</a>.</p>
        <p>Legal Disclaimer: The Buckmaster Institute, Inc. is not responsible for any misuse of the QR codes generated by this service. Use at your own risk.</p>
      </div>
    </div>
  );
}

export default App;
