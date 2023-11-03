import { REQUEST_STATUS } from "../components/const";


export const organizationInitialState  = {
    fetchState: REQUEST_STATUS.START,
    organizationsList :[]
}


export const organizationsReducer = (state, action) => {

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                organizationsList: action.payload.organizations
            };

        default:
            throw new Error();
    }


}