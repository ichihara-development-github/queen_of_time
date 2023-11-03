import { TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

export const TaskCardTitle = ({
    taskCard,
    taskCardsList,
    setTaskCardsList
}) =>{
    const [isClick, setIsClick] = useState(false);
    const [inputText, setInputText] = useState(taskCard.title || "タイトルを入力");
    const change = taskCardsList.slice()
    const i = change.indexOf(change.find(v => v.id == [taskCard.id]))

   
    const handleClick=()=>{
        setIsClick(true);
    };

    const handleChange= (e) =>{
        setInputText(e.target.value)
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        change[i].title = inputText
        setTaskCardsList(change)
        setIsClick(false);
    };

    return (
    <div onClick={handleClick}>
       {isClick? 
        <form onSubmit={handleSubmit}>
            <TextField  style={{backgroundColor:"white"}}size="small" onChange={handleChange} />
        </form>
        :  
        (<Typography style={{textAlign:"center"}}variant="h5">
            {inputText}
        </Typography>)}
    </div>
    );
}