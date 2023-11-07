import React, { useState, useEffect, useContext } from "react"
import { Clock } from "../../components/timestamps/Clock"
import Box from '@mui/material/Box';

import { getTimestampStandby } from "../../apis/timestamp";
import { AttendanceButton } from "../../components/timestamps/AttendanceButton";
import { LeavingButton } from "../../components/timestamps/LeavingButton";
import { hubenyDistance } from "../../lib/calcDistance"
import { ConfigContext } from "../../contexts/config";

const buttonStyle = {
  width: 200,
  display: "inline-block",
  height: 100,
  lineHeight: "100px",
  fontSize: 40,
  fontFamily: "Roboto Helvetica Arial sans-serif",
  color: "white",
  borderRadius: 5,
  margin: 30,
  opacity: 0.8,
  cursor: "pointer",
  transitionDuration: ".2s"
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: "100%",
    textAlign: "center",
    transform: 'translate(-50%, -50%)' 
}

export const TimeStamp = () =>{

  const [officePosition, setPosition] = useState();
  const [buttonState, setButtonState] = useState({at: true, lv: true})
  const orgConfig = useContext(ConfigContext);
  // gps --------------------------------------------------

      const checkDistance = (coords) => {
        const distance = hubenyDistance(
          officePosition.lat, 
          officePosition.lng, 
          coords.lat, 
          coords.lng
        )
          if(distance > orgConfig.params.stampable_distance){
            return false
          }

        return false
      } 

      useEffect(() => {
        
console.log("render")
        getTimestampStandby()
        .then(res => {
        setPosition(res.data.positions)
        setButtonState(res.data.status)
        })
      
      },[]);



    //-------------------functions---------------------

  
return (
    <Box style={style}>
    <Clock/>
    <AttendanceButton
      checkDistance={checkDistance} 
      officePosition={officePosition}
      buttonState={buttonState}
      setButtonState={setButtonState}
      style={buttonStyle}
    />
    
    <LeavingButton
       checkDistance={checkDistance} 
       officePosition={officePosition}
       buttonState={buttonState}
       setButtonState={setButtonState}
       style={buttonStyle}
    />
    {console.log(buttonState)}

    </Box>

)

}