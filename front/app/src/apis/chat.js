import axios from "axios";
import { messageList, newMessage, removeMessage } from "../urls/urlList"

export const fetchMessages = (id) => {
    console.log(id)
    return axios.get(messageList(id))
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const  createMessage = (id,params) => {
   
    return axios.post(messageList(id),{messages: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const  deleteMessage = (room_id, id) => {
   
    return axios.delete(removeMessage(room_id, id))
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

