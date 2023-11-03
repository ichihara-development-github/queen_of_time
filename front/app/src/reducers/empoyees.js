import { REQUEST_STATUS } from "../components/const";


export const initialState = {
    fetchState: REQUEST_STATUS.START,
    employeeList :[]
}

export const employeesReducer = (state, action) => {

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "POST":
            return {
                ...state,
                fechState: REQUEST_STATUS.POST,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                employeeList: action.payload
            };

        default:
            throw new Error();
    }


}