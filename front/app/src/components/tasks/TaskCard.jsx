import { Box, Card, IconButton } from "@mui/material";
import React ,{ useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskCardTitle } from "./TaskCardTitle";
import { TaskAddInput } from "./TaskInputForm";
import { Tasks } from "./Tasks";

import DeleteIcon from '@mui/icons-material/Delete';


const title = ["掃除","洗濯","料理","仕事"]
const init = title.map((t,index) => ({ id: index,
    draggableId: `${index}`,
    text: t})
    )


export const TaskCard = ({
    index,
    taskCardsList, 
    setTaskCardsList, 
    taskCard
}) =>{

    const [inputText, setInputText] = useState("");

    const handleDeleteCard = () => {
       setTaskCardsList(taskCardsList.filter(t => t.id !== taskCard.id))
    }
 
    return (
        <Draggable draggableId={`tasksCard-${taskCard.id}`} index={index}>
            {(provided) => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    className="taskCard"
                >
                    <div
                        {...provided.dragHandleProps}
                    >
                     <IconButton 
                        style={{position:"absolute", top:0, right:0}}
                        onClick={handleDeleteCard}
                        >
                         <DeleteIcon/>
                        </IconButton>
                        <TaskCardTitle 
                        taskCard={taskCard}
                        taskCardsList={taskCardsList}
                        setTaskCardsList={setTaskCardsList}
                        />
                    </div>
                        <TaskAddInput
                            inputText={inputText}
                            setInputText={setInputText}
                            taskCard={taskCard}
                            taskCardsList={taskCardsList}
                            setTaskCardsList={setTaskCardsList}
                        />
                       <Tasks
                        taskCard={taskCard}
                        taskCardsList={taskCardsList}
                        setTaskCardsList={setTaskCardsList}
                    />

                </div>
            )}

        </Draggable>
    );
};