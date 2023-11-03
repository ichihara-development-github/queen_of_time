import { Button, Grid, SnackbarContent, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { fetchTask, sendTask } from "../../apis/task";
import { BadgeContext } from "../../contexts/badge";
import { SnackbarContext } from "../../contexts/snackBar";
import { AddTaskCardButton } from "./AddTaskCardButton";

import {TaskCard} from "./TaskCard"

const reorder=(taskCardsList, startIndex, endIndex)=>{
    const remove = taskCardsList.splice(startIndex, 1);
    taskCardsList.splice(endIndex, 0, remove[0])
};


export const TaskCards = () => {

    const sb = useContext(SnackbarContext);
    const badge =useContext(BadgeContext)

    const [taskCardsList, setTaskCardsList] = useState([{id: "0",draggableId: "item0",title: "",tasks:[]}]);
    
    const handleDragEnd = (result) => {
        reorder(taskCardsList, result.source.index, result.destination.index);
        setTaskCardsList(taskCardsList);
    };
    
    const saveTask = () => {
        if(window.confirm("タスクの状態を保存しますか？ \n ※削除されたタスクは復元されません")){
            sendTask(taskCardsList)
            .then(res => {
                if(res.status !== 200){
                    sb.setSnackBar({variant:"error", open:true, content:"タスクを保存できませんでした"})
                    return
                }
                sb.setSnackBar({variant:"success", open:true, content:"タスクを保存しました"})
                setTimeout(() => {
                     badge.setBadge({...badge.badge, task: res.data.task_count})
                },2000)
            })
          }
    }

    useEffect(()=> {
        fetchTask()
        .then((res) => {
            setTaskCardsList(res.data.task_cards)
        })
    },[])

   
return useMemo(() => {

   return (
    <div className="taskCardsArea">
        <Stack 
        sx={{height:60,width:"100%"}} 
        direction="row"
        >
        <AddTaskCardButton
            taskCardsList={taskCardsList}
            setTaskCardsList={setTaskCardsList}
        />
        <Button 
            style={{marginLeft:"auto"}}
            color="success" 
            variant="contained"
            onClick={()=> saveTask()}>保存
        </Button>
       
        </Stack>
        
       <DragDropContext onDragEnd={handleDragEnd}>
           
           <Droppable 
            droppableId="droppable" 
            direction="horizontal"
           >
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  style={{width:"100%"}}
                  >
                  
                 <Grid 
                    container 
                    spacing={2} 
                    justifyContent="center"
                    alignItems="flex-start"
                 >
                    {taskCardsList.map((taskCard, index) => (
                           
                        <TaskCard
                                key={taskCard.id}
                                index={index}
                                taskCard={taskCard}
                                taskCardsList={taskCardsList}
                                setTaskCardsList={setTaskCardsList}
                        />     
                   
                    ))}
                   {provided.placeholder}
                  
                </Grid>
                      
              </div>
              )}

           </Droppable>
        </DragDropContext>
        </div>


    )
},[taskCardsList])

}