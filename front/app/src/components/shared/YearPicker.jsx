import React, { useState, useEffect } from 'react';

import { autocompleteClasses, Chip, Grid, IconButton, ListItemIcon, Paper, Stack, Typography } from "@mui/material"
import { experimentalStyled as styled } from '@mui/material/styles';
import { DefaultModal } from './DefaultModal';
import { Box } from '@mui/system';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const inputStyle={
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
  
const thisYear = new Date().getFullYear();
const years = Array.from(Array(6), (k,v) => (-3+v)+thisYear)

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const style = {
    "box-shadow": 0,
    "background-color": "gray",
    "border": "solid 1px rgba(100,100,100,.6)"
  }



  
export const YearPicker = ({
    handleChange
}) => {


const [open, setOpen] = useState(false)

  
const content = <div>
   
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {years.map((year, index) => (
          <Grid item xs={2} sm={6} md={6} key={index}>
          
            <Item 
                id={year}
                style={{style}} 
                value={year}
                onClick={(e)=>{
                    handleChange(e)
                    setOpen(false)
                }
                }>{year}</Item>
           
          </Grid>
        ))}
      </Grid>
    </Box>



  
</div>


    return (
    <>
    <IconButton>
        <DateRangeOutlinedIcon onClick={()=>setOpen(true)}/>
    </IconButton>
        <DefaultModal
        content={content}
        open={open}
        setOpen={setOpen}
        inputStyle={inputStyle}
        />
    </>

    )



}