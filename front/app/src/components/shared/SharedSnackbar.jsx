import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const SharedSnackbar = ({open,handleClose, variant, content}) => {
 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  return (
    <Stack spacing={2} sx={{ zIndex:3 }}>
      <Snackbar 
        open={open} 
        autoHideDuration={6000}  
        onClose={()=> handleClose()}
        anchorOrigin= {{vertical: 'bottom',horizontal: 'left'}}
        >
        <Alert  severity={variant} sx={{ width: '100%' }}>
          {content}
        </Alert>
      </Snackbar>
    </Stack>
  );
}