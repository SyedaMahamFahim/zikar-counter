import React from "react";
import { WhatsApp } from "@mui/icons-material";


const WhatsAppBtn = ({text}) => {
  const handleShareLink=()=>{
    const url = window.location.href;
    window.open(`https://wa.me/?text=${text} ${url}`);
  }
  return (
    <>
      

      <span onClick={handleShareLink} style={{ cursor: "pointer" }}>
      <WhatsApp />
      </span>
    </>
  );
};

export default WhatsAppBtn;
