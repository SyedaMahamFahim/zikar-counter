import React from "react";
import { Box, TextField } from "@mui/material";

const FormInput = ({name,label,value,onChange,type}) => {
  return (
    <>
      <Box mt={4}>
        <TextField
          style={{
            width: "100%",
          }}
          onChange={onChange}
          id="outlined-disabled"
          label={label}
          defaultValue={value}
          name={name}
          type={type}
        />
      </Box>
    </>
  );
};

export default FormInput;
