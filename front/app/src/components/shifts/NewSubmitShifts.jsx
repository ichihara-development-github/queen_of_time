import { Button, Chip, CircularProgress, Divider, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SubmitFeed } from "../../components/shifts/SubmitFeed";
import { sendShifts, submitShifts } from "../../apis/shifts";
import React, { useContext, useEffect, useMemo, useState } from "react";

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { getMonAndDate } from "../../lib/calcDate";
import { fetchNewShifts } from "../../apis/shifts";
import { SnackbarContext } from "../../contexts/snackBar";

const style = {
    zIndex:100, 
    backgroundColor:"white",
    width:"100%", 
    height: "100%",
    position:"absolute",
    top:0

}

const chipStyle = {
    position: 'fixed',
    bottom: 30,
    left: 20,
    zIndex:200 
}

export const NewSubmitShifts = ({
    times,
    list,
    setList
}) => {
 
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const sb = useContext(SnackbarContext)
    
    const sendNewShifts = (e) => {
        e.preventDefault();
        if(!window.confirm("シフトを提出しますか？")){return false}
        sendShifts(list)
        .then(res => {
            if(res.status ===201){
                setOpen(false)
                setLoading(false)
                sb.setSnackBar({open: true, variant:"success",content:"シフトを提出しました。"})        
            }
        }
            )
    }

    const NewShifts = () => {
        
            return(
            <>
            <Box style={style}>
            {list.length > 0 ?
            <form  onSubmit={e=>sendNewShifts(e)}>  
            <List style={{height:450,overflow:"scroll"}}>
                {list.map((elm,index) => 
                <div key={index}>
                    <ListItem sx={{height:60}}>
                        <SubmitFeed
                            elm={elm}
                            times={times} 
                            list={list} 
                            setList={setList}
                        />
                    </ListItem>
                    <Divider/> 
            
        
                </div>
                )}
            </List>
                <Button
                fullWidth
                type="submit" 
                color="success" 
                variant="contained" 
                margin="normal"
                endIcon={loading &&<CircularProgress/>}
                onClick={(e)=> {sendNewShifts(e)}}>
                    提　出 
                </Button>
                </form>
        
        :
        <Typography variant="h5">
            現在提出可能なシフトはありません
        </Typography>
            }

        </Box>
        <Chip
            style={chipStyle}
            onClick={()=>setOpen(!open)}
            size="medium"
            label="戻る"
            variant="outlied"
                />  
            </>
        )
    }


   
    useEffect(() => {     
        fetchNewShifts()
        .then(res => {
            setList(res.data.shifts)
    })
       

    },[])
    
    
  
    return useMemo(()=> {

        return (
      <>
      {
          open?
          <NewShifts/>
          :
          <Chip
          sx={chipStyle}
          onClick={()=>setOpen(!open)}
          size="medium"
          label="新規提出"
          color="secondary" 
          variant="contained" 
          icon={<AddBoxOutlinedIcon/>}
      />  
      }
      </>    
    )
    },[open])



}
