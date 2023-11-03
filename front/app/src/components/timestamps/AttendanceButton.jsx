import React, { useContext, useState } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DefaultModal } from "../shared/DefaultModal";
import {TimestampMap} from "./TimestampMap"
import { createTimestamp } from "../../apis/timestamp";
import { SnackbarContext } from "../../contexts/snackBar";

export const AttendanceButton = ({
  checkDistance,
  officePosition,
  style,
  buttonState,
  setButtonState}) => { 

  const [open, setOpen] = useState(false);
  const [content, setContent] =useState("");
  const sb = useContext(SnackbarContext);

  //---------------gps-------------------
  
  const options = {
    enableHightAccuracy: true,
    timeout: 10000,    
}

const dynamicStyle = {
  ...style,
  backgroundColor: buttonState.at? "":"green" ,
  color:  buttonState.at? "gray" : "white"
}

// const dateTime = new Date(position.timestamp)

// return(
//     <>
//     <div style={{fontWeight: "bold"}}>
//       <span>{dateTime.getMonth()+1}</span>月
//       <span>{dateTime.getDate()}</span>日
//       <span>{dateTime.getHours()}</span>時
//       <span>{dateTime.getMinutes()}</span>分
//     </div>
//     </>
// )

const success = (position) => {
    const coords = position.coords
      var myPosition = {
        lat: coords.latitude,
        lng: coords.longitude
      }
      console.log("success")
     
      // if (!checkDistance(myPosition)){
       
      //   return false
      // }


      createTimestamp({attendance_time: (position.timestamp / 1000)})
      .then((data) => {
        
          var content = (
            <div>
               <TimestampMap
                  officePosition={officePosition} 
                  myPosition={myPosition}
                />

                <h1 style={{color:"green"}}>出　勤</h1>
                {/* {defaultText(position)} */}
                <h5>{data.name}</h5>
                <p>本日も一日頑張りましょう！</p>
            </div>
          )
        
        setContent(content)
     
    })
      .catch((e) => console.log(e.message))
    }

    const error = (err) => {
        switch(err.code){
          case "Network location":
        }
        console.error(`${err.code}: ${err.message}`);
    }

    
    //---------------------------------------


  
  const handleClick = () => {

    setButtonState({...buttonState, at: true})
    navigator.geolocation.getCurrentPosition(success, error, options);
    setOpen(true)

  }

  

  return (

    <>
   <button
    style={dynamicStyle}
    className="stampingButton"
    onClick={(e) => handleClick(e)}
    disabled={buttonState.at}
    >出　勤
    </button>


    <DefaultModal
     open={open} 
     setOpen={setOpen} 
     content={content} 
     />
      
    </>

    
  )



}