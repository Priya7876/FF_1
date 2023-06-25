
import React, { useState ,useRef,useEffect} from 'react';
import axios from 'axios';
import { BsGeoAltFill } from "react-icons/bs";


import "./CommonCss.css"
import './Autcomplete.css';
import  InputField from '../InputField/InputField.jsx'


const AddressAutocomplete = ({ latitude, longitude, updateVariable,updateAddress }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim() !== '') {
      const accessToken = "pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg";
      const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=${accessToken}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const features = response.data.features;
          setSuggestedAddresses(features);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      setSuggestedAddresses([]);
    }
  };

  const handleAddressSelect = (address) => {
    console.log(address);

    setSearchValue(address.place_name);
    setSuggestedAddresses([]);
    updateVariable(address.center[1], address.center[0]);
    updateAddress(address.place_name)
  };

  const handleLocationClick = () => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchLocation(latitude, longitude);
        }, error => {
          console.error('Error getting current location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const fetchLocation = async (latitude, longitude) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg`
        );
        const { features } = response.data;
        console.log({ features });
        if (features && features.length > 0) {
          const { place_name } = features[0];

          setSearchValue(place_name);
          updateVariable(features[0].center[1], features[0].center[0]);
          updateAddress(place_name)
          
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
      finally {
        setLoading(false);
      }
    };

    getLocation();
  };

  const onClose = () => {
    setSuggestedAddresses([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

 

  return (
     <div>
    <InputField placeholder = {"Enter your address"} onIconclick = {handleLocationClick}
    onChanging = {handleInputChange}  isLoading = {loading}  searchValue = {searchValue}
    icon = "./assets/location.png"
    type = "text"
    />
    {suggestedAddresses.length > 0 && (
      <div id="autocomplete-div" ref ={dialogRef}>
        {suggestedAddresses.map((address) => (
          <div key={address.id} >
            <div className="autocomplete-item"

              onClick={() => handleAddressSelect(address)}
            >

              {address.place_name}
            </div>

          </div>
        ))}
      </div>
    )}
    </div>
    
    // <div >

    //   <input
    //     className='locationInputFieldForLocation'
    //     type="text"
    //     value={loading ? "Loading" : searchValue}
    //     onChange={handleInputChange}
    //     placeholder="Enter an address"

    //   />
    //   {suggestedAddresses.length > 0 && (
    //     <div id="autocomplete-div">
    //       {suggestedAddresses.map((address) => (
    //         <div key={address.id} >
    //           <div className="autocomplete-item"

    //             onClick={() => handleAddressSelect(address)}
    //           >

    //             {address.place_name}
    //           </div>

    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   <div className='locationOn'>

    //     <BsGeoAltFill onClick={handleLocationClick} disabled={loading} /></div>
    // </div>
  );
};

export default AddressAutocomplete;
