import React from 'react';
import '../Locator/Autcomplete.css';
import '../Locator/CommonCss.css';
import './inputField.css'
import { BsGeoAltFill, BsFillClockFill } from "react-icons/bs";
const InputField = (props) => {
  return (
    <div className='searchForLocation'>

      <input
        className='locationInputFieldForLocation'
        type={props.type}
        value={props.isLoading ? "Loading" : props.searchValue}
        onChange={props.onChanging}
        placeholder={props.placeholder}
        

      />
     
      <div className='locationOn'> <img src={props.icon}    style={{ width: '20%' }} onClick={props.onIconclick} disabled={props.isLoading}  /></div>
      
    </div>
  );
}

export default InputField;
