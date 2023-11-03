import { Button, Grid, StepContext, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth";

import { Link } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

export const Login = () => {
  

  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);

  

  return (
  
      <>
      {auth.state.loggedIn ? (
          <>
          <Grid sx={{p:4,maxWidth: 500,margin:"auto"}} container direction="column" alignItems="center">
          <Typography sx={{my:4}}component="div" variant="h5">
                <Link to ={auth.state.chief ? "/Dashboard": "/employeeDashboard"}>
                  <Typography variant="h6">
                    {auth.state.name}でログイン中です
                  </Typography>
                </Link>
              </Typography>
            <Grid item>
            <Button 
              color="error" 
              variant="contained" 
              onClick={auth.logout}
            >
              ログアウト
            </Button>
            </Grid>
          </Grid>
          </>
        ) : (
          <form  onSubmit={handleSubmit(auth.login)}>  
          <Grid sx={{p:4,maxWidth: 500,margin:"auto"}} container direction="column" alignItems="center">
          <Grid item>
          <TextField  
            
            margin="normal" 
            label="メールアドレス"
            defaultValue="sample@user0.com"
            {...register('email',{ required: "※空白にはできません"})} />
          </Grid>
          <span style={{color: "red"}}>{errors.email && errors.email.message}</span>
          <Grid item>
            <TextField
            margin="normal"
                  label="パスワード"
                  defaultValue="password"
                  {...register("password", {required:  "※空白にはできません"})}
                  />
          </Grid>
          <span style={{color: "red"}}>{errors.password && errors.password.message}</span>
          <Grid item>
          <Button 
            type="submit" 
            color="success" 
            variant="contained" 
            size="large"
            fullWidth
            onClick={()=> setLoading(true)}
            endIcon={loading ?
              <CircularProgress size="1.5rem" color="inherit"/>
              :
              ""
            }>
                ログイン   
          </Button>
          <Link to="/signup">
            <Button 
                variant="contained" 
                color="primary"
                fullWidth
            >
                新規登録
            </Button>
          </Link>
      
          </Grid>
      
            </Grid>
      
          </form>
        )}    
         
        
        </>

    )};

