import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";


const LayoutBox = styled(Box)(() => ({
  display: "flex",
  background: "black",
  height: "100%",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
}));

const PaperElevationThree = styled(Paper)(() => ({
  borderRadius: "44px",
  marginTop: "44px",
  marginBottom: "44px",
  paddingLeft: "30px",
  paddingRight: "30px",
  width: "600px",
  height:"90%"
}));


export {
  LayoutBox,
  PaperElevationThree,
};
