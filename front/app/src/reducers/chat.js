import { REQUEST_STATUS } from "../components/const";

export const initialState = {
    fetchState: REQUEST_STATUS.START,
    messageList :[]
}

export const ChatReducer = (state, action) => {
    console.log(action)

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                messageList: action.payload
            };
        case "ADD":
            return {
                fetchState: REQUEST_STATUS.OK,
                messageList: [...state.messageList,action.message]
            };
        case "REMOVE":
            return {
                fetchState: REQUEST_STATUS.OK,
                messageList: state.messageList.filter(m => m.id !== action.id)
            };
        default:
            throw new Error();
    }


}