import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import "./CommonCss.css"


const Map = ({ longitude, latitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    let map;
    if (longitude !== 0 || latitude !== 0) {
      map = L.map(mapContainerRef.current).setView([latitude, longitude], 10);
    } else {
      map = L.map(mapContainerRef.current).setView([51.505, -0.09], 10);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markLocation = async () => {
      if (longitude !== 0 || latitude !== 0) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${"pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg"}`
          );

          const features = response.data.features;
          if (features.length > 0) {
            const [lng, lat] = features[0].center;

            L.marker([lat, lng], {
              icon: L.icon({ iconUrl: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23FF0000' }),
            }).addTo(map);

            map.setView([lat, lng], 15);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    markLocation();

    return () => map.remove();
  }, [longitude, latitude]);

  return <div ref={mapContainerRef} className='mapsicleMapIcon' />;
};

export default Map;
