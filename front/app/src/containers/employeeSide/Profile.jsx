import React, { useState, useEffect, useContext } from "react";
import { Paper } from "@mui/material"
import { fetchProfile, sendProfile } from "../../apis/config"
import { STYLE_2 } from "../../components/const"
import { NewEmployeeForm } from "../../components/employees/NewEmployeeForm"
import { SnackbarContext } from "../../contexts/snackBar";
import { imageUploder } from "../../lib/imageUploader";
import { v4 as uuid } from "uuid";

export const Profile = () => {

    const [profile, setProfile] = useState() 
    const sb = useContext(SnackbarContext);
    
    const sendParams = (params)=> {
       
        try {
            sendProfile(params)
            .then(res=> {
              if(res.status !== 200){
                return
              }
              sb.setSnackBar({open: true, variant:"success", content: "プロフィールを編集しました。"})
              if(params.image){
                const imageUrl = uuid() || params.imageUrl;
                imageUploder(params.image[0], imageUrl, sb)}
              })
          }
          catch(e){console.log(e.message)}
        

    }

    useEffect(() => {
        fetchProfile()
        .then(res => {
            setProfile(res.data)
        })
       
    },[])


    return (
    
      <Paper sx={{margin:"0 auto", maxWidth:500, p:1, ...STYLE_2}}>
          
          {profile && <NewEmployeeForm
            sendParams={sendParams}
            requestStatus="OK"
            profile={profile}
          />
          }
         
      
        {/* <form onSubmit={handleSubmit(onSubmit)}>
            <Stack 
            sx={{py:2}}
            direction="row" 
            alignItems="center"
            spacing={2} 
            justifyContent="end"
            >
            <Typography varinat="h6">責任者： employee</Typography>
            <TextField label="組織名" className="mui-input"/>
            </Stack>
        </form> */}
        </Paper>
    )
    
}