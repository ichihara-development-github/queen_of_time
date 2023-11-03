import axios from "axios";
import { employeesList, initialNotifications, newEmployee, removeEmployee } from "../urls/urlList"

export const fetchEmployees = () => {
    return axios.get(employeesList)
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}


export const sendEmployeeParams = (params) => {
    return axios.post(newEmployee,{employees: params})
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}



export const fetchInitialNotifications = () => {
    return axios.get(initialNotifications)
    .then(res => {
        return res
    })
     .catch((e) => {return e})
}

export const deleteEmployee = (id) => {
    return axios.delete(removeEmployee(id))
    .then(res => {
        return res
    })
     .catch((e) => {return e})

}



