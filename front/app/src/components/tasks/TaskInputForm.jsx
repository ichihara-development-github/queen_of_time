import React from "react";
import { v4 as uuid } from "uuid";

export const TaskAddInput = ({
    inputText, 
    setInputText, 
    taskCard,
    taskCardsList,
    setTaskCardsList
}) =>{

    const taskList = taskCard.tasks
    const change = taskCardsList.slice()
    const i = change.indexOf(change.find(v => v.id == [taskCard.id]))


    const handleSubmit=(e)=>{
        const taskId = uuid();
        e.preventDefault();
        if(taskList.length >= 5){
            alert("作成可能なタスクは最大5個までです")
            return false
        }
        if (inputText === ""){return};
        change[i].tasks.push({
            id: taskId,
            draggableId: `task${taskId}`,
            content: inputText})

        setTaskCardsList(change);
        setInputText("");
    };

    const handleChange=(e)=>{
        if(e.target.value.length > 12){return alert("12文字までです")}
        setInputText(e.target.value);
    } ;



    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="タスクを追加する" 
            className="taskAddInput"
            onChange={handleChange}
            value={inputText} />
        </form>
    </div>
    );
}