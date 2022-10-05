import React from "react";
import { Button, CircularProgress } from "@mui/material";

const AppButton = ({ name, type, isLoading }) => {
  return (
    <>
      <Button variant="contained" type={type}>
        {isLoading ? <CircularProgress 
        sx={{color:"white",width:"20px",height:"20px"}}/> : name}
      
      </Button>
    </>
  );
};

export default AppButton;
