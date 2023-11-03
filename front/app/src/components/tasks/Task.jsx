import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";

import CancelIcon from '@mui/icons-material/Cancel';

export const Task = ({
    index,
    task,
    taskCardsList,
    setTaskCardsList,
    taskCard
}) =>{
    
    const change = taskCardsList.slice()
    const i = change.indexOf(change.find(v => v.id == [taskCard.id]))
   
    const handleDelete = () => {
        change[i].tasks = change[i].tasks .filter(elm => elm.id !== task.id)
        setTaskCardsList(change);
    };


    return (
    <Draggable 
        index={index}
        draggableId={`task-${task.id}`}
    >
        {(provided) => (
            <Paper
            key={task.id} 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="taskContent"
                >
                <Stack 
                    sx={{width:"100%"}}
                    direction="row" 
                    alignItems="center"
                >
                    <Typography variant="h6">{task.content}</Typography>
                    <IconButton style={{marginLeft: "auto"}} onClick={handleDelete}>
                        <CancelIcon />
                    </IconButton>

                </Stack>
        </Paper>
        )}
        
    </Draggable>

    
    );
}