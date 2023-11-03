import React, { useState, useContext } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DefaultModal } from "../shared/DefaultModal";
import {TimestampMap} from "./TimestampMap"
import { updateTimestamp } from "../../apis/timestamp";
import { SnackbarContext } from "../../contexts/snackBar";


export const LeavingButton = ({
  checkDistance,
  officePosition,
  style,
  buttonState,
  setButtonState
}) => { 

  const [open, setOpen] = useState(false);
  const [content, setContent] =useState("");
  const sb = useContext(SnackbarContext)

  //---------------gps-------------------
  
  const options = {
    enableHightAccuracy: true,
    timeout: 10000,    
}


const dynamicStyle = {
  ...style,
  backgroundColor: buttonState.lv? "":"orange" ,
  color:  buttonState.lv? "gray" : "white"
}

const success = (position) => {
    const coords = position.coords
  
      // if (!checkDistance(coords)){
      //   return false
      // }

      
      const myPosition = {
        lat: coords.latitude,
        lng: coords.longitude,
        zIndex: 1,
      }
            

      updateTimestamp({leaving_time: (position.timestamp / 1000)})
      .then((data) => {
        
          var content = (
            <div>
                <TimestampMap
                  officePosition={officePosition} 
                  myPosition={myPosition}
                />
                <h1 style={{color:"orange"}}>退　勤</h1>
                {/* {defaultText(position)} */}
                <h5>{data.name}</h5>
                <p>本日もお疲れ様でした。</p>
            </div>)
        
        setContent(content)
      
    })
      .catch((e) => console.log(e.message))
    }


    const error = (err) => {
        console.error(`${err.code}: ${err.message}`);
    }

    
    //---------------------------------------


  
  const handleClick = (e) => {
    if(!window.navigator.onLine){
      sb.setSnackBar({open: true, variant:"error", content:"インターネットに接続されていません"})
      return
    }
    setButtonState({...buttonState, lv: true})
    navigator.geolocation.getCurrentPosition(success, error, options);
    setOpen(true)

  }



  return (

    <>
  <button
    style={dynamicStyle}
    className="stampingButton"
    onClick={(e) => handleClick(e)}
    disabled={buttonState.lv}
    >退　勤
    </button>


    <DefaultModal
     open={open} 
     setOpen={setOpen} 
     content={content} 
     />
      
    </>

    
  )



}