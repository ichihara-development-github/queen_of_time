import React, { useState, useEffect } from 'react';

import { IconButton, ListItemIcon, Stack, Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getMonAndDate } from "../../lib/calcDate";
import DatePicker from "react-datepicker";

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { useDateFilter } from '../../customeHooks/hooks';

export const SelectDate = ({
    list,
    setList,
    setDate=function(date){console.log(date)},
}) => {
  

  const [selectedDate, setSelectedDate] = useState(new Date());
  const filtered = useDateFilter(list, selectedDate);
  
  useEffect(() => {setList(filtered)},[filtered, list])

  
  const handleChangeDate = (type) => {
    switch (type){
      case "ahead":
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
        setDate(selectedDate)
        return
      case "back":
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
        setDate(selectedDate)
        return

    }
  
  }


    return (
    
        <Stack direction="row"alignItems="center">
           <IconButton onClick={() => handleChangeDate("back")}>
            <ArrowBackIosNewIcon />
           </IconButton>  
           <IconButton>
              <DatePicker
              customInput={
                      <DateRangeOutlinedIcon />
              }      
              dateFormat="yyyy-MM-dd"
              selected={selectedDate} 
              onChange={(date)=> setSelectedDate(date)}
              /> 
             </IconButton>
            <IconButton  onClick={() => handleChangeDate("ahead")}>
              <ArrowForwardIosIcon />
            </IconButton>
       
        <Typography variant="h5">{getMonAndDate(selectedDate, "/")}</Typography>
    </Stack>

    )



}