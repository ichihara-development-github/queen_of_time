import React from "react";
import { v4 as uuid } from "uuid";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Paper } from "@mui/material";

export const AddTaskCardButton = ({taskCardsList, setTaskCardsList}) =>{
    
    const addTaskCard=()=>{
        const taskCardId = uuid();
        if(taskCardsList.length >= 3){
            alert("作成可能なタスクは最大3個までです")
            return false
        }

        setTaskCardsList([
            ...taskCardsList,
            {
                id: taskCardId,
                title: "タイトルを入力",
                draggableId: `item${taskCardId}`,
                tasks:[]
            }

        ]);
    };
    
    return (
    
        <IconButton onClick={addTaskCard}>
            <div className="addTask">
             <AddIcon /> 
            </div>
        </IconButton>
        

    );
}