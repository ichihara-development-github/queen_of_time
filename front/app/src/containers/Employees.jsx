
import React, { useEffect, useReducer, useState, useMemo } from "react";
import { deleteEmployee, fetchEmployees } from "../apis/employees";

import {Link} from "react-router-dom";
import { employeesReducer, initialState} from "../reducers/empoyees";

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import { NewEmployeeModal } from "./NewEmployeeModal";
import { Stack, Grow, ImageListItem, ImageListItemBar, IconButton, ButtonBase, Paper, Divider, ListItemButton, ListItemAvatar, Avatar} from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import Switch from '@mui/material/Switch';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { TextField } from "@material-ui/core";
import { useTextFilter } from "../customeHooks/hooks";
import Skeleton from '@mui/material/Skeleton';

//----------------------icons-----------------------

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { imageSrc, REQUEST_STATUS, S3_ORIGIN, STYLE_2 } from "../components/const";



const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

const noSelectedStyle = {
  width:"100%",
  textAlign: "center"
}

const backButtonStyle = {
  postion: "absolute",
  bottom: 50,
  left: 20,
  zIndex: 1000
}

const displayIconStyle = {
  width:150,
  height:150,
}

const deleteMesssage = "従業員を削除しますか？\n※関連づくシフト・メッセージも削除されます"

export const Employees = () => {


const [state, dispatch] = useReducer(employeesReducer, initialState);
const [selected, setSelected] = useState();
const [index, SetIndex] = useState(false);
const [text, setText] = useState();

const filtered = useTextFilter(state.employeeList, "name",text);
const list = filtered.length > 0? filtered : state.employeeList

const handleDelete = () => {
  if(!window.confirm(deleteMesssage) ){
    return
  }else{
    deleteEmployee(selected.id)
    .then(res => {
      if(res.status !== 200){
        return}
      setSelected(null)
      dispatch({
        type: "FETCH_END", 
        payload: list.filter(l => l.id !== selected.id)
      })
      
    })
  }
 
}

const ShowImageList = () => (
  <Paper  sx={{ width: "50%"}}>
    
    <ImageList cols={3}>
    {
       list.map((elm,index) => 
     
        <ButtonBase key={index}>
        <ImageListItem onClick={()=>setSelected(elm)}>
        <Avatar 
            style={{width: 100,height:100}}
            src={imageSrc(elm)}
          />
      <ImageListItemBar
        title={elm.name}
      />
    </ImageListItem>
      
      </ButtonBase>
        )
    }
    </ImageList>

  </Paper>
)

const ShowList = () => (
  <List style={{ width: "50%",overflow:"scroll"}}>
     {list.map((elm,index) => 
      <ListItemButton
              key={index}
              sx={{width: 220}}
              selected={selected  && elm.id === selected.id}
              onClick={()=> setSelected(elm)}
            >
        <ListItemAvatar>
          <Avatar 
          sx={{width:50,height:50}} src={imageSrc(elm)} alt={elm.name} />
      
        </ListItemAvatar>
        <ListItemText primary={elm.name}/>
    </ListItemButton>
     )
    }
  </List>

)

const InformationDisplay = () => (
  
    selected ?
    <>
      <Stack 
        sx={{width: "100"} } 
        spacing={2} 
        alignItems="center"
      >
      <Avatar 
            style={displayIconStyle}
            variant="square" 
            src={imageSrc(selected)}
          />
            <Typography sx={{my:2}} variant="h4">{selected.name}</Typography>
            <Divider/>
      </Stack> 
          <Box>
            <Typography component="h5">合計出勤数：　{selected.attendances}</Typography>
            <Typography component="h5">欠勤数：　{selected.absent}</Typography>
            {/* ||= */}
            <Typography component="h5">シフト提出率：　{selected.shift_submit_rate}</Typography>
            <Typography component="h5">次回出勤日：　{selected.recent_shift || "未定"}</Typography>
            <Typography component="h5">システム登録日：　{selected.created}</Typography>
          </Box>

     <div style={{position: "absolute", bottom:0}}>

         
     <Button 
       color="error" 
       variant="contained"
       size="large"
       onClick={()=>handleDelete()}
       disabled={!selected.id || selected.chief}
     >
       削除
     </Button>

     </div>
    </>
  
        :
    <Box style={noSelectedStyle}>
      <Typography style={{marginTop: 220}} variant="h5">
        従業員を選択してください。
    </Typography>
    </Box>       
)

    useEffect(() => {
     
      try {
        dispatch({type: "FETCHING"});
        fetchEmployees()
        .then(res => {
        dispatch({
          type: "FETCH_END",
          payload:  res.data.employees
        })
        })

      }catch (e){
        console.log(e.message);
      }

    },[]);


    return (
        <> 
      <Box sx={{px:2, height: 500 }}>
    
        <Stack sx={{my:2}} direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
          <ImageOutlinedIcon/>
            <Switch
              checked={index}
              onChange={()=> SetIndex(!index)}
            />
            <ListOutlinedIcon />
          </Stack>
        <TextField 
          variant="standard"
          placeholder="検索"
          onChange={e => setText(e.target.value)}
        />
      <NewEmployeeModal 
          state={state} 
          dispatch={dispatch}
        />
     

      </Stack>
      {
            (text && filtered.length < 1) &&  
            <h5 style={{color: "red"}}>見つかりませんでした。</h5>
      }
       
        <Stack 
          sx={{height: 500}}
          direction="row" 
          spacing={1}
        >
          {state.fetchState === REQUEST_STATUS.OK ?
              index?
              <ShowList/>
              :
              <ShowImageList/>
            :
            <Skeleton variant="rectangular" height= "100%" width="50%" />
          }
        <Paper 
          sx={{position:"relative",p:1, width: "50%",maxWidth:700, ...STYLE_2}}
          elevation={2}
          >
            <InformationDisplay />
        </Paper>
  
        </Stack>
          <Link to="/Dashboard">
          <IconButton style={backButtonStyle}>
            <ArrowCircleLeftIcon sx={{width: 50, height: 50}} />
          </IconButton>
          </Link>
      </Box>
  
       </>
    )
}