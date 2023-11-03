import axios from "axios";
import { inviteEmployees, roomList } from "../urls/urlList"

export const fetchRooms = () => {
    return axios.get(roomList)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const fetchInviteEmployees = () => {
    return axios.get(inviteEmployees)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}



export const createRoom = (params) => {
    return axios.post(roomList,{rooms: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}