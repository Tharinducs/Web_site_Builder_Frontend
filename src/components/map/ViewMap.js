import React, { useState, useEffect } from "react";
import {GOOGLE_API_KEY} from '../../_helpers/constant'
import GoogleMapReact from 'google-map-react';

import marker from "../../assets/img/marker.png"

const AnyReactComponent = () => <div><img style={{height:30}} src={marker} alt="marker"/></div>;




const SimpleExample = (props) => {
  const [lat, setLat] = useState(62.1339172);
  const [lng, setLng] = useState(25.0954868);
  const [defaultCenter,setDefaultCenter] = useState({lat:62.1339172,lng:25.0954868})
  const [zoom, setZoom] = useState(9);
  const position = [lat, lng];


  useEffect(() => {
    if (props?.lat && props?.lng) {
      setLat(props.lat);
      setLng(props.lng);
    }
  }, [props?.lat, props?.lng]);



  return (
    <div style={{height:320,width:'100%'}}>
      <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={defaultCenter}
          defaultZoom={zoom}
          zoom={zoom}
          center={position}
        >
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
    </div>
  );
};

export default SimpleExample;
