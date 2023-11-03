import { REQUEST_STATUS } from "../components/const";

export const initialState = {
    fetchState: REQUEST_STATUS.START,
    attendanceData :[]
}

export const AttendanceReducer = (state, action) => {

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                attendanceData : action.payload
            };
            case "FILTER":
            return {
                fetchState: REQUEST_STATUS.OK,
                attendanceData : action.payload
            };

        default:
            throw new Error();
    }


}