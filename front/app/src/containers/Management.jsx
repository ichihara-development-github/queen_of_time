import React, { useContext, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined'; 
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Badge from '@mui/material/Badge';

import { Link, useHistory } from 'react-router-dom';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { TaskCards } from '../components/tasks/TaskCards';
import { Calendar} from './Calendar';
import { Shift } from './Shift';

import { ManageAttendance } from './ManageAttendance';
import { Notification } from './Notification';
import { fetchInitialNotifications } from '../apis/employees';
import { AuthContext } from '../contexts/auth';
import { SnackbarContext } from '../contexts/snackBar';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NewEmployeeModal } from './NewEmployeeModal';
import { BadgeContext } from '../contexts/badge';
import { Setting } from './Setting';
import { ConfigContext } from '../contexts/config';

const today = new Date()
const initialPeriod = [today.getFullYear(),today.getMonth()+1]


export const Management = () => {
 
  const drawerWidth = 220;
  
  const [openState, setOpenState] = useState("task");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState(initialPeriod);
 

  const history = useHistory();

  const auth = useContext(AuthContext);
  const badge = useContext(BadgeContext); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


const handleLogout = () => {
  if(window.confirm("ログアウトしますか？")){auth.logout()}
}

const handlePush = (message) => {
  
  // Push.create(`${message.name}さんよりメッセージ`,
  // {
  //   body: message.content,
  //   icon: message.image,
  //   timeout:5000,
  //   onClick: function () {
  //   history.push("/chat")
  //   }
  // })
}


  const switchRender = () => {
   
    switch(openState){

      case "shift":
        return (<Shift  />)
      case "attendance":
        return (<ManageAttendance />)
      case "calendar":
        return (<Calendar setOpenState={setOpenState}/>)
      case "task":
        return (<TaskCards/>)
      case "notification":
        return (<Notification />)
      case "setting":
        return (<Setting />) 

    }
  }


  const drawer = (
    <div>
    <Toolbar>
    <Link to ="/employeeDashboard">
      {auth.state.name}
      </Link>

    </Toolbar>
     
     
      <Divider />
      <List>
      <Link to="/employees">
        <ListItem button >
          <ListItemIcon>
               <PersonOutlineOutlinedIcon /> 
            </ListItemIcon>
            <ListItemText primary="従業員管理" />
          </ListItem>
          </Link>
        <Link to="/chat">
        <ListItem button key="chat">
          <ListItemIcon>
              <Badge color="error" badgeContent={badge.badge.message}>
                <ChatOutlinedIcon /> 
              </Badge>
            </ListItemIcon>
            <ListItemText primary="チャット" />
          </ListItem>
          </Link>
{/*        
          <ListItem button key="notification"  onClick={()=>{setOpenState("notification")}}>
            <ListItemIcon>
            <Badge color="error" badgeContent={badge.badge.notification}>
               <NotificationsActiveOutlinedIcon  /> 
            </Badge>
            </ListItemIcon>
            <ListItemText primary="通知" />
          </ListItem> */}
        
       
          <ListItem button key="shift" onClick={()=>{setOpenState("shift")}}>
            <ListItemIcon>
            <Badge color="error" badgeContent={badge.badge.shift}>
                <BadgeOutlinedIcon /> 
            </Badge>
            </ListItemIcon>
            <ListItemText primary="シフト" />
          </ListItem>
         
        <ListItem button key="attendance" onClick={()=>{setOpenState("attendance")}}>
          <ListItemIcon>
          <Badge color="error" badgeContent={badge.badge.attendance}>
            <AccessTimeOutlinedIcon /> 
            </Badge>
          </ListItemIcon>
          <ListItemText primary="打刻履歴" />
        </ListItem> 

      </List>
      <Divider />
      <List>

      <ListItem button key="carender" onClick={()=>{setOpenState("calendar")}}>
            <ListItemIcon >
            <Badge color="error" badgeContent={badge.badge.calendar}>
              <DateRangeOutlinedIcon  />
            </Badge>
            </ListItemIcon>
            <ListItemText primary="カレンダー" />
          </ListItem>
        
          <ListItem button key="task" onClick={()=>{setOpenState("task")}}>
            <ListItemIcon >
            <Badge color="error" badgeContent={badge.badge.task}>
              <TaskOutlinedIcon />
            </Badge>
            </ListItemIcon>
              <ListItemText primary="タスク" />
          </ListItem>

          <ListItem button key="setting" onClick={()=>{setOpenState("setting")}}>
          <ListItemIcon>
            < SettingsOutlinedIcon /> 
          </ListItemIcon>
          <ListItemText primary="設定" />
        </ListItem> 
        

          <ListItem>
            <Button 
              fullWidth 
              color="error" 
              variant="outlined"
              onClick={() => handleLogout()}>
              ログアウト
            </Button>
          </ListItem>
      
      </List>
    </div>
  );
  
    
// const sock = new WebSocket("ws://127.0.0.1:5500");
// function click(){
//   sock.send(text);
//   };

    
// sock.addEventListener("open", e => {
//   console.log("接続が開かれたときに呼び出されるイベント");
// });

// sock.addEventListener("message", e => {
// console.log(e.data)
//   setDisplay(e.data)
// });

// sock.addEventListener("close", e => {
//   console.log("接続が閉じられたときに呼び出されるイベント");
// });

// sock.addEventListener("error", e => {
//   console.log("エラーが発生したときに呼び出されるイベント");
// });

// return ()=> sock.close()
    
//   joinedSocket.connect().on("PUSH_MESSAGE",function(message){
//     if(orgConfig.params.chat_notice){return}
//     handlePush(message)
// })

// joinedSocket.connect().on("getJoinedIds",function(){
//   const ids = JSON.parse(sessionStorage.getItem("qotRoomIds"))
//   joinedSocket.emit("reConnect",ids)
// })

  // const container = window !== undefined ? () => window().document.body : undefined;


return useMemo(() => {

    return (
  
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { szpshim: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {switchRender()}
    
      </Box>
    </Box>
      )},[openState])
    
    
    }

  

