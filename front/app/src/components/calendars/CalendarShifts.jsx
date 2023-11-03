import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Chip, Stack, Typography, Divider, Tooltip} from '@mui/material';
import { Box } from '@mui/system';

export const CalendarShifts = ({
    shifts,
    count,
    date,
    setOpenState,
    setPeriod
}) => {
    
    const handleClick = () => {
        setOpenState("shift")
    }

    return (
        <>
        <Typography variant="h5">勤務:　{shifts.length}人</Typography>
        <Typography variant="h5">シフト:　{count}　</Typography>
        <Divider />
        {
         shifts.map(s => (
                <Box sx={{my:2}}>
                      <Stack direction="row" spacing={2}>
                      <Tooltip title={s.confirmed ? "" : "シフトが未確定です"} arrow>
                      <Chip
                        key={s.id}
                        variant={s.confirmed ? "filled" : "outlined"}
                        icon={< AccountCircleIcon />}
                        label={s.name}
                    />

                      </Tooltip>
                    <Typography variant="subtitle1">
                        {s.attendance_time} ～ {s.leaving_time}
                    </Typography>

                </Stack>
                </Box>
                )
            )}
            <Button fullWidth 
                    variant="contained"
                    color="success"
                    onClick={()=> handleClick()}
            >
                シフトを編集する
            </Button>
        
           
        </>
    )
}