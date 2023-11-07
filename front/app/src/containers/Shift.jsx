import { Button, Chip, CircularProgress, IconButton, Slider, Switch, Typography } from "@mui/material";
import React, { useEffect, useState, useContext, useMemo } from "react";
import SendIcon from '@mui/icons-material/Send';
import { assignShift, createShift, deleteShift, determineShifts, fetchSubmittedShifts, fetchUnapproved, fetchUnapprovedShift } from "../apis/shifts";
import { PageLoadingCircle } from "../components/shared/commonPatrs";
import { BadgeContext } from "../contexts/badge";
import { SnackbarContext } from '../contexts/snackBar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Stack } from "@mui/system";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ShiftEdit } from "./ShiftEdit";
import { BUSSINESS_HOUR, dayOfWeek, SliderScales, STYLE_2 } from '../components/const';
import { DefaultModal } from "../components/shared/DefaultModal";
import { NewShiftForm } from "../components/shifts/NewShiftForm";
import { NewShiftModal } from "../components/shifts/NewShiftModal";
import { getMonAndDate, renderMonth } from "../lib/calcDate";
import { ConfigContext } from "../contexts/config";
import { calcAssignCount } from "../lib/calc";
import { NewEmployeeForm } from "../components/employees/NewEmployeeForm";
import { YearPicker } from "../components/shared/YearPicker";
const initialState = {
  id: "",
  name:"",
  attendance_time:0,
  leaving_time:0
}


const shiftTerms = [
  {id: "early",label:"朝",start:9,end:12,color:"orange"},
  {id: "mid",label:"日勤",start:12,end:16,color:"ivory"},
  {id: "late",label:"夜",start:16,end:20,color:"skyblue"}
]

const today = new Date()
const initialPeriod = [today.getFullYear(),today.getMonth()+1]

export const Shift = ({
 
}) => {
   
const [value, setValue] = useState();
const [loading, setLoading] = useState(false)
const [selectedShift, setSelectedShift] = useState(initialState);
const [unapproved, setUnapproved] = useState(false);
const [open, setOpen] = useState(false);
const sb = useContext(SnackbarContext);
const badge = useContext(BadgeContext);
const [days, setDays] = useState([])
const [period, setPeriod] = useState(initialPeriod);
 

  
const shiftParams = (at,lv, con) => {

  return{
    unsubmitted:{text: unapproved ? "×": "未提出",style: {backgroundColor: "white", color: "gray"}},
    rest:{text: `${"未) ".repeat(Number(!con))} 休`,style: {backgroundColor: "rgba(100,100,100,.2)"}},
    attend: {text: `${"未) ".repeat(Number(!con))}${at}-${lv}`,style: {backgroundColor: "pink"}}
}
}

const undo = () => {
  fetchSubmittedShifts(period)
  .then(res =>  setValue(res.data.shifts))
}

const unassignShift = (e, id) => {
  e.preventDefault();
  if(!id){return}
  if(window.confirm(
    `シフトを削除しますか？`
    )){    
        setLoading(true)
        deleteShift(id)
        .then(res => {
              if(res.status !== 200){ return sb.setSnackBar({open: true, variant:"error",content:"シフトを確定できませんでした。"}) }
              setValue(value.filter(v=>v.id!==id))
              setOpen(false)
        
              sb.setSnackBar({open: true, variant:"success",content:"シフトを削除しました。"})
              // badge.setBadge({
              //   ...badge.badge, shift: res.data.shifts.filter(elm => elm.confirmed == false).length
              // })
        })
        setLoading(false)
      }
    }

  
const updateShifts = (params) => {

}

const handleSwitch = () => {
  console.log(value)
  unapproved ? 
  fetchSubmittedShifts(period)
  .then((res) => {
  setValue(res.data.shifts.sort((ago, next)=>ago.date - next.date))
  renderMonth(period)
})
  :
  setValue(value.filter(v => !v.confirmed))
  setUnapproved(!unapproved)
}

const orgConfig = useContext(ConfigContext)

const collectShift = (params) => {
  const ids =  [...new Set(value.map(s => s.employee_id))]
  const list = []
  ids.map(id => {
    list.push(params.filter(s => s.employee_id == id));
  })
  
  return list;
}

const renderShift = (shift,employee,elm, i) => {
  let onClick = "";
  let params = "";

  if(!shift){
    params = shiftParams("","",false).unsubmitted
    onClick = () => shiftClick(null,{employee_id: employee.employee_id,date: elm.date, name: employee.name})
  }else{
    onClick = () => shiftClick(shift)
    shift.rest ?
    params = shiftParams("","",shift.confirmed).rest
    :
    params = shiftParams(shift.attendance_time,shift.leaving_time,shift.confirmed).attend
  }

  return (
    <TableCell 
    key={i} 
    style={params.style}
    onClick={()=>onClick()}
  >{params.text}</TableCell>
  )
}

const handleValue = (e, newValue, activeThumb) => {
  
  if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      // selectedShift.attendance_time = Math.min(newValue[0], e.target.value[1] - orgConfig.params.min_work_time)
      setSelectedShift({...selectedShift,attendance_time: Math.min(newValue[0], e.target.value[1] - orgConfig.params.min_work_time)});
    } else {
      setSelectedShift({...selectedShift,leaving_time: Math.max(newValue[1], e.target.value[0] + 2)})
      // setSelectedShift(change);
    }
  }

  const handleSelectMonth = (type) => {
    switch (type){
      case "ahead":
        setPeriod([period[0] + Math.floor(period[1] / 12),(period[1] % 12)+1])
        return
      case "back":
        const next = 12-((12- (period[1] -1)) % 12)
        setPeriod([period[0] - Math.floor(next /12),next])
        return
      }
    } 

  const handleChange = (e) => {
    setPeriod([Number(e.target.id),6])
  }

 

