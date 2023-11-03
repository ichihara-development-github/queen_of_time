import { Button, Drawer, List, Paper, Skeleton, Typography} from "@mui/material"
import { Box } from "@mui/system"
import React, { Fragment, useContext, useEffect, useReducer, useState } from "react"
import { fetchAllNotifications, fetchNotifications } from "../apis/notification"
import { STYLE_2 } from "../components/const"
import { NotificationFeed } from "../components/notifications/Feed"
import { AuthContext } from "../contexts/auth"
import { SnackbarContext } from "../contexts/snackBar"
import { notificationsInitialState, notificationsReducer } from "../reducers/notifications"

export const Notification = () => {

    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(false);

    const sb = useContext(SnackbarContext);
    const auth = useContext(AuthContext);

    const [state, dispatch] = useReducer(notificationsReducer, notificationsInitialState)

    const drawerWidth = 220;

    const viewAll = () => {
      try{
        dispatch({type: "FETCHING"})
        fetchAllNotifications()
        .then(res => {
            dispatch({
              type: "FETCH_END",
              payload: res.data.notifications
            })
        })
      .catch(e => {
        if (e.response.status === 403) {
          auth.sessionForbidden()
          } else {
            throw e;
          }
        })
      }
      catch(e){console.log(e)}
    }

    const sortByRead = state.notificationsList.sort((a,b) =>{
      return (Number(a.read) - Number(b.read))
    })


    useEffect(() => {
      try{
        dispatch({type: "FETCHING"})
        fetchNotifications()
        .then(res => {
            dispatch({
              type: "FETCH_END",
              payload: res.data.notifications
            })
        })
        .catch(e => {
        if (e.response.status === 403) {
          auth.sessionForbidden()
         } else {
           throw e;
         }
        })
      }
      catch(e){console.log(e)}
     
    },[])

    
return (
    <>
      <Fragment>
        <Drawer
          variant="permanent"
          open={true}
          anchor="right"
        >
        <Box
        sx={{ width:drawerWidth}}
        role="presentation"
        >
                       
    {state.fetchState == "OK" ?
    <>
        {state.notificationsList.length > 0 ?
        <List>
          {sortByRead.map((notification, index) => (
              <NotificationFeed 
                key={index}
                index={index} 
                notification={notification}
                selected={selected}
                setSelected={setSelected}
               
              />
          ))}
        </List>
        :
          <Box sx={{ p:1, height:200 }}>
            <Typography component="div" variant="subtitle">
              現在通知はありません
            </Typography>
          </Box>
        }
    </>
    :  
    <>
     {
      [...Array(4).keys()].map(i => 
        <Box key={i} sx={{ height:50 }}>
          <Typography component="div" key={i} variant="caption">
            <Skeleton />
            <Skeleton />
          </Typography>
        </Box>
      )
     }
    
    </>
    }
   
    </Box>
    <Box sx={{p:1}}>
    <Button 
      id="allNotifications"
      fullWidth 
      variant="outlined" 
      color="primary"
      disabled={loading}
      onClick={() => viewAll()}
       >すべて見る</Button>
      
    </Box>
  
    </Drawer>
  </Fragment>
  <Paper elevation={3} sx={{width: `calc(100% - ${drawerWidth}px)`, height: 400, ...STYLE_2}}>
      <Box sx={{p: 2}}>
                    
    {state.notificationsList.length > 0 &&
      <div>
          <h2>{state.notificationsList[selected].title}</h2>
          <h3>送信者：　{state.notificationsList[selected].name}</h3>
          <div>{state.notificationsList[selected].content}</div>
      </div>
    }
      </Box>
  </Paper>
   
</>
)


}
