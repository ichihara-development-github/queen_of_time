import React, {useEffect, useState, useContext} from "react";
import { Button, CircularProgress, Slider, Stack, TextField, Typography } from "@mui/material";

import { SliderScales } from "../../components/const";
import { SelectMember } from "../chats/SelectMember";
import { fetchAssignMember } from "../../apis/shifts";
import { getMonAndDate } from "../../lib/calcDate";

import { ConfigContext } from "../../contexts/config";

const initialState = {
    id:"",
    name:"従業員が選択されてません。",
    attendance_time: 9,
    leaving_time: 19,
    comment: "",
    confirmed: true,
    rest: false

}


    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: "95%",
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  
  
export const NewShiftForm = ({
    sendShiftParams,
    date,
    loading

}) => {

    const [params, setParams] = useState(initialState);

    const handleChange = (e, newValue) => {
        setParams({...params,
            attendance_time: newValue[0],
            leaving_time: newValue[1]})
    }

   const  handleSubmit = (e) => {
        setParams({...params, date: date})
        e.preventDefault()
        sendShiftParams(params)
    }

    const orgConfig = useContext(ConfigContext);
     
    useEffect(() => setParams({...params, date: date}),[date])


    return (
        <>
        <form onSubmit={handleSubmit}>
        <Stack style={{width:"90%", margin:"auto"}} spacing={2}>
            <label>
            <SelectMember
            style={style}
            params={params}
            setParams={setParams}
            fetch={()=>fetchAssignMember(date)}
        />

        </label>
          <Typography variant="h6">
            {params.name}
        </Typography>
         <Typography variant="h6">
            {getMonAndDate(date,"/")}
        </Typography>

        <Slider
            value={[params.attendance_time, params.leaving_time]}
            onChange={handleChange}
            marks={SliderScales}
            valueLabelDisplay="auto"
            min={orgConfig.params.open}
            max={orgConfig.params.close}
            step={0.5}
        />

        <TextField  
            margin="normal"
            fullWidth
            defaultValue="備考"
            multiline
            rows={3}
            onChange={(e)=>setParams({...params,comment: e.target.value})}
        />

        <Button
            fullWidth
            disabled={params.id ===""}
            type="submit"
            variant="contained"
            color="success"
            endIcon={loading? 
                <CircularProgress style={{width:"1.2rem", height: "1.2rem"}}/> :
                 ""}
        >
            シフトを作成する
        </Button>
       

        </Stack>


        </form>
    </>
       
    )

}