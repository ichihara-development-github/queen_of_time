
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { Box } from "@mui/system";
import React, { useState, useContext } from 'react';
import { IconButton, Modal, Tooltip } from '@mui/material';
import { NewShiftForm } from './NewShiftForm';
import { SnackbarContext } from '../../contexts/snackBar';
import { assignShift } from '../../apis/shifts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: "100%",
    width: 500,
    maxWidth: "95%",
    overflow: "scroll",
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  

export const NewShiftModal = ({
    state,
    dispatch,
    date,
    loading,
    setLoading
}) => {

    const [open, setOpen] = useState(false);
    const sb = useContext(SnackbarContext);

    const sendShiftParams = (params) => {
        setLoading(true)
        assignShift(params)
        .then(res => {
            if(res.status !== 201){
                sb.setSnackBar({open: true, color:"error",content:"エラーが発生しました。"})
                setOpen(false)
                return
            }
            dispatch([...state,res.data.shift])
            sb.setSnackBar({open: true, color:"success",content:"シフトを作成しました。"})
            setOpen(false)
            setLoading(false)
            
        })
    }



    const content = (
        <>
        <NewShiftForm
            sendShiftParams={sendShiftParams}
            date={date}
            loading={loading}
        />
       
        </>
    )



    return (
        <>
          <Tooltip title="シフト追加" arrow>
            <IconButton onClick={()=>setOpen(true)}>
                <AddBoxOutlinedIcon/>
            </IconButton>
          </Tooltip>
        <Modal
            open={open} 
            onClose={()=>setOpen(false)} 
            >
                <Box sx={style} >
                    {content}
                </Box>


            </Modal>
        </>
    
    )
}