const handleSubmit = (e) => {
  e.preventDefault();
  if(window.confirm(
    `シフトを確定しますか？\n※編集された場合従業員に通知されます。`
    )){
  (selectedShift.id ? assignShift(selectedShift) : createShift(selectedShift))
  .then(res => {
        if(res.status !== 201){ return sb.setSnackBar({open: true, variant:"error",content:"シフトを確定できませんでした。"}) }
        const copy = value.slice().filter(l => l.id !== selectedShift.id)
        setValue([...copy,res.data.shift])
        sb.setSnackBar({open: true, variant:"success",content:"シフトを確定しました。"})
        setOpen(false)
  })

  }

}

const handleDetermine = (e) => {
  if(value.length === 0){return sb.setSnackBar({open: true, variant:"error",content:"当月の未承認シフトがありません"})}
  determineShifts(value)
  .then(res => {
        if(res.status !== 200){ return sb.setSnackBar({open: true, variant:"error",content:"シフトを確定できませんでした。"}) }
        setValue(res.data.shifts.sort((ago, next)=>ago.date - next.date))
        sb.setSnackBar({open: true, variant:"success",content:"シフトを確定しました。"})
  })
  
  }


const shiftClick = (shift,params) => {
  console.log("click")
  
  if(shift){
      setSelectedShift(shift)
  }else{
    const newShiftParams = {
      employee_id: params.employee_id,
      date: params.date,
      name: params.name,
      attendance_time: orgConfig.params.open,
      leaving_time: orgConfig.params.close
    }
    setSelectedShift(newShiftParams)
  }
  
  setOpen(!open)
  
}

const shiftCount = (index) => {
  const time  = BUSSINESS_HOUR(orgConfig.params.open, orgConfig.params.close);
  
  const shift = value.filter(elm => new Date(elm.date).getDate() == days[index].date.getDate())
  return calcAssignCount(shift,time)
}



