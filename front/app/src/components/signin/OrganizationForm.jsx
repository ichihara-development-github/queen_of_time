
import React, { useContext, useState } from 'react';
import { Box, TextField, Step, StepLabel, Stepper, Stack, Button, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { createOrganization } from '../../apis/organization';
import { AuthContext } from '../../contexts/auth';

export const NewOrganizationForm = ({empParams,setStepIndex}) => {

    const geocoder = new window.google.maps.Geocoder();
    const [validate, setValidate] = useState(false);
    const [coords, setCoords] = useState({lat: 35.6815171,lng: 139.7567439});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const auth = useContext(AuthContext)



    const handleBlur = (e) => {
        geocoder.geocode({address: e.target.value},function(results, status){
            
            if(status == "OK"){
                const position = results[0].geometry.location
                setCoords({
                    lat: position.lat(),
                    lng: position.lng()
                })
                // setValidate(true)
            }else{
                alert("位置情報の取得ができませんでした。")
            }
        })
    }

    

    const sendOrgPrams = (params) => {
       
       
        const orgParams = {...params,lat: coords.lat, lng: coords.lng}
        console.log(orgParams)
        createOrganization({
            organizations: orgParams,
            employees: empParams
        })
        .then((res) => {
            console.log(empParams)
            if(res.status == 200){
                auth.login({
                    "email":empParams.email,
                    "password":empParams.password
                })
                // setStepIndex(2)
            }
    })
}


    return (
        <Box>
           
            <form onSubmit={handleSubmit(sendOrgPrams)}>
                <Stack 
                    spacing={1}
                    justifyContent="center"
                >
                    <TextField 
                        {...register('name', { 
                            required: "※組織名が入力されてません",
                            maxLength: {
                                value:24,
                                message: "最大文字数(24文字)を越えています。"
                                }
                            })}
                        label="組織名"
                        required
                    />
                     <span style={{color: "red"}}>{errors.name && errors.name.message}</span>

                    <TextField
                        {...register('address',{required: "no address"})} 
                        label="所在地"
                        defaultValue={"東京"}
                        required
                        onBlur={e => handleBlur(e)}
                    />
                    {/* ?が使えない */}
                    <span style={{color: "red"}}>{errors.address && errors.address.message}</span>
                    <Box>
                        <Typography variant="subtitle1">
                            ※営業時間・打刻可能範囲 等の詳細設定は組織作成後に管理画面から行うことができます。
                        </Typography>
                    </Box>
                   

                    <GoogleMap
                        mapContainerStyle={{ height:250}}
                        center={{lat: coords.lat, lng: coords.lng}}
                        zoom={14}
                    >
                    
                        <Marker position={{lat: coords.lat, lng: coords.lng}} zIndex={2} />
                    </GoogleMap>
                   
                    <Button 
                        variant="contained" 
                        color="success"
                        type="submit"
                        // disabled={!validate}
                    >
                        作成
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
