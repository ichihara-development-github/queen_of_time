import { Box, Stack, Typography } from "@mui/material";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../contexts/auth";
import { formattedDate } from "../../lib/calcDate";

import ChatTemplate from "./ChatTemplate"

const height =  document.documentElement.clientHeight;
const timeStyle = {
    margin:"1rem 0",
    color:"#808080",
    textAlign: "center"
  }

export const ChatMessages = ({
    messages, 
    selected, 
    cancelSend ,
    tempId,
}) => {
    let date = new Date().toString()
    let currentDate = new Date(0)
    
    
   return (
        <Box  
            id="chatMessagesBox"
            sx={{padding:"100px 2rem 0",
            height:`${height-100}px`,
            width:"100%",
            overflow: "scroll"
            }}
            >
             {messages.map((message, index) => {
                const side = message.employee_id === tempId ? "right" : "left";
                const baseTime = new Date(message.created_at)
                const messageDate = new Date(message.date)
                const time = `${("00"+baseTime.getHours()).slice(-2)} :${("00" + baseTime.getMinutes()).slice(-2)}`
                if(messageDate > currentDate){
                    currentDate = messageDate
                    date = formattedDate(currentDate)
                }else{
                    date = ""
                }
                
                // console.log(new Date(new Date(message.created_at).getFullYear(),new Date(message.created_at).getMonth(),new Date(message.created_at).getDate()) )
                // console.log(date)
                return (
                <div key={index}>
                <h5 style={timeStyle}>
                {date}
                  </h5>
                     <ChatTemplate
                        message={message}
                        roomId={selected.id}
                        side={side}
                        avatar={selected.avatar}
                        time={time}
                        cancelSend={cancelSend}
                    />
                </div>
                )
                })}

        </Box>)


}