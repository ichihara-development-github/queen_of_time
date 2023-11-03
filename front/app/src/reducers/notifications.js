import { REQUEST_STATUS } from "../components/const";

export const notificationsInitialState  = {
    fetchState: REQUEST_STATUS.START,
    notificationsList :[]
}


export const notificationsReducer = (state, action) => {

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                notificationsList: action.payload
            };

        default:
            throw new Error();
    }


}