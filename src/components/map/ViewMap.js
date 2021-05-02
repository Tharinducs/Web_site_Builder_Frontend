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

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} >
      <ChangeView center={position} zoom={zoom} /> 
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default SimpleExample;
