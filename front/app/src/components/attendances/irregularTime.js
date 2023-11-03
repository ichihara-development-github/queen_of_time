import React from "react";
import { Stack, Typography } from "@mui/material";
import { timeConvert } from "../../lib/calcTimes";
import { BASE_STYLE, STYLE_2 } from "../const";

export const IrregularTime = ({params}) => (
 
<Stack spacing={2}>
  { console.log(params)

}

 <div>
    <Typography style={BASE_STYLE} variant="h6"> 
      残業時間
    </Typography> 
    <Typography style={STYLE_2} variant="h6">
      {timeConvert(params.overtime,"full")} 
    </Typography> 

 </div>

 <div>
    <Typography style={BASE_STYLE} variant="h6"> 
      深夜時間
    </Typography> 
    <Typography style={STYLE_2}variant="h6">
      {timeConvert(params.midnight_time,"full")} 
    </Typography> 

 </div>
 <div>
    <Typography style={BASE_STYLE} variant="h6"> 
      深夜残業時間
    </Typography> 
    <Typography style={STYLE_2} variant="h6">
     {timeConvert(params.midnight_overtime,"full")} 
    </Typography> 

 </div>

</Stack>

)