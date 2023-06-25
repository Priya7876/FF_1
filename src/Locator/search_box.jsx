import Autocomplete from './autoCompletion'

import React from 'react';
import Check_box from './check_box';
import TimePicker from './timerPicker2'
import { useState ,userRef } from 'react';
import { BsGeoAltFill, BsFillClockFill } from "react-icons/bs";
import axios from "axios";

import Map from "./markOnMap";
import "./CommonCss.css"
import Button from "../Button/Button.jsx"



const SearchBox = () => {



  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [AddressAutocomplete,SetAddress] = useState("")
  const [Time,SetTime] = useState("")


  const handleResetClick = () => {
    const confirmation = window.confirm('Are you sure you want to reset?');
    if (confirmation) {
     window.location.reload();
    
    }
  };
  const updateVariable = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };
  const updateAddress = (address) => {
   SetAddress(address);
  };
  const updateTime = (time) => {
   SetTime(time);
  };


  return (
    <div className='wrapping'>
      <div className='searchForA'>
        Search for a Wells Fargo branch near you</div>




      <div className='mapAndTextAlign'>
        <div className='OptionsAndInput'>
          <div>
            <Autocomplete latitude={latitude} longitude={longitude} updateVariable={updateVariable}  updateAddress= {updateAddress}/>

          </div>

          <TimePicker />
         
            <div className='lookingForA'>Looking for a particular service?
              <Check_box  />
            </div>
        



        </div>
        
        <div className='Map'>
        <Map longitude={longitude} latitude={latitude}  />
        </div>
        <div className='ButtonDiv'>

          <inout type =" reset">
          <Button text={"Search"} color={"#FFFFFF"} fill={"#d7321e"} my={"12"} fontSize={"22px"}
            py={20} px={20}
            hoverFill={"#d7321e"}

          />
          </inout>
          <Button text={"Reset"} color={"#FFFFFF"} fill={"#d7321e"} my={"12"} fontSize={"22px"}
            hoverFill={"#d7321e"} clickFn={handleResetClick} py={20} px={20}

          />
        </div>
      </div>



    </div>

  );
}

export default SearchBox;

