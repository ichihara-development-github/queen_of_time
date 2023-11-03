import axios from "axios";
import { assign, assignMember, determineShift, myShifts, newShifts, removeShift, shiftPath, submitShifts, submittedShiftList, unapprovedShifts } from "../urls/urlList";

export const fetchSubmittedShifts = (period) => {
    return axios.get(submittedShiftList(period))
    .then(res => {
        return res
    })
}

export const fetchMyShifts = (period) => {
    return axios.get(myShifts(period))
    .then(res => {
        return res
    })
}

export const fetchNewShifts = () => {
    return axios.get(newShifts)
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}


export const fetchAssignMember = (date) => {
    return axios.get(assignMember(date))
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}

export const fetchUnapprovedShift = () => {
    return axios.get(unapprovedShifts)
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}



export const sendShifts = (params) => {
    return axios.post(submitShifts,{shifts: params})
    .then(res => {

        return res
    })
     .catch((e) => {return e})
}


export const createShift = (params) => {
    params.date = new Date(params.date.getTime()+1000*3600*9)
    return axios.post(shiftPath,{shifts: params})
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}

export const assignShift = (params) => {
    return axios.post(assign,{shifts: params})
    .then(res => {
        return res
    })
    .catch((e) => {return e})
}



export const determineShifts = (params) => {
    console.log(params)
    return axios.patch(determineShift,{shifts: params})
    .then(res =>{
        return res})
     .catch((e) => {return e})
}

export const deleteShift = (id) => {
    return axios.delete(removeShift(id))
    .then(res =>{
        return res})
     .catch((e) => {return e})
}