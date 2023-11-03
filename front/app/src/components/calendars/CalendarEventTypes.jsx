import { Box, FormControl } from "@material-ui/core";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState, useContext } from 'react';
import { ConfigContext } from "../../contexts/config";

  export const CalendarEventTypes = ({value, handleChange}) =>{

  const orgConfig = useContext(ConfigContext);

  const colors=  
  [ 
    {"key":"red","value": orgConfig.params.red},
    {"key":"royalblue","value": orgConfig.params.royalblue},
    {"key":"green","value": orgConfig.params.green},
    {"key":"orange","value": orgConfig.params.orange},
  ]
    
   

    return(
  
    <Box>
     <FormControl>
      <RadioGroup
        row
        value={value}
        onChange={handleChange}
      >
        {colors.map(v =>  
           <FormControlLabel 
           key={v.key}
            value={v.key} 
            control={<Radio 
              sx={{
                color: v.key,
                '&.Mui-checked': {
                  color: v.key[600],
                }}}/>} 
            label={v.value}
          />
        )}
       
      </RadioGroup>
    </FormControl>
  </Box>
  )
      }
  