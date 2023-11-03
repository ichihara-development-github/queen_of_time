import { CONFIRMED_COLOR, REQUEST_STATUS, UNCONFIRMED_COLOR } from "../components/const";


export const initialState = {
    fetchState: REQUEST_STATUS.START,
    shiftList :[],
    orgParams: {
        open:9,
        close:18,
        name:"",
        address:""
    }
}

const convertShift = (shifts) => {

    const list = shifts.map(shift => {
        const title = `${shift.attendance_time}-${shift.leaving_time}`
        return  {title: title,
                start: shift.date, 
                description: shift.comment,
                backgroundColor: shift.confirmed? CONFIRMED_COLOR : UNCONFIRMED_COLOR
            }
    })
    return list

}

export const ShiftReducer = (state, action) => {

    switch(action.type) {

        case "FETCHING":
            return {
                ...state,
                fechState: REQUEST_STATUS.LOADING,
            };
        case "FETCH_END":
            return {
                fetchState: REQUEST_STATUS.OK,
                shiftList : convertShift(action.payload.myshifts),
                wholeShift: action.payload.shifts,
                orgParams: action.payload.orgParams
            };

        default:
            throw new Error();
    }


}