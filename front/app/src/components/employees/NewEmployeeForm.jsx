
import React,{ useState, useEffect, useRef, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { ConfigContext } from '../../contexts/config';
import { imageSrc, REQUEST_STATUS, S3_ORIGIN } from "../../components/const";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, ButtonBase, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../contexts/auth';

export const NewEmployeeForm = ({
    sendParams,
    requestStatus,
    profile={profile:""}
}) => {

    
  const { register, handleSubmit,setError,clearErrors,  formState: { errors } } = useForm();

  const [visible, setVisible] = useState(false)
  const [age, setAge] = useState(20);
  const [validate, setValidates] = useState(false); 
  const [password, setPassword] = useState({password:"",passwordConfirm:""});
  
  const auth = useContext(AuthContext);
  
  const uploadImage = useRef();

    
  const ageList = [...Array(47)].map((_, i) => (i + 18)) 

  const handleChange = (e) => {
    setPassword({...password,[e.target.name]: e.target.value});
  }

 const handleUpload = (e) => {
      const img = e.target.files[0]
      register('image').onChange(e)
      uploadImage.current.title = img.name;
      const reader = new FileReader();      
      reader.onload = (event) => {
        uploadImage.current.setAttribute('src', event.target.result)
      };
      reader.readAsDataURL(img);
      
 }
 
  useEffect(()=> {
   if(password.password !== password.passwordConfirm){
     setValidates(false)
     setError("password",  { type: 'notMatch', message: "パスワードが一致しません。" })
   }else{
     clearErrors('password');
     setValidates(true)
   }
 }
 ,[password]
 )


return (

    <form onSubmit={handleSubmit(sendParams)}>
    <Stack>
    <label style={{margin:"auto"}}>
            <Input
                {...register('image')} 
                style={{display: "none"}} 
                accept="image/*" 
                type="file"
                onChange={e =>handleUpload(e)}
            />
        
            <img 
                style={{height: 100, width:100}}
                ref={uploadImage} 
                src={imageSrc(profile)}
            />    
    </label> 
    <input 
      {...register('imageUrl')}  
      value={profile.image}
      type="hidden"  
      defaultValue={profile.profile && profile.profile.image}
    />

    <TextField
       {...register('name',{ required: "※氏名が入力されてません"})} 
        required
        disabled={!auth.state.chief && auth.state.loggedin}
        label="氏名"
        defaultValue={profile && profile.name}
        className="mui-input"
        size="small"
        margin="normal"
      />
      <span style={{color: "red"}}>{errors.name && errors.name.message}</span>
      
      <Stack direction="row" spacing={4}>
      
      <TextField
       {...register('telephone',{ required: "※電話番号が入力されてません"})} 
        required
        label="電話番号"
        defaultValue={profile && profile.profile.telephone}
        className="mui-input"
        variant="filled"
      />
       <span style={{color: "red"}}>{errors.tel && errors.tel.message}</span>

      <Box sx={{width:"100px"}}>
      <FormControl fullWidth>
      <InputLabel >年齢</InputLabel>
      <Select
         {...register('age',{ required: "※年齢が入力されてません"})} 
         label="age"
         defaultValue={profile && profile.profile.age}
         className="mui-input"
         value={age}
      >
        {
          ageList.map(v => 
            <MenuItem 
              key={v} 
              value={v}
              onChange={e => setAge(e.target.value)}
              >{v}</MenuItem>
            )
        }
      </Select>
      <span style={{color: "red"}}>{errors.age && errors.age.message}</span>

      </FormControl>

      </Box>

      </Stack>
      <TextField
       {...register('email',{
          required: "※メールアドレスが入力されてません",
          maxLength: {
            value:60,
            message: "最大文字数(60文字)を越えています。"}
          })} 
        size="large"
        // required
        type="email"
        variant="standard"
        label="メールアドレス"
        defaultValue={profile.profile && profile.profile.email}
        className="mui-input"
        margin="normal"
      />
      <span style={{color: "red"}}>{errors.email && errors.email.message}</span>

      <Stack direction="row" spacing={2} alignItems="center">
      <FormControl  sx={{my:2}}>
      <InputLabel >パスワード</InputLabel>
      <OutlinedInput
      　　 {...register('password',{
        　　 required: "※パスワードが入力されてません",
             minLength: {
               value:8,
               message: "半角英数字8文字以上で入力してください"},
              pattern: {
              value: /^[a-zA-Z0-9.?/-]{8,24}$/,
              message: 'パスワードの形式が正しくありません',
              }
            })} 
          label="パスワード"
          className="mui-input"
          // required
          type={visible ? 'text' : 'password'}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={()=>setVisible(!visible)}
                edge="end"
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        </FormControl>
        <FormControl>
        <InputLabel>パスワード(確認)</InputLabel>
         <OutlinedInput
          name="passwordConfirm"
          label="パスワード(確認)"
          className="mui-input"
          // required
          type={visible ? 'text' : 'password'}
          onChange={handleChange}
        />
        <span style={{color: "red"}}>{errors.password && errors.password.message}</span>

      </FormControl>
        
      </Stack>
    

    <Button 
      sx={{my:4}}
      // disabled={!validate} 
      type="submit"
      variant="contained" 
      color="success"
      endIcon={ requestStatus == REQUEST_STATUS.POST?
        <CircularProgress sx={{width: "1.2rem", height:"1.2rem"}} color="inherit"/>
        :
        <SendIcon />}>
      登 録　
    </Button>

      
  </Stack>

  

  </form>
  
)

}