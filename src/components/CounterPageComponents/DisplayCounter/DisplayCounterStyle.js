import { styled } from "@mui/material/styles";
import { Box} from "@mui/material";

const DisplayCounterContainer = styled(Box)(() => ({
  background: "#effcef",
  padding: "4rem",
  borderRadius: "34px",
}));

const DisplayCounterRow = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "space-between",
  justifyContent: "space-between",
}));
const DisplayCounterLeftBox = styled(Box)(() => ({
 
}));
const DisplayCounterRightBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "space-between",
}));

const DisplayCounterRightIconBox = styled(Box)(() => ({
  margin: "0 0.5rem",

}));

const IconSpan = styled(Box)(() => ({
  cursor: "pointer",
}));

export { DisplayCounterContainer,DisplayCounterRow,DisplayCounterLeftBox 
,DisplayCounterRightBox ,DisplayCounterRightIconBox,IconSpan};
