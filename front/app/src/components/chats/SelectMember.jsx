import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React,{ useState } from "react"

import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useTextFilter } from "../../customeHooks/hooks";


const style =  {
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow:"scroll",
  height:400,
  width:270, 
  transform: 'translate(50%, -50%)',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


  
const avatarColor = (name) => {
    let color = '#';
    let hash = 2;
    let i;
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }


export const SelectMember = ({
  
    params,
    setParams,
    fetch
    
}) => {

    const [open, setOpen] = useState(false)
    const [member, setMember] = useState();
    // const [filtered, setFiltered] = useState([]);
    const [value, setValue] = useState();
    
   
    const handleOpen = () => {

        fetch().then(res => {
          if(res.status === 200){setMember(res.data.employees)}
    })
    setOpen(true)

    }
    
  const filtered = useTextFilter(member,value)
   
  // useEffect(() => {
  //   if (!member){return}
  //   const newList = member.filter((m) => {
  //     return m.name.toLowerCase().indexOf(value) !== -1 
  //   });
  //   setFiltered(newList); 
  // }, [value]);



    return (
       <>
        <IconButton
              component="span"
              onClick={()=>handleOpen()}
              >
            <PersonAddAlt1OutlinedIcon />
        </IconButton>
              <Modal open={open}>
           <Box  sx={style}>
              <Button
                  fullWidth
                  variant="text" 
                  onClick={()=>setOpen(false)}
                  >
                      閉じる
                  </Button>
                  { member?
                  <List>
                    <ListItem>
                      <TextField 
                      fullWidth
                      placeholder="検索"
                      onChange={(e)=> setValue(e.target.value)}
                      />
                    </ListItem>
                  {filtered.length > 0 ?
                 
                    filtered.map(m => (
                    <div key={m.id}>
                    <ListItemButton
                         selected ={params.id===m.id}
                         onClick={()=>{
                            setParams({...params,id:m.id, name:m.name})}
                         }
                        >
                    <ListItemAvatar>
                      <Avatar alt={m.name}  sx={{ bgcolor: avatarColor(m.name) }}>
                        {m.name.slice(0,2)}
                      </Avatar>
                  
                    </ListItemAvatar>
                    <ListItemText primary={m.name}/>
                </ListItemButton>
                    <Divider variant="inset" component="li" />
                    </div>
                )
                )
                  :
                  <>
                  {value && <span style={{color: "red"}}>見つかりませんでした。</span>}
                  {
                    member.map(m => (
                      <div key={m.id}>
                      <ListItemButton
                           selected ={params.id===m.id}
                           onClick={()=>{
                              setParams({...params,id:m.id, name:m.name})}
                           }
                          >
                      <ListItemAvatar>
                        <Avatar alt={m.name}  sx={{ bgcolor: avatarColor(m.name) }}>
                          {m.name.slice(0,2)}
                        </Avatar>
                    
                      </ListItemAvatar>
                      <ListItemText primary={m.name}/>
                  </ListItemButton>
                      <Divider variant="inset" component="li" />
                      </div>
                  ))
                  
                  

                  }</>
                 
                  }
                  </List>
                  :
                  [...Array(6).keys()].map(i => 
                    <Box key={i} sx={{ height:50 }}>
                        <Stack direction="row" spacing={2}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <div style={{width: `calc(100% - ${60}px)`}}>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        </div>

                        </Stack>
                        
                    </Box>
                  )
                }
          </Box> 
        
          </Modal>
          </>

    )

}