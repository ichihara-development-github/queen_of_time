import { Box, Modal } from "@material-ui/core";
import React from "react";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: "400px",
    width: 500,
    maxWidth: "95%",
    overflow: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
  };
  
  
export const DefaultModal = ({open, setOpen, content, inputStyle}) => {

    return (
        
        
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
    >
      <Box sx={{...modalStyle,...inputStyle}}>
          {content}
      </Box>
    </Modal>
    )
}