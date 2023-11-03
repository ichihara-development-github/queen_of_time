import axios from "axios";
import { newProfile, updateOrgConfig, updateProfile } from "../urls/urlList";


export const fetchProfile = () => {
    return axios.get(newProfile)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const fetchOrgParams = () => {
    return axios.get(newProfile)
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const sendProfile = (params) => {
    return axios.patch(updateProfile, {profile: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}


export const sendOrgParams = (params) => {
    return axios.patch(updateOrgConfig, {config: params})
    .then(res => {
        return res
    })
    .catch((e) => console.log(e))
}
