import axios from "axios";
import { calendarList, deleteCalendar, newCalendar, updateCalendar } from "../urls/urlList"

export const fetchCalendars = () => {
    return axios.get(calendarList)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const  createCalendarEvent = (params) => {
    return axios.post(newCalendar,{calendars: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

export const updateCalendarEvent = (id, params) => {
    return axios.patch(updateCalendar(id),{calendars: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

export const  deleteCalendarEvent = (id) => {
    return axios.delete(deleteCalendar(id))
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

