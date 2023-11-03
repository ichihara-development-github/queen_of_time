import React from "react";
import { Stack, Typography } from "@mui/material";
import icon from "../../images/icon.png"
import { STYLE_2 } from "../const";

const iconSize = 90;
const iconArea = {
	top: `calc(40% - (${iconSize}px/2)`,
	maxWidth: 800,
	maxHeight:500,
	margin: "auto",
	padding: 120,
	border: "20px double royalblue",
	borderRadius: 5

}
export const InitialLoading = () => (

		<div style={{padding:24}}>
		<Stack style={{...iconArea, ...STYLE_2}} spacing={3} alignItems="center">
		<img 
			style={{animation: "poping 1.3s infinite"}}
			src={icon} width={iconSize} height={iconSize}
		 />
		 <div>
			<div id="floatBarsG">
				<div id="floatBarsG_1" className="floatBarsG"></div>
				<div id="floatBarsG_2" className="floatBarsG"></div>
				<div id="floatBarsG_3" className="floatBarsG"></div>
				<div id="floatBarsG_4" className="floatBarsG"></div>
				<div id="floatBarsG_5" className="floatBarsG"></div>
				<div id="floatBarsG_6" className="floatBarsG"></div>
				<div id="floatBarsG_7" className="floatBarsG"></div>
				<div id="floatBarsG_8" className="floatBarsG"></div>
			</div>
		</div>
		<Typography variant="h5">Just a moment please…</Typography>




		</Stack>

		
		</div>

		
	
	)
	


