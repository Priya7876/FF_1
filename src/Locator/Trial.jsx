import React, { useState } from 'react';
import './TimePicker.css';

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const maxTime = '17:00'; // Maximum time limit (e.g., 6:00 PM)

  const handleTimeChange = (event) => {
    const selected = event.target.value;
    
    if (selected <= maxTime) {
        setSelectedTime(selected);
        setPlaceholderVisible(false);
      }
    setPlaceholderVisible(false);
  };

  return (
    <div className="time-picker">
      <input
        type="time"
        value={selectedTime}
        onChange={handleTimeChange}
        max={maxTime} // Set the maximum time limit
        className="time-picker-input"
      />
      {/* {isPlaceholderVisible && (
        <span className="time-picker-placeholder">Select a time</span>
      )} */}
    </div>
  );
};

export default TimePicker;
