import React, { useState } from "react";
import { Button, Divider, Stack }  from "@mui/material"
import Typography from '@mui/material/Typography';
import { DefaultModal } from "../shared/DefaultModal";
import { formattedTime } from "../../lib/calcDate";
import { BASE_STYLE, STYLE_2 } from "../const";
import { IrregularTime } from "./irregularTime";
import { timeConvert } from "../../lib/calcTimes";

const style= {
textAlign: "center",

}

export const DetailModal = ({params}) => {

    const [open, setOpen] = useState(false);

    const content = (
      <div style={style}>
          <Typography sx={{py:1}} variant="h4">
          {params.name}
        </Typography>
        <Divider />
    
        <Stack 
          sx={{my:2}}
          alignItems="center"
          spacing={3} 
          direction="row"
          divider={<Divider orientation="vertical" flexItem/>}
        >
        <Typography variant="h6">
         {params.date.slice(-2)}日
       </Typography>
       <Typography variant="h6">
         出勤 <br />
         {formattedTime(params.attendance_time)}
       </Typography>
       <Typography variant="h6">
         退勤 <br /> 
         {formattedTime(params.leaving_time)}
       </Typography> 
       <Typography variant="h6">
         休憩 <br />
         {params.rest_time} 分
       </Typography>
     </Stack>
     <Typography style={{fontWeight: "bold"}} variant="h6"> 
      労働時間 <br />
      {timeConvert(params.working_time, "full")} 
    </Typography> 
     <IrregularTime params={params} />

     

   
      </div>
   
     
    )

    return (
        <>
        
         <DefaultModal
            open={open}
            setOpen={setOpen}
            content={content}
          />
       

        <Button onClick={() => setOpen(true)} variant="contained" color="primary" >
        詳 細
        </Button>
        
        </>
       
    )



}
