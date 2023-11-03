import { Box } from "@mui/system";
import React, { useState } from "react"
import { DefaultModal } from "../../components/shared/DefaultModal"
import { RequestForm } from "./RequestForm";


export const RequestModal = ({params, open, setOpen}) => {
    
    const content = (
        <Box>
            {
                params.map(param=> (
                <RequestForm 
                    key={param.id}
                    param={param} 
                />)
                )
           }
        </Box>
    )
   
    return (
        <DefaultModal 
            open={open}  
            setOpen={setOpen} 
            content={content}
        />
    )

}