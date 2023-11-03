import { Button, CircularProgress, FormControl, InputLabel, MenuItem, NativeSelect, Paper, Select, Stack, TextField, Typography } from "@mui/material";

import React, { useState, useContext, useMemo } from "react";
import { modulateRequest } from "../../apis/timestamp";
import { SnackbarContext } from "../../contexts/snackBar";

export const RequestForm = ({param}) => {

     
     const hours = useMemo(()=>([...Array(25).keys()]),[])
     const minutes = useMemo(()=>([...Array(60).keys()]),[])

     var at = new Date(param.attendance_time*1000);
     var lv = new Date(param.leaving_time*1000);
    
     const initialFeed = {
       id: param.id,
       at_hour: at.getHours(),
       at_minute: at.getMinutes(),
       lv_hour: lv.getHours(),
       lv_minute: lv.getMinutes(),
       rest_time: param.rest_time || 60,
       comment:""
     };
    
    const [feed, setFeed] = useState(initialFeed);
    const sb = useContext(SnackbarContext);
    const [loading ,setLoading] = useState(false);

    const handleSubmit = (e) => {
      console.log(feed)
      if ((feed.at_hour*60+feed.at_minute)>(feed.lv_hour*60+feed.lv_minute)){return alert("入力された値が適切ではありません")}
      setLoading(true)
      e.preventDefault();
      const submitParams = {
        id: feed.id,
        updated_attendance_time: Date.parse(`${param.date} ${feed.at_hour}:${feed.at_minute}:00`)/1000,
        updated_leaving_time:Date.parse(`${param.date} ${feed.lv_hour}:${feed.lv_minute}:00`)/1000,
        updated_rest_time: feed.rest_time,
        comment: feed.comment
      }

      modulateRequest(submitParams)
      .then(res => {
        if(res.status !== 200){return false && sb.setSnackBar({open: true, variant:"error",content:"エラーが発生しました。"})}
      
      e.target.classList.add("Mui-disabled");
      setLoading(false)
       sb.setSnackBar({variant:"success", content:"申請が完了しました", open: true})
      
      }

      )

    }

    const handleChange = (e) => {
        setFeed({...feed,[e.target.name]: e.target.value})
    }
    console.log(feed)


    return( 
      <Paper sx={{p:1, my:2}}>
      <Typography varinat="h3">{param.date}</Typography>
      <Stack 
        sx={{my:2}}
        direction="row" 
        spacing={1} 
        alignItems="center"
      >
        <span>出</span>
        <FormControl sx={{ m: 1, width:35}} variant="standard">
        <InputLabel>時</InputLabel>
            <NativeSelect
              value={feed.at_hour}
              label="時"
              name="at_hour"
              onChange={(e)=>handleChange(e)}
            > 
            {hours.map(n => 
                <option key={n} value={n}>{n}</option>
                )
            }   
            </NativeSelect>
            </FormControl>
            <FormControl sx={{ m: 1, width:35}} variant="standard">
            <InputLabel>分</InputLabel>
            <NativeSelect
              value={feed.at_minute}
              label="分"
              name="at_minute"
              onChange={(e)=>handleChange(e)}
            > 
            {minutes.map(n => 
                <option key={n} value={n}>{n}</option>
                )
            }   
            </NativeSelect>
            </FormControl>
            <div>

            </div>
            <span>退</span>
          <FormControl sx={{ m: 1, width:35  }} variant="standard">
          <InputLabel id="demo-simple-select-label">時</InputLabel>
              <NativeSelect
                value={feed.lv_hour}
                label="時"
                name="lv_hour"
                onChange={(e)=>handleChange(e)}
              > 
              {hours.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
            </NativeSelect>
            </FormControl>
            <FormControl sx={{ m: 1, width:35 }} variant="standard">
            <InputLabel>分</InputLabel>
            <NativeSelect
              value={feed.lv_minute}
              label="分"
              name="lv_minute"
              onChange={(e)=>handleChange(e)}
          
            > 
            {minutes.map(n => 
                <option key={n} value={n}>{n}</option>
                )
            }   
            </NativeSelect>
            </FormControl>
            <div>
            <span>休</span>
              <TextField
                sx={{width: 50}}
                value={feed.rest_time}
                name="rest_time"
                onChange={(e)=>handleChange(e)}
              />
            </div>
           
         </Stack>   
          
        <TextField
          fullWidth
          sx={{my:1}}
          name="comment"
          onChange={(e)=>handleChange(e)}
          placeholder="備考欄"
          multiline
          rows={2}
        />
        
        <Button 
          fullWidth
          variant="contained" 
          color="success"
          onClick={(e)=>handleSubmit(e)}
          endIcon={
            loading ?
              <CircularProgress size="1.5rem" color="inherit"/>
              :
              ""
          }
          >
            申　請
        </Button>
       
       </Paper>
      )
    

   
}