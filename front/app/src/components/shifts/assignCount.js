import React,{ useState, useContext,useEffect} from "react";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import { Chip, Stack, Tooltip } from '@mui/material';
import { ConfigContext } from '../../contexts/config';
import { calcAssignCount } from "../../lib/calc";
import { BUSSINESS_HOUR } from "../const";


export const AssignCount = ({params}) => {

    const orgConfig = useContext(ConfigContext);
    const time = BUSSINESS_HOUR(orgConfig.params.open, orgConfig.params.close);
    const [count, setCount] = useState(calcAssignCount(params, time));
    useEffect(() => setCount(calcAssignCount(params, time)),[params])


    return(
        <Stack sx={{my:2}} direction="row" spacing={2}>
              <Tooltip title={`${time.early_time[0]} - ${time.early_time.slice(-1)[0]}`} arrow>
               <Chip label={`朝　${count.early}人`} color="warning" variant="outlined" icon={< WbSunnyOutlinedIcon />} />
              </Tooltip>
              <Tooltip title={`${time.mid_time[0]} - ${time.mid_time.slice(-1)[0]}`} arrow>
                <Chip label={`昼　${count.mid}人`} color="success" variant="outlined" icon={< Brightness5OutlinedIcon />}  />
                </Tooltip>
            <Tooltip title={`${time.late_time[0]} - ${time.late_time.slice(-1)[0]}`} arrow>
                <Chip label={`夜　${count.late}人`} color="primary" variant="outlined" icon={<ModeNightOutlinedIcon />}  />
            </Tooltip>
        </Stack>

    )
}