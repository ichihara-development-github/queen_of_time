import React, { useEffect, useContext, useReducer, useState } from 'react';
import { DataGrid, GridColDef, jaJP} from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

import SendIcon from '@mui/icons-material/Send';
import { SliderScales, STYLE_2 } from "../components/const";

import { CircularProgress, IconButton, ListItemSecondaryAction, Stack, Typography } from '@mui/material';

import {AssignCount} from "../components/shifts/assignCount"


import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

import { SnackbarContext } from '../contexts/snackBar';
import { ConfigContext } from '../contexts/config';
import { DefaultModal } from '../components/shared/DefaultModal';
import { NewShiftModal } from '../components/shifts/NewShiftModal';

import { SelectDate } from '../components/shared/SelectDate';
import { getMonAndDate } from '../lib/calcDate';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { myShifts } from '../urls/urlList';
import { set } from 'react-hook-form';

//----------------shiftrange----------------


const reducer = (state, action) => {
    return action;
}
let content = "";
const inputStyle = {
  padding: "50% 20px",
  maxHeight: "300px",
}

export const ShiftEdit = ({
  value, 
  loading,
  undo,
  updateShifts,
  unassignShift,
  setLoading
}) => {

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const [date, setDate] = useState(new Date())
  
  const [state, dispatch] = useReducer(reducer, value);

  const sb = useContext(SnackbarContext);
  const orgConfig = useContext(ConfigContext);

 
  const renderTable = (row) => {
    const items = [];
    for (const [key, value] of Object.entries(row)){
    items.push(
        <TableCell 
          component="th" 
          scope="row"
          onClick={()=>editShift(row.id,key)} >
        {value}
       </TableCell>
    )
    }
    return items;
  }


  const editShift = (id, key,value) => {
    content=(
      <div>
        <h2 >{id}</h2>
       <Slider
                    className={"シフト"}
                    name={`${key}`}
                    value={[10,18]}
                    onChange={(e, newValue, activeThumb)=>handlevalue(e, newValue, activeThumb)}
                    marks={SliderScales}
                    valueLabelDisplay="auto"
                    min={orgConfig.params.open}
                    max={orgConfig.params.close}
                    step={0.5}
                />
      </div>
     
              )
              setOpen(true)
              return(
              <DefaultModal 
                open={open}
                setOpen={setOpen}
                content={content}
                inputStyle={inputStyle} />
              )


            

  }
  


  const handleClick = (comment) => {
    content = comment
    setOpen(true)
  }

  
  const handlevalue = (e, newValue, activeThumb) => {
  
    if (!Array.isArray(newValue)) {
        return;
      }
      
      const change = state.slice()
      const i = change.indexOf(change.find(v => v.id == [e.target.name]))

      if (activeThumb === 0) {
        change[i].attendance_time = Math.min(newValue[0], e.target.value[1] - orgConfig.params.min_work_time)
        dispatch(change);
      } else {
        change[i].leaving_time = Math.max(newValue[1], e.target.value[0] + 2)
        dispatch(change);
      }
    }


    const columns: GridColDef[] = [
        {
        field: 'confirmed',
        headerName: '承認済み',
        width: 50,
        renderCell: (params) => <span style={{color:"green"}}>{"(確)".repeat(Number(params.row.confirmed))}</span>},
        {
          field: 'action',
          headerName: '削除',
          width:80,
          renderCell: (params) => 
          <Button 
            disabled={loading}
            variant="outlined" 
            color="error" 
            onClick={()=> {if (window.confirm("シフトを削除しますか？")){
              unassignShift(params.row.id)}}
              }>
            削除
          </Button>
        },
        // {field: 'date', headerName: '日時' },
        {field: 'name', headerName: '名前' },
        {field: "attendance_time", headerName:"出", width:30},
        {field: "leaving_time", headerName:"退", width:30},
        {
            field: 'shift',
            headerName: 'Shift',
            width: 500,
            disableClickeBubbling: true,
            renderCell: (params) => params.row.rest?
            "休み":
            
                <Slider
                    disabled={params.row.confirmed}
                    className={"シフト"}
                    getAriaLabel={() => 'Minimum distance'}
                    name={`${params.id}`}
                    value={[params.row.attendance_time,params.row.leaving_time]}
                    onChange={(e, newValue, activeThumb)=>handlevalue(e, newValue, activeThumb)}
                    marks={SliderScales}
                    valueLabelDisplay="auto"
                    min={orgConfig.params.open}
                    max={orgConfig.params.close}
                    step={0.5}
                />
          },
          {
            field: 'comment',
            headerName: '備考',
            width:50,
            renderCell: (params) => 
            params.row.comment && <IconButton onClick={()=>handleClick(params.row.comment)}>
                                    <InsertCommentOutlinedIcon color="primary"/>
                                
                                  </IconButton>
          }
      ];

        return (
            <>
        <div>  
          
        <Switch 
                checked={edit}
                onChange={()=>setEdit(!edit)}
              />
          {edit ? 
          <Stack direction="row">
            <Button variant="contained" color="warning" onClick={()=>undo()}>
              最初に戻す
          </Button>   

          <div style={{marginLeft: "auto"}}>
        
                <NewShiftModal 
                  orgConfig={orgConfig}
                  state={state}
                  dispatch={dispatch}
                  date={date}
                  loading={loading}
                  setLoading={setLoading}
                  />
             
            <Button  
                disabled={loading}
                endIcon={loading ? <CircularProgress style={{width: "1.2rem", height:"1.2rem"}}/>:<SendIcon color="inherit"/>}
                size="medium"
                variant="contained" 
                onClick={(e)=> {if(window.confirm(
                  `${getMonAndDate(date)}のシフトを確定しますか？\n※編集された場合従業員に通知されます。`
                  )){updateShifts(state)}}}
                >
            　　　決定　　　
          </Button>
              </div>    

  
          </Stack>
          :
                ""}
        
      </div>
          <div style={{ height: 450, width: '100%', margin: 10 }}>
            <Stack direction="row" spacing={2}>
              <SelectDate 
                list={value}  
                setList={dispatch}
                setDate={setDate}
              />
            
              <AssignCount  params={state}/>
           
            </Stack>
            
              <DataGrid
                style={STYLE_2}
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
              />
          </div>
          <DefaultModal 
            open={open} 
            setOpen={setOpen} 
            content={content}
            />
          </>
        );
      

}