const content = 
  <form onSubmit={(e)=>handleSubmit(e)}>
  <Stack style={{width:"90%", margin:"auto"}} spacing={2} >
  <Typography variant="h6">
      {getMonAndDate(new Date(selectedShift.date),"/")}
  </Typography>
    <Stack direction="row" justifyContent="space-between">
    <Typography variant="h6">
      {selectedShift.name}
  </Typography>
  {selectedShift.confirmed ?
    <Chip 
      variant="filled"
      color="success"
      label="承認済"
      />     :
      <Chip 
      variant="outlined"
      label="未承認"
      />   
   } 
    </Stack>
    


  <Slider
      name={selectedShift.id}
      value={[selectedShift.attendance_time, selectedShift.leaving_time]}
      onChange={(e, newValue, activeThumb)=>handleValue(e, newValue, activeThumb)}
      marks={SliderScales}
      valueLabelDisplay="auto"
      min={orgConfig.params.open}
      max={orgConfig.params.close}
      disabled={selectedShift.rest}
      step={0.5}
      style={{"margin": "50px 0"}}
  />
   <Switch 
        checked={selectedShift.rest}
        onChange={()=>{setSelectedShift({...selectedShift,rest: !selectedShift.rest})}}
   />休
  <Button
      fullWidth
      disabled={selectedShift.id ===""}
      type="submit"
      variant="contained"
      color="success"
      endIcon={loading? 
          <CircularProgress style={{width:"1.2rem", height: "1.2rem"}}/> :
           ""}
  >
      シフトを作成する
  </Button>
  <Button
      fullWidth
      disabled={!selectedShift.id}
      type="button"
      variant="contained"
      color="error"
      endIcon={loading? 
          <CircularProgress style={{width:"1.2rem", height: "1.2rem"}}/> :
           ""}
      onClick={(e)=>unassignShift(e,selectedShift.id)}
  >
      削除
  </Button>
 

  </Stack>


  </form>;

useEffect(() => {
  try {
      fetchSubmittedShifts(period)
      .then((res) => {
      const shifts = unapproved ? res.data.shifts.filter(s=> s.confirmed == false) : res.data.shifts
      setValue(shifts.sort((ago, next)=>ago.date - next.date))
      setDays(renderMonth(period))
})
} 
catch(e){
  console.log(e)
}

},[period])


  return (
    <>
  
    {
    value ? 

    <div>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={content}
      />
    
       <Stack direction="row"alignItems="center" justifyContent="space-between">
           <div>
           <h2>{period[0]}-{period[1]}</h2>
           <IconButton onClick={() => handleSelectMonth("back")}>
            <ArrowBackIosNewIcon />
           </IconButton>  
           <YearPicker  handleChange={(e)=>handleChange(e)}/>
         <IconButton  onClick={() => handleSelectMonth("ahead")}>
              <ArrowForwardIosIcon />
        　</IconButton>
        <Switch 
                checked={unapproved}
                onChange={()=>handleSwitch()}
          />
          未承認のみ
            </div>
          <Button  
                disabled={loading}
                endIcon={loading ? <CircularProgress style={{width: "1.2rem", height:"1.2rem"}}/>:<SendIcon color="inherit"/>}
                size="medium"
                variant="contained" 
                onClick={(e)=> {if(window.confirm(
                  `表示されているシフトを確定しますか？\n※編集された場合従業員に通知されます。`
                  )){handleDetermine(e)}}}
                >
            　　　全て承認　　　
          </Button>

        </Stack>
      

      <TableContainer style={{maxHeight: 600}}>
            <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                  style={{ minWidth: 100 }}
                >
                  <span>従業員名</span>
              </TableCell>
              {days.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.date.getDate().toString()}{column.dow}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
          collectShift(value).map((row,i) => (
            <TableRow key={i}>
              <TableCell
                  key={i}
                >
                  {row[0].name}
                </TableCell>
             {days.map((elm,i) =>      
              renderShift(row[row.findIndex(e => new Date(e.date).getDate() == elm.date.getDate())],row[0],elm,i)
              )}  
            </TableRow>
          
            ))
            
          }

           {shiftTerms.map(term =>{
            
          return (
            <TableRow key={term.label}>
            <TableCell
                style={{"background":term.color}} 
              >{term.label}
             </TableCell>
             
            {days.map((_,i) =>
              (<TableCell
                style={{"background":term.color, color: "red".repeat(Number(!shiftCount(i)[term["id"]]))}} 
              >{shiftCount(i)[term["id"]]}
             </TableCell>)
            )
          }
           </TableRow>
          )
           
            }
           )}
    
        </TableBody>
        </Table>
        </TableContainer>
      {/* <ShiftEdit
        value={value}
        loading={loading}
        setLoading={setLoading}
        undo={undo}
        updateShifts={updateShifts}
        unassignShift={unassignShift}
      /> */}
    </div>
     :
    <PageLoadingCircle />
}

    </>

)

}
