import React from "react";
import { createContext, useState } from "react";
import { SharedSnackbar } from "../components/shared/SharedSnackbar";

export const SnackbarContext = createContext();

const initialState = {
  open: false,
  variant: "",
  content: ""
}


export const SnackbarProvider = ({children}) => {

  const [snackbar, setSnackBar] = useState(initialState);

   
  const handleClose = () => {
    setSnackBar({...snackbar,open: false})
  }

  return (
      <SnackbarContext.Provider value={{
          setSnackBar: setSnackBar
      }}>
          {children}
          <SharedSnackbar
          open={snackbar.open}
          handleClose={handleClose}
          variant={snackbar.variant} 
          content={snackbar.content} 
    />
      </SnackbarContext.Provider>
  )
}
  