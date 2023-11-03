import React, { useEffect, useReducer, useState } from "react"

import { Box, Button, Skeleton, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { AttendanceGraph } from "../../components/attendances/AttendanceGraph";
import { fetchAttendance } from "../../apis/attendance";
import { AttendanceReducer, initialState } from "../../reducers/attendances";
import { RequestModal } from "./RequestModal";
import { SelectDate } from "../../components/shared/SelectDate";
import { AttendanceIndex } from "../../components/attendances/AttendanceIndex";
import { SelectMonth } from "../../components/shared/SelectMonth";


export const EmployeeAttendance = ({setSbParams}) => {

  //----------------------state----------------

const [open, setOpen] = useState(false);
const [list, setList] = useState();
const [checked, setChecked] = useState([]);

const [state, dispatch] = useReducer(AttendanceReducer, initialState);


const handleCheck = (e) => {
  var id = e.target.id;
  var timestamp = state.attendanceData.find(elm => elm.id == id);
  
    
  if (e.target.checked){
    setChecked([...checked,timestamp])
  }else{
    var filtered = checked.filter(elm => 
      elm.id != id
    )
    setChecked(filtered)

  } 
} 



  useEffect(() => {
    dispatch({type: "FETCHING"})
    try {
      fetchAttendance()
      .then(res => {
        console.log(res.data.attendances)
        dispatch({type: "FETCH_END", payload: res.data.attendances})
        setList( res.data.attendances)
      }
    )
    }catch (e){
      console.log(e.message);
    }

  },[]);


      return(
      <>        
      <Box sx={{p: 2,height: 400}}>
            <Stack 
              my={4}
              direction="row" 
              alignItems="center"
            >
             
              <SelectMonth
                list={state.attendanceData}
                setList={setList}
              />  
  
              </Stack>
              
              
              {
                list ?
                
        <Box sx={{ margin:"0 auto", maxWidth: 600}}>
           <Button 
                    size="large"
                    variant="contained" 
                    color="success"
                    fullWidth
                    disabled={checked.length == 0}
                    onClick={() => setOpen(true)}
                  >
                  　　　申請画面へ　　　
                </Button>
        <AttendanceIndex
          state={state.fetchState}
          list={list} 
          checked={checked}
          handleCheck={handleCheck}
        />
        </Box>
  
                :
                <Skeleton 
                height="100%"
                variant="rectangle" />
               }

            <RequestModal 
              open={open} 
              setOpen={setOpen} 
              params={checked}
              setSbParams={setSbParams} />
      </Box>
     
      </>

    )
}