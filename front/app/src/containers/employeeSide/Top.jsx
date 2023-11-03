import React, { useContext, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import { TimeStamp } from './TimeStamp';
import { EmployeeAttendance } from './EmployeeAttendance'
import { Notification } from '../Notification';
import { SnackbarContext } from '../../contexts/snackBar';
import { AuthContext } from '../../contexts/auth';
import { Button } from '@mui/material';
import { EmployeeShifts } from './EmployeeShift';
import { Redirect,  } from 'react-router-dom';
import { Profile } from './Profile';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const style= {
  position: 'fixed',
  bottom: 20, 
  right: 20, 
  zIndex:200,
  marginTop: 30

}

export const EmployeeTop = () => {
    const [openState, setOpenState] = useState("shift");
    
    const auth = useContext(AuthContext)

const actions = 
  !auth.state.chief ? 
  [
    { icon: <LogoutIcon /> , name: 'logout',value: "ログアウト" },
    { icon: <PersonOutlineOutlinedIcon />  , name: 'profile',value: "アカウント設定" },
    { icon: <AccessTimeOutlinedIcon /> , name: 'timestamp',value: "打刻画面" },
    { icon: <ListAltIcon />, name: 'attendance', value: "打刻履歴" },
    { icon: <BadgeOutlinedIcon /> , name: 'shift',value: "シフト" },
    { icon:  <ChatOutlinedIcon />   , name: 'chat',value: "チャット" }
  ]
  :
  [{icon: <ArrowCircleLeftIcon />, name: 'back', value: "管理画面へ"},
  { icon: <PersonOutlineOutlinedIcon />  , name: 'profile',value: "アカウント設定" },
  { icon: <AccessTimeOutlinedIcon /> , name: 'timestamp',value: "打刻画面" },
  { icon: <ListAltIcon />, name: 'attendance', value: "打刻履歴" },
  { icon:  <ChatOutlinedIcon />   , name: 'chat',value: "チャット" }
  ]
;
    const SwitchRender = () => {
      

        switch(openState){  
            case "logout":
              return (<Redirect to="/login"/>)
            case "chat":
              return (<Redirect to="/chat"/>)
            case "shift":
              return (<EmployeeShifts/>)
            case "attendance":
              return (<EmployeeAttendance  setOpenState={setOpenState}/>)
            case "timestamp":
              return (<TimeStamp />)
            case "notification":
              return (<Notification />)
            case "profile":
              return (<Profile />)
            case "back":
              return (<Redirect to="/Dashboard"/>)
        
      }
    }
    

  return useMemo(() => {

  return (
  <>     
        <SwitchRender/>

        <Box sx={style}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<ModeEditIcon />} />}
        >
    
          {actions.map((action) => (
            <SpeedDialAction
              onClick={() =>  {setOpenState(action.name)}}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.value}
            />
          ))}
          
        </SpeedDial>
      </Box>
  
  </>
   
  );
          },[openState])
}

