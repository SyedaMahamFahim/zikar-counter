import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";


const LayoutBox = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
}));

const PaperElevationThree = styled(Paper)(({theme}) => ({
  borderRadius: "44px",
  marginTop: "44px",
  marginBottom: "44px",
  paddingLeft: "30px",
  paddingRight: "30px",
  width: "600px",
  height:"90%",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
    width: "fill-available",
    boxShadow: "none",
  },
}));


export {
  LayoutBox,
  PaperElevationThree,
};
