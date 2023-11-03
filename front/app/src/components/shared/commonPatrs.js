import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import icon from "../../images/icon.png"
import { LIGHT_GRAY, SiteName } from "../const"

const circleStyle = {
    position: 'absolute',
    height: 80,
    width: 80,
    top:  "calc(50% - 40px)",
    left: "calc(50% - 40px)",
    color: "gray"
}

export const MainLogo = () => (
    <Link to="/">
        <Stack
        direction="row" 
        alignItems="flex-end"
        spacing={2}
        >
            <img style={{width:40, height:50}} src={icon}/>
            <Typography
                style={{color: LIGHT_GRAY}}
                variant="h4"
            >
                {SiteName}
            </Typography>
        </Stack>
    </Link>
)

const PageLoadingCircle = () =>(
    <CircularProgress
        style={circleStyle}
        color="inherit"
    />
)

export { PageLoadingCircle }