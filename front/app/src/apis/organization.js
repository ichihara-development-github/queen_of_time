import axios from "axios";
import { newOrganization } from "../urls/urlList";

export const createOrganization = (params) => {
    return axios.post(newOrganization, {organizations: params})
    .then(res => {
        return res
    })
    .catch((e) =>   {throw e;})
}
