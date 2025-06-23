import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './components.css';

const moneyOptions = [1, 250, 500, 1000];

const Components = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const upiId = 'your-upi-id@upi'; 

  useEffect(() => {
    const disableRefreshKeys = (e) => {
      if (showQR && !submitted) {
        if (
          e.key === 'F5' ||
          (e.ctrlKey && e.key.toLowerCase() === 'r') ||
          (e.metaKey && e.key.toLowerCase() === 'r')
        ) {
          e.preventDefault();
          alert('🔒 Payment in progress. Refresh is disabled to avoid data loss.');
        }
      }
    };

    const handleBeforeUnload = (e) => {
      if (showQR && !submitted) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('keydown', disableRefreshKeys);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('keydown', disableRefreshKeys);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showQR, submitted]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSelectedAmount(null);
        setShowForm(false);
        setPhone('');
        setShowQR(false);
        setTxnId('');
        setSubmitted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleBook = (amount) => {
    setSelectedAmount(amount);
    setShowForm(true);
    setShowQR(false);
    setSubmitted(false);
  };

  const handleContinue = () => {
    if (phone.length === 10) {
      setShowQR(true);
      setShowForm(false);
    } else {
      alert('Enter a valid 10-digit phone number');
    }
  };

  const handleTxnSubmit = () => {
    if (txnId.trim().length < 6) {
      alert('Enter a valid transaction/reference number');
      return;
    }
    setSubmitted(true);
  };

  const getUPILink = () => {
    return `upi://pay?pa=${upiId}&pn=Booking&am=${selectedAmount}&cu=INR`;
  };

  return (
    <div className="main-container">
      <div className="card-container">
        <h1 className="card-title">Choose Booking Amount</h1>

        {/* Step 1: Booking Amounts */}
        {!showForm && !showQR && (
          <div className="grid-container">
            {moneyOptions.map((amount, idx) => (
              <div key={idx} className="amount-box">
                <h2 className="amount-text">₹{amount}</h2>
                <button onClick={() => handleBook(amount)} className="button-primary">
                  Book
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="form-section">
            <label className="form-label">Enter Your Phone Number</label>
            <input
              type="tel"
              maxLength="10"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
            <button onClick={handleContinue} className="button-success">
              Continue
            </button>
          </div>
        )}

        {showQR && !submitted && (
          <div className="qr-section">
            <p className="qr-warning">
              ⚠️ Please do not go back or refresh while the payment is in process.
            </p>
            <h2 className="qr-amount">Pay ₹{selectedAmount}</h2>
            <QRCodeCanvas value={getUPILink()} size={200} className="qr-code" />
            <p className="qr-note">Scan the QR code to pay</p>

            <div className="txn-section">
              <label className="form-label">Transaction Number</label>
              <input
                type="text"
                placeholder="Txn/Ref No."
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="input-field"
              />
              <button onClick={handleTxnSubmit} className="button-purple">
                Submit
              </button>
            </div>
          </div>
        )}


        {submitted && (
          <div className="success-message">
            ✅ We will verify your transaction within 1–2 business hours.
          </div>
        )}
      </div>
    </div>
  );
};

export default Components;
