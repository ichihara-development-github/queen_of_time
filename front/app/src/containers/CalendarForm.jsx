import { Button, FormControl, Stack, TextField } from "@mui/material";
import React, { useState, useContext } from "react"
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../apis/calendar";
import { CalendarEventTypes } from "../components/calendars/CalendarEventTypes";

import {SnackbarContext} from "../contexts/snackBar"
import DatePicker from "react-datepicker";

import { STYLE_2 } from "../components/const";

export const CalendarForm = ({
    eventId,
    initialParams,
    setOpen, 
    setEvents,
    setInitial,
    }) => {
      
    const [params, setParams] = useState(initialParams);
    const [value, setValue] = useState(initialParams.color);
    const sb = useContext(SnackbarContext);
  
    const handleChange= (e) => {
      setParams({...params, [e.target.name]: e.target.value})
    }

    
    const eventEdit = () => {
      updateCalendarEvent(eventId,params)
      .then(res => {
        setEvents(res.data.events)
        setInitial(res.data.events)
        sb.setSnackBar({variant:"success", open:true, content:"イベントを編集しました"})
        setOpen(false)
      })
      
    }
  

    const eventDelete = () => {
      if (window.confirm("イベントを削除しますか？")){
      deleteCalendarEvent(eventId)
      .then(res => {
        setEvents(res.data.events)
        setInitial(res.data.events)
        sb.setSnackBar({variant:"error", open:true, content:"イベントを削除しました"})
        setOpen(false)
      })
    }
    
    }
  
    const eventCreate = (e) => { 
        e.preventDefault()
        try{
        createCalendarEvent(params)
        .then(res => {
          if(res.status !== 201){
            setOpen(false)
            sb.setSnackBar({variant:"success", open:true, content:"イベントを作成できませんでした"})
            return
          }
          setEvents(res.data.events)
          setInitial(res.data.events)
          sb.setSnackBar({variant:"success", open:true, content:"イベントを作成しました"})
          setOpen(false)
        })
        }
         catch(e){console.log(e.message)}
      }
  
    const SelectEventType = () => {
      
      const handleSelect = (e) => {
        setValue(e.target.value)
        setParams({...params, color: e.target.value});
      };
    
      return (
        <CalendarEventTypes
          value={value}
          handleChange={handleSelect} />
      )
      
    }
  
    return (
      <div>   
      <FormControl variant="standard">
        <TextField
          margin="normal"
          type="text" 
          value={params.title}
          name="title"
          className="mui-input"
          label="イベント名"
          size="small"
          onChange={handleChange}
        />
        <TextField
         margin="normal"
         type="text"
         value={params.start}
         disabled
         name="start"
         label="開始日"
         size="small"
        />
        
        <DatePicker 
        customInput={
            <TextField
                fullWidth
                margin="normal"
                size="small"
                className="mui-input"
             />
        }      
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        selected={new Date(params.start)} 
        onChange={(date) => setParams({...params,start: date})} 
      />
       
         <TextField
          margin="normal"
          fullWidth
          value={params.description}
          name="description"
          className="mui-input"
          onChange={handleChange}
          placeholder="詳細"
          multiline
          rows={3}
        />

        <SelectEventType />
        {
          eventId ?
          <>
            <Stack sx={{p:1}} spacing={3} direction="row">
            <Button
            size="small"
            variant="contained" 
            color="success"
            onClick={()=>eventEdit()}
            >
              　　　編　集 　　
          </Button>
            <Button 
            size="small"
            variant="contained" 
            color="error" 
            onClick={() =>eventDelete()}>
          　　　削　除　　　
        </Button>
        </Stack>
          </>
        :
        <Button
        size="medium"
        variant="contained" 
        color="primary"
        onClick={eventCreate}
        >
            作　成
        </Button>

        }
        </FormControl>
  </div>
  
    )
  }