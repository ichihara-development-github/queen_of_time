import React from 'react';

import { useState, useContext } from 'react';

import Button from '@mui/material/Button';

import { sendEmployeeParams } from '../apis/employees';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import { SnackbarContext } from '../contexts/snackBar';
import DatePicker from "react-datepicker";

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { NewEmployeeForm } from '../components/employees/NewEmployeeForm';
import { NewShiftForm } from '../components/shifts/NewShiftForm';
import { NewRoomForm } from '../components/chats/NewRoomForm';
import { createRoom } from '../apis/room';
import { Box, IconButton, Modal, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { assignShift } from '../apis/shifts';
import { imageUploder } from '../lib/imageUploader';
import { v4 as uuid } from "uuid";

const steps = [
  '従業員登録',
  'シフト作成',
  'チャットルーム作成',
];



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  maxWidth: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


export const NewEmployeeModal = ({state, dispatch}) =>{

  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setDate] = useState(new Date())
  const [stepIndex, setStepIndex] =useState(0)

  const sb = useContext(SnackbarContext);
 
    const sendParams = (params) => {
      const imageUrl = uuid();
      try {
        sendEmployeeParams(params)
        .then(res=> {
          if(res.status !== 201){
            switch(res.status){
              case 422:
                sb.setSnackBar({open: true, variant:"error",content:"このメールアドレスはすでに存在してます"})
                break
              case 500:
                sb.setSnackBar({open: true, variant:"error",content:"システムエラーが発生しました"})
                break

            }
            return
          }
          dispatch({
            type: "FETCH_END",
            payload:res.data.employees
          })
          imageUploder(params.image[0], imageUrl, sb)
          sb.setSnackBar({open: true, variant:"success", content: "従業員を作成しました"})
          setStepIndex(stepIndex + 1)
      })
      }
      catch(e){console.log(e.message)}
    }
    
    const sendShiftParams = (params) => {
      setLoading(true)
      assignShift(params)
      .then(res => {
          if(res.status !== 201){
              sb.setSnackBar({open: true, variant:"error",content:"エラーが発生しました。"})
              setOpen(false)
              return
          }
          sb.setSnackBar({open: true, variant:"success",content:"シフトを作成しました。"})
          setStepIndex(stepIndex + 1)
          
      })
  }

  const sendRoomParams = (params) => {
     
    createRoom(params)
    .then(res => {
      if(!res.status === 201){
        return false
      }
      setLoading(false)
      sb.setSnackBar({open: true, variant:"success",content:"新しいチャットを作成しました。"})
    })

  }

  const newemp = (
  <NewEmployeeForm
  sendParams={sendParams}
  requestStatus={state.FETCH_STATE}
  setDate
/>
  )

  const newshift = (
    <Box>
    <IconButton  sx={{float:"right"}}> 
    <DatePicker
      customInput={
            <DateRangeOutlinedIcon />
      }      
      dateFormat="yyyy-MM-dd"
      selected={selectedDate} 
      onChange={(date)=> setDate(date)}
    /> 
    </IconButton>
    <Box>
      <NewShiftForm
      sendShiftParams={sendShiftParams}
      date={selectedDate}
      loading={loading}
    />
    </Box>
  </Box>
  )

  const newroom = (
    <NewRoomForm
      sendRoomParams={sendRoomParams}
      loading={loading}
      setLoading={setLoading}
      />
  )

    
const stepComponents = [ 
  newemp,newshift,newroom]


    return (
      <>
    
         <Button 
          style={{marginLeft: "auto"}}
          variant="contained" 
          color="success" 
          endIcon={<PersonAddAltOutlinedIcon />} 
          onClick={() => {setOpen(true)}}
          >
           新規登録
         </Button>
         <Modal
          open={open}
          onClose={()=> setOpen(false)}
          >  
            <Box sx={style}>
                  
            <Stepper activeStep={stepIndex} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>
                      {label}
                  </StepLabel> 
                </Step>
              ))}
              </Stepper>
            {stepComponents[stepIndex]}
          
            </Box>
          </Modal>
      </>

    )

}