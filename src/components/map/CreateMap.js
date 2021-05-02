import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvent,
  useMap,
} from "react-leaflet";
import {GOOGLE_API_KEY} from '../../_helpers/constant'
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyComponent = ({ changeP }) => {
  useMapEvent("click", (e) => {
    changeP(e);
  });
  return null;
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const SimpleExample = (props) => {
  const [lat, setLat] = useState(62.1339172);
  const [lng, setLng] = useState(25.0954868);
  const [zoom, setZoom] = useState(6);
  const position = [lat, lng];

  useEffect(() => {
    if (props?.lat && props?.lng) {
      setLat(props.lat);
      setLng(props.lng);
    }
  }, [props?.lat, props?.lng]);

  const clickToFeature = (e) => {
    setLat(e.latlng.lat);
    setLng(e.latlng.lng);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latlng.lat},${e.latlng.lng}&key=${GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if(data?.results && data.results.length !==0){
        props.setValue(
          "address",
          JSON.stringify({
            value:data.results[0] && data.results[0].formatted_address,
            address: data.results[0] && data.results[0].formatted_address,
            coordinates:{
              lat: e.latlng.lat,
              lng: e.latlng.lng,
            }
          })
        );
      }else{
        props.setValue(
          "address",
          JSON.stringify({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            address: "Joenvarrentie 38, 79600 Joroinen, Finland",
          })
        );
      }});
    
  };

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
      <ChangeView center={position} zoom={zoom} /> 
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MyComponent changeP={clickToFeature} />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default SimpleExample;
