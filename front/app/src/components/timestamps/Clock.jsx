import { Button } from "@mui/material";
import React,{ useEffect, useState } from "react";
import Typography from '@mui/material/Typography';


export const Clock = () => {
    
    // Declare a new state variable, which we'll call "count"
    const [date, setDate] = useState(new Date());
  
  
    const tick = () => { 
        setDate(new Date());
    }

    

    useEffect(()=>{ 
        setInterval(tick, 1000);
    },[]
  
    );
  
        
    return (
      <div>
        <Typography variant="h1" component="div" gutterBottom>
        {date.toLocaleTimeString()}
        </Typography>
       
         </div>
    );
  
  
  
}