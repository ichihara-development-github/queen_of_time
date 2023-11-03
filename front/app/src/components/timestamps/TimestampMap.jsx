import React from "react"
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

import Icon from "../../images/offices-buildings-svgrepo-com.svg";
const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
  };
 
export const TimestampMap = ({officePosition, myPosition}) => (
  <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API}>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={myPosition}
                zoom={18}
            >
            <Marker position={myPosition} zIndex={2} />
            <Marker 
              position={officePosition}
              icon={{
                url:Icon,
                scale: 0.05
              }}
              
            />

            <Circle
            center={myPosition}
            radius={30}
            options={circleOptions}
            />
            </GoogleMap>
          </LoadScript>
)