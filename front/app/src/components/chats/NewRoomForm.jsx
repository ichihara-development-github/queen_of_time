import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { fetchInviteEmployees } from "../../apis/room"
import { SelectMember } from "./SelectMember"
import { useState, useContext } from "react";
import { SnackbarContext } from "../../contexts/snackBar";

const initialState = {id: ""};

export const NewRoomForm = ({
    sendRoomParams,
    loading,
    setLoading
}) => {

    const [params, setParams] = useState(initialState);
    const sb = useContext(SnackbarContext)
  

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!params.id){
          sb.setSnackBar({open: true, variant:"error",content:"従業員が選択されてません。"})
          setLoading(false)
          return false
        }
        sendRoomParams(params)
        setParams(initialState)

    }

    return (
        <>   
         <Stack style={{width:"60%", height: "100%",margin:"0 auto"}} spacing={2}>
        <form onSubmit={handleSubmit} >
          <Typography variant="subtitle">
            個別チャットを作成します。
          </Typography>
        <h3>{params.name? params.name : "従業員を選択"}</h3>

        <SelectMember
            params={params}
            setParams={setParams}
            fetch={fetchInviteEmployees}
             />    
            

          <Button
            fullWidth
            color="primary" 
            variant="contained" 
            type="submit"
            loading={loading}
          >
              作成
          </Button>

        
          </form>

        </Stack>
       
         </>

    )
}