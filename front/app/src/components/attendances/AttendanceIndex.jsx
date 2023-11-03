import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState, useMemo } from "react"
import { formattedTime } from "../../lib/calcDate";
import { DetailModal } from "./DetailModal";
import { DefaultModal } from "../shared/DefaultModal";
import { BASE_STYLE, STYLE_2 } from "../const";
import { IrregularTime } from "./irregularTime";
import { timeConvert, totalingTimes } from "../../lib/calcTimes";


export const AttendanceIndex = ({
    list,
    handleCheck,
    checked
}) => {

  const [open, setOpen] = useState(false);
  const calc = useMemo(() => {
    return totalingTimes(list)
  },[list]);
  console.log(list)
  


const content = (
  <>
  <Stack 
    sx={{my: 2}}
    spacing={2} 
    direction="row" 
    alignItems="center"
    divider={<Divider orientation="vertical" flexItem/>}
    >

    <Typography variant="h6"> 
      総労働時間 <br />
      {timeConvert(calc.totalWorkingTime, "full")} 
    </Typography> 
  
    <Typography variant="h6"> 
      出勤日数 <br />
      {calc.workDate} 日
    </Typography> 
  
  
</Stack>

 <IrregularTime params={calc} />
</>

)

    return (
    <>
    <div style={{width: '100%', margin:"40px 0" }}>
      <TableContainer sx={{py:2}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
          <TableCell></TableCell>
            <TableCell align="right">日</TableCell>
            <TableCell align="right">出</TableCell>
            <TableCell align="right">退</TableCell>
            <TableCell align="right">休</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {list.map((l,index) => (
            <TableRow
              key={index}
              style={STYLE_2}
            >
        <TableCell sx={{padding:0}} align="center">
        <FormGroup>
            <FormControlLabel
            control={
              <Checkbox
                        checked={!!checked.find(v => v.id === l.id)}
                        id={l.id.toString()} 
                        onChange={(e)=> handleCheck(e)}
                        disabled={l.confirmed}
                        />} 
            />
          </FormGroup>
        </TableCell>     
              <TableCell sx={{padding:0}} align="center">
                {l.date.slice(-2)}日
              </TableCell>
              <TableCell align="right">
              <div>
                <Typography variant="subtitle1" 
                  style={{color: "red"}}>
                    {formattedTime(l.updated_attendance_time,"(申)")}
                </Typography>
                <Typography variant="subtitle1">
                    {formattedTime(l.attendance_time)}
                </Typography>
              </div>
              </TableCell>
              <TableCell align="right">
              <div>
                <Typography variant="subtitle1" 
                  style={{color: "red"}}>
                    {formattedTime(l.updated_leaving_time,"(申)")}
                </Typography>
                <Typography variant="subtitle1">
                    {formattedTime(l.leaving_time)}
                </Typography>
              </div>
              </TableCell>
              <TableCell align="right">
              <div>
                <Typography variant="subtitle1" 
                  style={{color: "red"}}>
                    {l.updated_rest_time}
                </Typography>
                <Typography variant="subtitle1">
                    {l.rest_time}
                </Typography>
              </div>
              </TableCell>
              <TableCell>
                <DetailModal params={l} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <Button 
      sx={{marginBottom: "100px"}}
      fullWidth
      color="primary"
      variant="contained"
      onClick={() => setOpen(true)}
    >
      月ごと集計
    </Button>
    <DefaultModal
      open={open}
      setOpen={setOpen}
      content={content}
     />
      </>
    )
}
  
  