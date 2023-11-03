import React, { useEffect, useState, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "./mountain.jpg";
import { updateNotificationRead } from "../../apis/notification";
import { BadgeContext } from "../../contexts/badge";
import { formattedTime } from "../../lib/calcDate";


export const NotificationFeed = ({
    index,
    notification, 
    selected, 
    setSelected
}) => {

    const [read, setRead] = useState(notification.read);
    const badge = useContext(BadgeContext)
    const time = formattedTime(new Date(notification.created_at).getTime() /1000)

    const handleClick = () => {
        setSelected(index)
        if(!read){
            updateNotificationRead(notification.id)
            .then((res) =>{
                if(res.status !== 200){return}
            setRead(true)
            badge.setBadge({...badge.badge, notification: badge.badge.notification -1})
            })
    }
    }

    useEffect(() => {
        setRead(notification.read);
    },[])
    
    return (
    <div>
    <ListItem
        style={read ?  {backgroundColor: "rgb(180,180,180)"} : {}}
        button 
        selected={selected==index}
        onClick={() => handleClick()}
   >
        <ListItemIcon>
        <Avatar src={Image} />
    </ListItemIcon>
    
    <ListItemText primary={notification.title}/>
    <span>{time}</span>
    </ListItem>
    </div>
    )


}