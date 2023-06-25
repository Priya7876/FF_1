import React, { useState } from 'react';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';



import './TimePicker.css';
import "./CommonCss.css"
import  InputField from '../InputField/InputField.jsx'
import './Autcomplete.css';

const TimePickerFinal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    setIsOpen(false);
  };

  const togglePicker = () => {
    setIsOpen(!isOpen);
  };
  // const [selectedTime, setSelectedTime] = useState('');
  // const [isOpen, setisOpen]= useState(false)



  // const handleTimeChange = (time) => {
  //   setSelectedTime(time);
  //   setisOpen(false)
  // };
 
  // const handleOnClick = (time) => {

   
  // };
  // const handleClose = (time) => {

  //   setisOpen(true);
  //  };

   
  return (
    <div >
    
    <InputField placeholder = {"Enter your start time"} onIconclick = {togglePicker}
    icon = "./assets/clockUpdated.png"
    type = "text"
      searchValue = {selectedTime}/>
      {isOpen && (
        <div className='pickerContainerStyle'>
          <input type='time'
          className='timeInput'
          >
          </input>
         
          </div>
        )}

    </div>
  );
};

export default TimePickerFinal;
