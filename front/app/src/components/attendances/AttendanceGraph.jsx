import React from "react"

import { DetailModal } from "./DetailModal";

import { DataGrid, GridColDef, jaJP } from '@mui/x-data-grid';
import styled from "styled-components"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PageLoadingCircle } from "../shared/commonPatrs";
import { Box } from "@mui/system";
import { formattedTime } from "../../lib/calcDate";

const SCALE = 4;

const Graph = styled.span`
height:30px;
opacity:.5;
background: ${(props) =>props.bgColor};
width: ${(props) => SCALE*(props.width)}px;
margin-left: ${(props) => SCALE*(props.margin)}px;
text-align: center;
color: black;
font-weight:bold
`;


export const AttendanceGraph = ({
    state, 
    list,
    handleCheck
  }) => {

  let config = 6;
  
  
  //----------------グラフ関連---------


  const timeToGraph =(time) => {
   
    const calc = (elm) => {
      return (
        Math.floor(elm/15)
      )

    }
    
    return ({
      time: calc(time.working_time),
      start: calc(formattedTime(time.attendance_time)) - (4*config),
      rest: calc(time.rest_time),
      overTime: calc(time.overtime)
    })
  }

  const attendanceGraph = (params) => {

    var result = timeToGraph(params)
    var time = result.time;
    var space = result.start;
    var overTime = result.overTime
    var rest = result.rest

    return(
        <>
          <Graph className="graph" bgColor="royalblue" width={time/2} margin={space}>{time/4}h</Graph>
          <Graph bgColor="gray" width={rest} />
          <Graph bgColor="royalblue" width={time/2} />
          <Graph bgColor="#f3a68c" width={overTime} />
        </>
    )
  }


  //------グラフ化-----------

    const columns: GridColDef[] = [
      {field: "confirmed", headerName:"承認", width: 60,
      renderCell: (params) => (
        <span style={{color:"green",fontWeight:"bold"}}>
          {params.row.confirmed && "承認"}
        </span>   
    )},
      {field: "check", headerName:"",width:150,
      renderCell: (params) => (
      <FormGroup>
        <FormControlLabel 
        control={
          <Checkbox color="success"
                    className="check"
                    id={params.row.id.toString()} 
                    name={params.row.name}
                    onChange={(e)=> handleCheck(e)}
                    disabled={params.row.confirmed}
                    />} 
                    label={params.row.name} 
                    />
       </FormGroup>
      )},
        
      {field: "date", headerName:"日時", width:100},
      {field: "attendance", headerName:"グラフ", width: 250,
      renderCell: (params) => 
        attendanceGraph(params.row)
      },

      {field: "attendance_time", headerName:"出", width:70,
        renderCell: (params) => 
        <div>
         <h5 style={{color: "red"}}>
         {formattedTime(params.row.updated_attendance_time,"(申)")}
          </h5>
          <h5>{formattedTime(params.row.attendance_time)}</h5>
        </div>
      },
        {field: "leaving_time", headerName:"退", width:70,
        renderCell: (params) => 
        <div>
          <h5 style={{color: "red"}}>
            {formattedTime(params.row.updated_leaving_time,"(申)")}
          </h5>
          <h5>  {formattedTime(params.row.leaving_time)}</h5>
        </div>},
        {field: "rest_time", headerName:" 休", width:40,
        renderCell: (params) => 
        <div>
         <h5 style={{color: "red"}}>
          {params.row.updated_rest_time}
        </h5>
          <h5>{params.row.rest_time || 0}　分</h5>
        </div>
      },
      {field: "detail", headerName:"", width: 80,
      renderCell: (params) => (
        <DetailModal params={params.row} formattedTime={formattedTime}/>
      )},
        {field: "comment", headerName:"備考"},
       
      ];

      return(
      <>  
          <Box sx={{height: "100%", position: "relative"}}>
          {state == 'OK' ?
            <DataGrid
            rows={list}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}

            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            />
            :
            <PageLoadingCircle/>
      }
       

            </Box>

           
      </>

    )
}