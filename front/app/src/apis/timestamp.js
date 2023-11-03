import axios from "axios";
import { approveTimestamp, modulateTimestamp, newTimestamp, timestampStandby } from "../urls/urlList"

//-----------------fetch-----------------
export const getTimestampStandby = () => {
    return axios.get(timestampStandby)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}

//-------------------post-------------------
export const createTimestamp = (params) => {
    return axios.post(newTimestamp, {timestamps: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}

//-------------patch--------------------

export const updateTimestamp = (params) => {
    return axios.patch(newTimestamp, {timestamps: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const modulateRequest = (params) => {
    return axios.patch(modulateTimestamp,{timestamps: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const approveRequest = (params) => {
    return axios.patch(approveTimestamp,{ids: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


