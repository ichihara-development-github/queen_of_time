import axios from "axios";
import { taskList, updateTask } from "../urls/urlList"

export const fetchTask = () => {
    return axios.get(taskList)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const  sendTask = (params) => {
    console.log(params)
   
    return axios.patch(updateTask,{tasks: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


