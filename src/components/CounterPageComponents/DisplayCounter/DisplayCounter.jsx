import React from "react";
import { Typography } from "@mui/material";
import dateFormat from "dateformat";
import { Box} from "@mui/material";


const styles={
  padding: "2px 5px",
  color: "white",
  fontWeight: "bold",
}
const DisplayCounter = ({ counterData,newCountValue,newStatus }) => {
  const {  goal,description, createdAt, } = counterData;
  return (
    <>
      <Box>
        <Typography variant="h4">{description}</Typography>
        <Typography variant="p">
          {dateFormat(createdAt, "dddd, mmmm dS, yyyy,")}
        </Typography>{" "}
        <br />
        <br />
        <Typography variant="p" mt={"2rem"}>
          <span
            style={{
              ...styles,
              background: "#80d785", 
            }}
          >
            {newCountValue}
          </span>{" "}
          Of
          <span
            style={{
              ...styles,
              background: "#79bcd3",
              marginLeft: "10px",
            }}
          >
            {goal}
          </span>
        </Typography>
        <br/>
        <Typography variant="p" mt={"2rem"}>
          {newStatus ? "Completed" : "Not Completed"}
        </Typography>
      </Box>
    </>
  );
};

export default DisplayCounter;
