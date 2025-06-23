# 💳 UPI Payment Booking React App

This is a simple React app that allows users to:

- Select a booking amount
- Enter their phone number
- Scan a generated UPI QR code to make payment
- Submit transaction reference ID
- View a confirmation message after submission

---

## 🔧 Features

- 📲 UPI QR Code generation with dynamic amount
- 📞 Phone number input before payment
- 🧾 Reference number entry after QR scan
- 🔐 Prevents accidental refresh during payment
- ⚠️ Shows native browser warning when refreshing/closing tab
- ✅ Automatically resets after successful submission
- 🖤 Clean UI with all styles in a separate CSS file

---

## 📦 Folder Structure

src/
├── Components.jsx        # Main component logic
├── components.css        # All UI styling
├── App.js                # Entry point
└── index.js              # React root
