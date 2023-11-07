import React, { Fragment, useEffect, useState, useReducer, useContext } from 'react';

import { ChatMessages } from '../components/chats/ChatMessages'
import { ChatInput } from '../components/chats/ChatInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Alert, Badge, Chip, CircularProgress, Drawer, IconButton, ListItemAvatar, Snackbar, SnackbarContent, stepButtonClasses, Switch, TextField } from '@mui/material';
import { fetchMessages, createMessage, deleteMessage } from '../apis/chat';
import Stack from '@mui/material/Stack';
import { ChatReducer, initialState } from '../reducers/chat';
import { FormControlLabel, FormGroup } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';

import { Avatar, ListItem, ListItemText } from "@mui/material"

import MainImage from '../images/employee-default.jpg';

import { io } from "socket.io-client";

import Typography from '@mui/material/Typography';
import { fetchRooms } from '../apis/room';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { AuthContext } from '../contexts/auth';
import { AddChatRoom } from '../components/chats/AddChatRoom';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { convertLength } from '@mui/material/styles/cssUtils';
import { useTextFilter } from '../customeHooks/hooks';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { imageSrc, REQUEST_STATUS } from '../components/const';

const welcomeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  height: 400,
  maxWidth: "95%",
 
}

const drawerWidth = 240;
const responsiveWidth = window.innerWidth > 768 ? drawerWidth : 0;

let   socket = null

