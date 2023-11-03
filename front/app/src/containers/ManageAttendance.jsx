import React, { useEffect, useReducer, useState, useContext, useMemo } from "react"

import { Button, CircularProgress, List, Stack, Switch, Typography } from "@mui/material";
import { AttendanceReducer, initialState } from "../reducers/attendances";
import { AttendanceGraph } from "../components/attendances/AttendanceGraph";
import { approveRequest, fetchManageAttendance } from "../apis/attendance";
import { SelectDate } from "../components/shared/SelectDate";
import { BadgeContext } from "../contexts/badge";
import { SnackbarContext } from "../contexts/snackBar";
import { Box } from "@mui/system";

const SCALE = 4;


export const ManageAttendance = ({
 
}) => {

  //------------------state----------------

const [checked, setChecked]= useState([]);
const [list, setList] = useState([]);
const [filter, setFilter] = useState(false);
const [loading, setLoading] = useState(false);

const [state, dispatch] = useReducer(AttendanceReducer, initialState);
const sb = useContext(SnackbarContext)

const handleCheck = (e) => {
  console.log(e.target.checked)

    
  if (e.target.checked){
    setChecked([...checked,
    {id: e.target.id,
    name: e.target.name}])
 
  }else{
    var filtered = checked.filter(elm => {
      return elm.id != e.target.id
    })
    setChecked(filtered)
  } 
  console.log(checked)
} 


const approveTimecard = () => {
  setLoading(true)
  console.log(checked)
  var ids = checked.map(elm => elm.id)
  try {
    approveRequest(ids)
    .then(res => {
      if(res.status !== 200){
        sb.setSnackBar({variant: "error", content: "承認できませんでした", open: true})
        setLoading(false)
        return
      }
      sb.setSnackBar({variant: "success", content: "勤怠を承認しました", open: true})
      setLoading(false)
    }
      )
  }catch (e){
    console.log(e.message);
  }

}


  useEffect(() => {
    try {
      dispatch({type: "FETCHING"});
      fetchManageAttendance()
      .then((res) => {
      dispatch({type: "FETCH_END",
      payload: res.data.attendances
    })
  })
    }catch (e){
      console.log(e.message);
    }
  },[]);

  return useMemo(() => {

  return(
      <>      
      <div style={{ height: 450, width: '95%' }}>
        <Stack sx={{my:1}} direction="row">
        {filter ? 
          ""
          :
            <SelectDate 
            list={state.attendanceData}
            setList={setList}
            />
        }

        <Box  style={{marginLeft:"auto"}}>
        <Stack direction="row" alignItems="center">
            <Switch
              checked={filter}
              onChange={() => setFilter(!filter)}
            />
            <Typography variant="subtitle1">未承認のみ</Typography>
            <Button 
            style={{marginLeft:"auto"}}
            variant="contained" 
            color="success"
            // disabled={(checked.length == 0 || loading)}
            onClick={() => 
              {if (window.confirm("選択中の勤怠を承認しますか？"))
              {approveTimecard()}
            }}
            endIcon={loading ? <CircularProgress sx={{width: "1rem", height: "1rem"}} />:""}
            >
            　　　承　認　　　
        </Button>
          </Stack>
          

        </Box>

        </Stack>
          <AttendanceGraph 
            state={state.fetchState} 
            list={filter ? state.attendanceData.filter(l => !l.confirmed) : list}
            handleCheck={handleCheck}
          />

      </div>

      
      </>

    )
  },[list,filter,state,checked])
}