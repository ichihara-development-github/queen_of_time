import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormLabel, Switch, Typography } from '@mui/material';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { CalendarModal } from '../components/calendars/CalendarModal';
import { CalendarForm } from './CalendarForm';
import { CalendarEventTypes } from '../components/calendars/CalendarEventTypes';
import { fetchCalendars } from '../apis/calendar';
import { calcAssignCount, countToEvent } from '../lib/calc';
import { ConfigContext } from '../contexts/config';
import { CalendarShifts } from '../components/calendars/CalendarShifts';
import { formattedDate } from '../lib/calcDate';
import { BUSSINESS_HOUR } from '../components/const';

let content = "";
const shiftColor = "gray";

export const Calendar = ({
  setOpenState
}) => {

  const [initial, setInitial] = useState();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState();
  const [shift, setShift] = useState([])
  const [overlay, setOverlay]= useState(true);

  const orgConfig = useContext(ConfigContext);
  const time = BUSSINESS_HOUR(orgConfig.params.open, orgConfig.params.close);


  let initialParams = {title:"",description:"",start:"",end:"",color:"red"};

  const handleEventFilter = (e) => {
    setEvents(initial.filter(elm => elm.color == e.target.value))
  }

  const handleEventClick = (e) => {

    const ev = e.event;

    initialParams = {
                   title: ev.title,
                   description: ev.extendedProps.description,
                   start: ev.start.toLocaleString({ timeZone: 'Asia/Tokyo' }),
                   end: ev.end,
                   color: ev.backgroundColor
                  }
      
        ev.backgroundColor === shiftColor ?
        content = <CalendarShifts 
                    shifts={shift[formattedDate(ev.start)]}
                    count={ev.title}
                    date={ev.start}
                    setOpenState={setOpenState}
                   />
        :
        content = (
            <CalendarForm  
            eventId={ev.id}
            initialParams={initialParams}
            setOpen={setOpen} 
            setEvents={setEvents}
            setInitial={setInitial}
            />       
        )
    
    setOpen(true)   
  }

  const handleDateClick = (e) => {
   content = (
    <CalendarForm 
      initialParams={{...initialParams,start:e.dateStr.toString()}}
      setOpen={setOpen} 
      setEvents={setEvents}
      setInitial={setInitial}
      />
    )
    setOpen(true)
  }

    
useEffect(() => {
  fetchCalendars()
  .then((res) => {
    setEvents(res.data.events)
    setShift(res.data.shifts)
    setInitial(res.data.events)
  })

},[]);


    return (
    <> 
      {events ? 
      <div>
        <FormLabel >表示項目</FormLabel>
        <Stack direction="row" alignItems="center">
           {console.log(shift)}
              <CalendarEventTypes
               handleChange={handleEventFilter}
              />
          <Stack 
            style={{marginLeft: "auto"}}
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
              <Switch 
                checked={overlay}
                onChange={()=>setOverlay(!overlay)}
              />
              <Typography variant="subtitle1">シフト反映</Typography>

          </Stack>

        
        </Stack>
      
         <FullCalendar
            sx={{height:"100%"}}
            plugins={[dayGridPlugin,interactionPlugin,timeGridPlugin ]}
            initialView="dayGridMonth"
            headerToolbar={{
              center: 'dayGridMonth,timeGridWeek'
            }}
            locale="ja" 
            contentHeight={700}
            events={
              overlay ? [...countToEvent(shift,time),...events] : events}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
          />

      </div>
      
      :
        <Skeleton variant="rectangular" width="100%" height={480} />
      
      }

      <CalendarModal
        open={open} 
        setOpen={setOpen}
        handleClose={()=>setOpen(false)}
        content={content}
        />
    
      </>
 
    
    )
}