export const Chat = () => {
 
const [state, dispatch] = useReducer(ChatReducer, initialState);

const [rooms, setRooms] = useState([]);
const [selected, setSelected] = useState({id: "",name:"",avatar:""});
const [open, setOpen] = useState(responsiveWidth !== 0);
const [openSearch, setOpenSearch] = useState(false)

const [notice, setNotice] = useState({open: false, content: ""});
const [tempId, setTempid] = useState();
const auth = useContext(AuthContext);

const history = useHistory();

const [text, setText] = useState("")

const filtered = useTextFilter(state.messageList,"content",text)
const messageList = filtered.length > 0? filtered : state.messageList

const DOMAIN = process.env.NODE_ENV == "production" ? "https://web.queen-of-time.com": "http://localhost"
const SERVER = `${DOMAIN}:5500`; // WebSocket通信のサーバURL

  const cancelSend = (roomId, id) => {

    if(window.confirm("メッセージの送信を取り消しますか？")){

    deleteMessage(roomId, id)
    .then(res => {
      if(res.status !== 200){return}
      dispatch({
        type: "REMOVE",
        id: id
      })
      socket.emit("CANCEL_MESSAGE", roomId, id);
    })

  }
  
  }


  const handleSelect = (id) => {
    dispatch({type: "FETCHING"})
    fetchMessages(id)
    .then((res) => {
      socket.emit("leave", selected.id)
      setSelected({id: id, name: res.data.companion,avatar: res.data.avatar})
      socket.emit("join", id)
      dispatch({
        type: "FETCH_END",
        payload: res.data.messages
      })
      setText()
      
    })
   
  
  }
 

  const handleTransition = (path) => {
    history.push(path)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if(filtered.length == 0){alert("結果が見つかりませんでした")}

      // socket.emit("leave", selected.id)
      // socket.emit("join", selected.id)
  }

  const sendMessage = (id, content) => {
    
    createMessage(id, content)
    .then(res => {
      if(res.status !== 201){return}
      // joinedSocket.emit("SEND_PUSH", res.data.message);
      socket.emit("SEND_MESSAGE", selected.id, res.data.message);
      dispatch({
        type: "ADD",
        message: res.data.message
      })
    
    })
    .catch(e => console.log(e))
  }
  
  
  useEffect(() => {
   
    (async () => {
      socket = io(SERVER);
      console.log('Chat : useEffect()');
      socket.on('connection', () => {
          console.log('start connection. socket.id=' + socket.id);
      });

        
    socket.on("RECIEVE_MESSAGE",(message)=>{
      setNotice({open: true, content: message.content})
      console.log(notice)
        dispatch({
          type: "ADD",
          message: message
        })
        
    })

  socket.on("REMOVE_MESSAGE",(id)=>{
    dispatch({
      type: "REMOVE",
      id: id
    })
  }) 

  })();

        
    fetchRooms()
    .then(res => {
      setRooms(res.data.rooms)
      setTempid(res.data.tempId)
    })
    


  return () => {
    setTempid("")
    // socket.disconnect()
  };
}, []);


return (
 
    <Box >   
      <AppBar
        position="fixed"
        style={{paddingLeft: `calc(${responsiveWidth}px + 16px)`}}
      >
        <Stack>
        <Stack 
          direction="row"
          alignItems="center" 
          justifyContent="space-between"
        >
          <h4>{selected.name}</h4> 
          <div>
          <FormControlLabel
            control={
              <Switch onChange={()=>setOpen(!open)} checked={open} color="default"/>
            } 
            label=""
            labelPlacement="start"
            />  
            <IconButton onClick={() => setOpenSearch(!openSearch)}>
              <SearchOutlinedIcon sx={{marginLeft:"1rem",color:"white"}} />
           </IconButton>   
          </div> 
        </Stack>
        <form onSubmit={(e)=>{
          handleSearch(e)
        }}>
        <TextField 
          sx={{my:2,display: openSearch ? "": "none"}}
          style={{backgroundColor: "white"}}
          variant="standard"
          fullWidth
          placeholder="検索"
          name="text"
          onChange={(e) => setText(e.target.value)}
          />
        </form>
        

        </Stack>

       
      </AppBar>
      
         <Drawer
           sx={{
            width: responsiveWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width:  drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
                
<ul id="messages"></ul>
      <List sx={{ width: '100%',height:"100%", bgcolor: 'background.paper'}}>
      　{auth.state.chief ?  
      <ListItem>
        <AddChatRoom setRooms={setRooms}/>
      </ListItem>
      :
      ""
      }
      {rooms.map((room, index) => (
        <div key={index}>
         <ListItem button onClick={()=>handleSelect(room.id)}>
          <ListItemAvatar>
          <Badge color="error" badgeContent={room.read}>
                
            </Badge>
          <Avatar
            src={imageSrc(room) || MainImage}
            alt={room.name}
          />
        
          </ListItemAvatar>
          <ListItemText primary={room.name}/>
         </ListItem>
         <Divider variant="inset" component="li" />
        </div>
      )
      )}
      <ListItem style={{position:"absolute", bottom:10}}>
      {auth.state.chief ?
      
      <Button 
        fullWidth 
        color="success" 
        variant="outlined"
        onClick={()=> {handleTransition("/Dashboard")}}
      >
        管理画面へ
      </Button>

      :
      <Button 
        fullWidth 
        color="success" 
        variant="outlined"
        onClick={()=> {handleTransition("/employeeDashboard")}}
      >
        メニュー画面へ
      </Button>
      }
      </ListItem>

    </List>
        
    </Drawer>
    <Box style={{
        width: `calc(100% - ${responsiveWidth}px)`,
        marginLeft: `${responsiveWidth}px`
    }}
    >   
        
      {
        selected.id?
        <>

          {state.fetchState == REQUEST_STATUS.OK?
            <>
            <Stack>
            <ChatMessages 
              selected={selected}
              messages={messageList} 
              setMessage={dispatch}
              cancelSend={cancelSend}
              tempId={tempId}
            />
           
        <Snackbar 
          open={notice.open} 
          autoHideDuration={4000}
          sx={{marginBottom: 6}}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={()=>setNotice({...notice, open: false})}
          onClick={()=>{
            const elm = document.getElementById("chatMessagesBox");
            const bottom = elm.scrollHeight - elm.clientHeight;
            elm.scrollTo({top:bottom,  behavior: 'smooth'});
          }} >
          <Alert severity="secondary">
            <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={selected.avatar || MainImage}
            /><p>「{notice.content.slice(0,20)}」</p>
            </Stack>
          </Alert>
      </Snackbar>
            <ChatInput
              selected={selected}
              sendMessage={sendMessage}
              width={responsiveWidth}
            />
            </Stack>
    
          </>
          :
          <CircularProgress
          style={{width: "80px", height: "80px", margin: "180px auto"}}
          color="inherit"/>
          
      }
      </>
     
      :
      <div style={welcomeStyle}>
         <ChatOutlinedIcon /> 
          <Typography variant="h5">
            ルームをクリックして会話を始めましょう！
          </Typography>
          
      </div>
      } 
      </Box>
      
    </Box>
    
  
);

  
}