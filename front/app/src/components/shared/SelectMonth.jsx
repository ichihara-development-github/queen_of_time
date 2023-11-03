import React, { useState, useEffect } from 'react';

import { IconButton, ListItemIcon, Stack, Typography } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchMonthly } from '../../apis/attendance';
import { useMonthFilter } from '../../customeHooks/hooks';

export const SelectMonth = ({
    list, setList
}) => {

  const [month, setMonth] = useState((new Date).getMonth() + 1);
  const filtered = useMonthFilter(list, month)
    
    useEffect(() => { setList(filtered) },[filtered])
  
  const handleChange = (type) => {
    switch (type){
      case "ahead":
        return setMonth(month + 1)
      case "back":
        return setMonth(month - 1)
    }
  
  }



    return (
        <Stack direction="row"alignItems="center">
           <IconButton onClick={() => handleChange("back")}>
            <ArrowBackIosNewIcon />
           </IconButton>  
         <Typography variant="h6">{month}月</Typography>
         <IconButton  onClick={() => handleChange("ahead")}>
              <ArrowForwardIosIcon />
            </IconButton>
    </Stack>

    )



}