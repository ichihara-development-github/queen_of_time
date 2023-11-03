
import axios from "../lib/axios"
import { currentSession, newSession, removeSession } from "../urls/urlList"

export const createSession = (params) => {

    return axios.post(newSession, {session: params})
    .then(res => res)
    .catch((e) =>   {throw e;})

}


export const deleteSession = () => {

    return axios.delete(removeSession)
    .then(res => res)
    .catch(e => console.log(e))
}


export const checkSession = () => {
    return axios.get(currentSession)
    .then(res => {
        return res
      })
    .catch((e) =>   {
        throw e;})
}