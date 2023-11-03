
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';

import React, { useState, useEffect, useContext, useReducer } from "react";
import { fetchMyShifts, fetchSubmittedShifts } from "../../apis/shifts";
import { SnackbarContext } from "../../contexts/snackBar";
import { betweenDates, getMonAndDate } from "../../lib/calcDate";
import { DefaultModal } from "../../components/shared/DefaultModal";
import { initialState, ShiftReducer } from "../../reducers/shift";
import { Box, Button, Chip, Divider, Stack, Switch, Typography } from "@mui/material";


import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import { BUSSINESS_HOUR, CONFIRMED_COLOR, REQUEST_STATUS, UNCONFIRMED_COLOR } from "../../components/const";

import { NewSubmitShifts } from "../../components/shifts/NewSubmitShifts";
import { PageLoadingCircle } from "../../components/shared/commonPatrs";
import { countToEvent } from "../../lib/calc";
import { ConfigContext } from "../../contexts/config";

let content = "";

const today = new Date();

export const EmployeeShifts = () => {
    
    const orgConfig = useContext(ConfigContext);
    const time = BUSSINESS_HOUR(orgConfig.params.open, orgConfig.params.close);


    const [open, setOpen] = useState(false);
    const [overray, setOverray] = useState(true)
    const [list, setList] = useState([]);
    
    const [state, dispatch] = useReducer(ShiftReducer, initialState)
 
    const sb = useContext(SnackbarContext);
    const [period, setPeriod] = useState([today.getFullYear(),today.getMonth()]);
    
    const times = () => {
        let time = [];
        for(let i=state.orgParams.open; i <= state.orgParams.close-1; i++){
            for(let j=0; j< 60; j+=30){
                time.push(`${i}:${("0"+j).slice(-2)}`)
            }
        }
        return time;
    };

   
    const handleEventClick = (e) => {

        content = (
            <Stack spacing={2}>
            
                 <Typography variant="h5">
                    {getMonAndDate(e.event.start,"/")}
                 </Typography>
                 <Typography variant="h5">
                    {e.event.title}
                 </Typography>
                    
                 <Typography variant="text">
                    備考： {e.event.extendedProps.description}
                 </Typography>

                 <Stack direction="row" justifyContent="end">
                 {e.event.backgroundColor == CONFIRMED_COLOR?
                    <Chip 
                        variant="filled"
                        color="success"
                        label="承認"
                        />     :
                        <Chip 
                        variant="outlined"
                       
                        label="未承認"
                        />    
                    }

                 </Stack>
               
                 <Divider/>
                 <Typography variant="text">
                   <BusinessIcon />：{state.orgParams.name}
                 </Typography>
                 <Typography variant="text">
                   <LocationOnIcon/>：{state.orgParams.address}
                 </Typography>
                 <Typography variant="h5">
                   <LocalPhoneIcon/>：090-9999-9999
                 </Typography>
            </Stack>
           
        )
       
        setOpen(true)
    }
  
    
    useEffect(() => {
    
        dispatch({type: "FETCHING"})
        fetchMyShifts(period)
        .then(res => {
            dispatch({
                type: "FETCH_END",
                payload: res.data
            })
        
        })
   
    },[period])

    return (
        <>
         {
            state.fetchState === REQUEST_STATUS.OK ?
            <Box>  
                <Stack direction="row" justifyContent="flex-end">
                    <Typography variant="subtitle1">シフト反映</Typography>
                    <Switch
                        checked={overray}
                        onChange={()=>setOverray(!overray)}
                        />
                </Stack>
                <FullCalendar
                 aspectRatio={1}
                    plugins={[dayGridPlugin,interactionPlugin,timeGridPlugin ]}
                    headerToolbar={{
                    center: 'dayGridMonth'
                    }}
                    initialView="dayGridMonth"
                    locale="ja" // 日本語化
                    events={overray ?
                         [...countToEvent(state.wholeShift,time),...state.shiftList] : 
                         state.shiftList
                        }
                    eventClick={handleEventClick}
                />
                <NewSubmitShifts
                    times={times()}
                    list={list}
                    setList={setList}
                    />

                <DefaultModal
                    open={open} 
                    setOpen={setOpen}
                    content={content}
                />
            </Box>
            :
            <PageLoadingCircle/>
        }
        </>
    
    )
}
