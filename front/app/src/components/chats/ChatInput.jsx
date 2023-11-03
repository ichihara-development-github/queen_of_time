import React, { useContext, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Box, InputBase, Stack, TextField } from "@mui/material";

export const ChatInput = ({selected, sendMessage,width}) => {

  const [text, setText] = useState();
  
  const handleChange = (e) => {
    setText(e.target.value)
  }
  
  const Submit = (e) => {
    
    e.preventDefault();
    if(!text){return}
    sendMessage(selected.id, text);
    setText(null);
    document.getElementById("chatInput").value="";
  }

  return (
    <Box >
     <form 
      onSubmit={Submit} 
      style={{position:"fixed",
       bottom:0, 
       width:`calc(100% - ${width}px`}}
     >
       <Stack 
        sx={{py:2}}
        direction="row" 
        spacing={1} 
        alignItems="center"
        >
          <TextField
            id="chatInput"
            required
            style={{width:"calc(100% - 50px)"}}
            onChange={handleChange} 
        /> 
         <IconButton 
          type="submit"
          color="primary" 
          component="button"
          >
         <SendIcon/>
          </IconButton>

       </Stack>

   
        
    </form>

     </Box>
    
  

  )

}