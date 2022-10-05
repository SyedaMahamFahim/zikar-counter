import React from "react";
import { Typography } from "@mui/material";

const BoxContent = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        fontWeight="fontWeightBold"
        fontSize={"1.1rem"}
        align="left"
      >
        Want to keep
        <Typography
          variant="span"
          component="span"
          color="#80d785"
          fontWeight="fontWeightBold"
        >
          {" "}
          Count{" "}
        </Typography>
        of your Duroods, Yaseens, Zikr etc...?
      </Typography>
      <br />
      <Typography>
        Manage, track and get an individual and total count of yourself and your
        group contributions.
      </Typography>
      <br />
    </>
  );
};

export default BoxContent;
