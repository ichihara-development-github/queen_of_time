import React from "react";
import { Task } from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder=(taskList, startIndex, endIndex)=>{
    const remove = taskList.splice(startIndex, 1);
    taskList.splice(endIndex, 0, remove[0])
};


export const Tasks = ({taskCard, taskCardsList, setTaskCardsList}) =>{

    const taskList = taskCard.tasks 
    const handleDragEnd=(result)=>{
        reorder(taskList, result.source.index, result.destination.index);
        setTaskCardsList(taskCardsList)
    }
    return (
    <div>
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {taskList.map((task, index)=>(
                            <div key={task.id}>
                            <Task
                                index={index}
                                task={task} 
                                taskCardsList={taskCardsList} 
                                setTaskCardsList={setTaskCardsList}
                                taskCard={taskCard}
                            />
                        </div>

                        ))}
                         {provided.placeholder}

                    </div>
                )}
                
            </Droppable>

        </DragDropContext>
        
    </div>
    );
}