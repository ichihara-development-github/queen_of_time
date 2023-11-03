import axios from "axios";
import { allNotifications, newNotification, notificationList, updateNotification} from "../urls/urlList";

export const fetchNotifications = () => {
    return axios.get(notificationList)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}


export const fetchAllNotifications = () => {
    return axios.get(allNotifications)
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

export const createNotification = (params) => {
    return axios.post(newNotification, {notification: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}



export const updateNotificationRead = (id) => {
    return axios.patch(updateNotification,{id: id})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}

