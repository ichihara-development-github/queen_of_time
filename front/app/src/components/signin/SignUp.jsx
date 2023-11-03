import { NewEmployeeForm } from '../../components/employees/NewEmployeeForm';
import { useState } from 'react';
import { Box, TextField, Step, StepLabel, Stepper, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { REQUEST_STATUS } from '../const';
import { NewOrganizationForm } from './OrganizationForm';


const steps = [
    '責任者アカウント作成',
    '組織作成',
    // '各種設定',
  ];

export const SignUp = () => {
    const [stepIndex, setStepIndex] = useState(0);
　  const [empParams, setEmpParams] = useState();
   
    const sendEmployeeParams = (params) => {
        setEmpParams(params)
        setStepIndex(1)
    }



    const stepComponents = [ 
        <NewEmployeeForm 
            sendParams={sendEmployeeParams}
            requestStatus={REQUEST_STATUS.OK}
             />,
        <NewOrganizationForm empParams={empParams} setStepIndex={setStepIndex}/>,
        <NewEmployeeForm/>]
      
    return (
        <Box  sx={{width: "90%",maxWidth:500, margin:"32px auto"}}>
                  
        <Stepper 
            activeStep={stepIndex} 
            alternativeLabel
            style={{my:4}}
        >
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
        
    )
}