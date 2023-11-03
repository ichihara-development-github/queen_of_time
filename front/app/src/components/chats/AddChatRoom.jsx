import { IconButton, Input, Modal, Select, Skeleton, SnackbarContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Button, Divider, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import React, { useContext, useState } from "react"
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { SnackbarContext } from '../../contexts/snackBar';
import { createRoom } from '../../apis/room';
import { NewRoomForm } from './NewRoomForm';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: "95%",
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


export const AddChatRoom  = ({setRooms}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const sb = useContext(SnackbarContext);

    const sendRoomParams = (params) => {
     
      createRoom(params)
      .then(res => {
        if(!res.status === 201){
          return false
        }
        setRooms(res.data.rooms)
        setLoading(false)
        setOpen(false)
        sb.setSnackBar({open: true, variant:"success",content:"新しいチャットを作成しました。"})
      })

    }
    
    

    const content = (
       <NewRoomForm
        sendRoomParams={sendRoomParams}
        loading={loading}
        setLoading={setLoading}
       />
       
    )

    return(
        <>
        <IconButton onClick={()=> setOpen(true)}>
          <AddCommentOutlinedIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={()=> setOpen(false)}
          >
        <Box sx={style}>
            {content}
        </Box>
          </Modal>
        </>
        
    )
   
}