import React from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import { Link } from "react-router-dom";
import { BASE_STYLE, LIGHT_GRAY, SiteName } from "../const";
import { STYLE_2 } from "../const";

import descImage1 from "../../images/desc_image1.jpg"
import descImage2 from "../../images/desc_image2.jpg"
import employeesIcon from "../../images/employees.png"
import shiftIcon from "../../images/shift.png"
import manageIcon from "../../images/manage.png"
import timestampIcon from "../../images/timestamp.png"
import calendarIcon from "../../images/calendar.png"
import chatIcon from "../../images/chat.png"
import { MainLogo } from "./commonPatrs";
// import descImage3 from "../../images/desc_image3.jpg"

const gridContentStyle = {
    p:2,
    height: 300,
    margin:"0 auto",
    textAlign: "center"
}

const gridIconStyle = {
    width: "80%",
    height: "100%"
}

const descContent = {
    p:2,
    width:"100%", 
    maxWidth: 700, 
    margin:"24px auto"
}

const descImage = {
    maxHeight:350,
    margin: "16px 0"
}
const icons = [
    {
        icon: <img src={employeesIcon} style={gridIconStyle} />,
        title: "従業員管理",
        desc: "説明テキスト説明テキスト説明テキスト説明テキスト"
    },
    {
        icon:  <img src={timestampIcon} style={gridIconStyle} />,
        title: "打刻管理",
        desc: "説明テキスト説明テキスト説明テキスト"
    },
    {
        icon:  <img src={calendarIcon} style={gridIconStyle} />,
        title: "カレンダー",
        desc: "説明テキスト説明テキスト説明テキスト説明テキスト"
    },
    {
        icon:  <img src={chatIcon} style={gridIconStyle} />,
        title: "個別チャット",
        desc: "説明テキスト説明テキスト説明テキスト説明テキスト"
    },
    {
        icon:  <img src={shiftIcon} style={gridIconStyle} />,
        title: "シフト管理",
        desc: "説明テキスト説明テキスト説明テキスト説明テキスト"
    },
    {
        icon:  <img src={manageIcon} style={gridIconStyle} />,
        title: "クラウド管理",
        desc: "説明テキスト説明テキスト説明テキスト説明テキスト"
    }
]


export const Top = () => (

    <Stack  
        sx={{p:2}}
        style={STYLE_2} 
        >
        <MainLogo/>
        <Stack style={{width:"100%"}}>
        <Stack
          alignItems="center"
        >
            <Link to="/signup">
                    <Button 
                        sx={{width: 370, margin:"24px auto"}}
                        variant="contained" 
                        color="primary"
                        size="large"
                    >
                        始める >>
                    </Button>
            </Link>
        </Stack>
   

        </Stack>

         <Box>
            <Grid 
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
            {   
                icons.map((i,index) => (
                    <Grid 
                        key={index} 
                        item xs={10} 
                        sm={6} md={4}
                    >
                    <Paper sx={gridContentStyle}>
                        <Typography style={BASE_STYLE} variant="h5">{i.title}</Typography>
                        <div style={{height: 200}}>
                            {i.icon}
                        </div>
                        <Typography variant="subtitle1">
                            {i.desc}
                        </Typography>
                    </Paper>
                </Grid>
                )
                )
            }
      </Grid>

         </Box>
         <Stack sx={{my:4}}>
             <Paper sx={descContent}>
                 <Stack spacing={2}>
                     <img 
                      style={descImage}
                      src={descImage1}
                     />
                     <Typography variant="subtitle1">
                        クラウドを通して、「従業員情報・シフト・打刻履歴・予定・タスク・メッセージ」を一括管理可能。
                     </Typography>
                 </Stack>
             </Paper>
             
             <Paper sx={descContent}>
                 <Stack spacing={2}>
                     <img 
                      style={descImage}
                      src={descImage2}
                     />
                     <Typography variant="subtitle1">
                     SPAアプリケーションを使用。不要なページ更新やページ遷移がなく高速化する仕事スピードへストレスフリーに対応できます。
                     </Typography>
                 </Stack>
             </Paper>

         </Stack>
         <Stack 
            direction="row" 
            spacing={4}
            justifyContent="center"
            >
            <Link to="/signup">
                <Button 
                    variant="contained" 
                    color="primary"
                    size="large"
                >
                    新規登録
                </Button>
            </Link>
            <Link to="/login">
                <Button 
                    variant="contained" 
                    color="success"
                    size="large"
                >
                    登録済みの方
                </Button>
            </Link>
         </Stack>
    </Stack>
)