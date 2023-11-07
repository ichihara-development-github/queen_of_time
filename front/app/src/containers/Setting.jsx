import React, { useState, useContext, useMemo } from "react";
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, NativeSelect, Paper, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { STYLE_2 } from "../components/const";
import DatePicker from "react-datepicker";

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { ConfigContext } from "../contexts/config";
import { formattedDate } from "../lib/calcDate";
import { sendOrgParams } from "../apis/config";
import { SnackbarContext } from "../contexts/snackBar";


export const Setting = () => {
   
  const orgConfig = useContext(ConfigContext);
  const sb = useContext(SnackbarContext);
  const colors=  
  [ 
    {"key":"red","value": orgConfig.params.red},
    {"key":"royalblue","value": orgConfig.params.royalblue},
    {"key":"green","value": orgConfig.params.green},
    {"key":"orange","value": orgConfig.params.orange},
  ]
    
  const initialDate = {
    submittable_start: new Date(orgConfig.params.submittable_start),
    submittable_end: new Date(orgConfig.params.submittable_end), 
  }  
  const month = useMemo(()=>([...Array(29)].map((_,i)=>`${i +1}日`)),[]);
  const hours = useMemo(()=>([...Array(25).keys()]),[]);
  const [date, setDate] = useState(initialDate);
  const [event, setEvent] = useState({})
 
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
   })
    console.log(event)
  }

   

  const onSubmit = (params) => {
    sendOrgParams({...params, ...date, ...event})
    .then(res => {
      if(res.status !== 200){return}
      orgConfig.setParams({
        ...res.data.config,
        orgName: res.data.orgName,
        orgAddress: res.data.orgAddress
      })
      sb.setSnackBar({open: true, variant: "success", content: "情報をしました。"})

    })
  }

    return (
      <Paper sx={{p:1, ...STYLE_2}}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack 
          sx={{py:2}}
          direction="row" 
          alignItems="center"
          spacing={2} 
          justifyContent="end"
          >
          <Typography varinat="h6">責任者： {orgConfig.params.name} </Typography>
          <TextField 
             {...register('name',{ required: "※組織名が入力されてません"})} 
            label="組織名" 
            className="mui-input"
            defaultValue={orgConfig.params.orgName}
          />
        </Stack>
        <Stack>
        <TextField 
         {...register('address',{ required: "※所在地が入力されてません"})} 
          fullWidth 
          sx={{my:1, maxWidth: 400, marginLeft: "auto"}}
          label="所在地"
          className="mui-input"
          defaultValue={orgConfig.params.orgAddress}
          />
        </Stack>
       
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center"
          justifyContent="space-between"
        >
        <Tooltip title="営業時間はシフト提出で勤務可能な時間に反映されます。">
          <Typography variant="subtitle1">営業時間</Typography>
        </Tooltip>
        <div>
          <FormControl sx={{m:1, width:50}} >
          <InputLabel>時</InputLabel>
              <NativeSelect
                 {...register('open',{ required: "※営業開始時間が入力されてません"})} 
                className="mui-input"
                label="時"
                defaultValue={orgConfig.params.open}
              > 
              {hours.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
              </NativeSelect>
              </FormControl>　～
              <FormControl sx={{ m: 1, width:50}} >
              <InputLabel>時</InputLabel>
              <NativeSelect
                {...register('close',{ required: "※営業終了時間が入力されてません"})} 
                className="mui-input"
                label="時間"
                defaultValue={orgConfig.params.close}
              > 
              {hours.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
              </NativeSelect>
            </FormControl>

        </div>
        </Stack>

        <Divider sx={{my:1}} />

      {/* <Typography variant="h6">チャット</Typography>
      <Stack
          direction="row" 
          spacing={2} 
          alignItems="center"
          justifyContent="end"
          >
        <Tooltip title="ON状態だとチャット画面を離れていてもブラウザに通知が届きます。">
          <FormGroup>
            <FormControlLabel 
              control=
              {<Checkbox
                　{...register('chat_notice')} 
                 checked={orgConfig.params.chat_notice}
                 />}
              label="ブラウザ通知"
              labelPlacement="start"
            />
          </FormGroup>
          </Tooltip>
       
        </Stack>
      */}
        
        <Divider sx={{my:1}} />

        <Typography variant="h6">シフト</Typography>
        <Stack
         direction="row" 
         spacing={2} 
         alignItems="center"
         justifyContent="space-between"
        >
        
          <Typography variant="subtile1">最低勤務時間</Typography>
          <div>
       
          <FormControl sx={{ m: 1, width:50}}>
          <InputLabel>時間</InputLabel>
              <NativeSelect
                {...register('min_work_time')} 
                className="mui-input"
                label="時間"
                defaultValue={orgConfig.params.min_work_time}
              > 
              {hours.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
              </NativeSelect>
          </FormControl>　
          </div>
        </Stack>
        <Typography variant="subtile1">シフト提出対象期間</Typography>
       
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
      
          <FormControl sx={{width:100}}>
           
          {/* <IconButton> */}
          <Typography variant="h6">毎月</Typography>
          <NativeSelect
                {...register('min_work_time')} 
                className="mui-input"
                label="日付"
                defaultValue={orgConfig.params.shift_start_day || 1}
              > 
              {month.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
              </NativeSelect>

          {/* </IconButton> */}
          
          </FormControl>

          
          {/* <Typography variant="h6">提出日数</Typography>
          <FormControl sx={{ width:100}}>
    
          <IconButton>
          <NativeSelect
                {...register('min_work_time')} 
                className="mui-input"
                label="日数"
                defaultValue={orgConfig.params.span}
              > 
              {month.map(n => 
                  <option key={n} value={n}>{n}</option>
                  )
              }   
              </NativeSelect>

          </IconButton>　
          
          </FormControl>
          */}
        </Stack>
        <Divider sx={{my:2}} />
        <Typography variant="h6">勤怠打刻</Typography>
        <Stack 
          sx={{py:2}}
          direction="row" 
          alignItems="center"
          spacing={2} 
          justifyContent="space-between"
          >
        <Tooltip title="従業員が打刻可能な所在地からの距離を変更できます。">
          <Typography variant="subtitle1">打刻可能な距離</Typography>
        </Tooltip>
          <TextField 
            {...register('stampable_distance')} 
            label="m" 
            className="mui-input"
            type="number"
            defaultValue={orgConfig.params.stampable_distance}
          />
        </Stack>
  
        <Divider sx={{my:2}} />
        <Typography variant="h6">カレンダー</Typography>
        <Stack 
          sx={{py:2}}
          direction="row" 
          justifyContent="space-between"
        >
        <Tooltip title="カレンダーのイベント名を変更できます。">
          <Typography variant="subtitle1">イベント名</Typography>
        </Tooltip>
        <div>
          <FormControl>
            <RadioGroup row >
            {colors.map(c =>  
            <div key={c.key}>
              <TextField  
                style={{width:80, backgroundColor:"white"}}
                size="small"
                name={c.key}
                defaultValue={c.value}
                onChange={handleChange}
              />
           
              <FormControlLabel
              key={c.key}
                value={c.key} 
                control={
                <Radio
                  sx={{color: c.key}}
                  />} 
              />  
            </div>
            )}
          
            </RadioGroup>
          </FormControl>
        </div>
       
      </Stack>
      <Stack sx={{my:2}}>
      <Button 
          fullWidth
          type="submit"
          style={{margin:"0 auto", maxWidth:300}}
          variant="contained"
          color="success"
        >
          保存
        </Button>
       

      </Stack>
    
       
        </form>
      </Paper>
    )

}