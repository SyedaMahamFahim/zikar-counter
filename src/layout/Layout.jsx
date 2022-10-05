import React from "react";
import { LayoutBox, PaperElevationThree } from "./LayoutStyle";
import { Title,Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <>
      <LayoutBox>
        <PaperElevationThree elevation={3}>
          <Title />
          {children}
          <Footer/>
        </PaperElevationThree>
      </LayoutBox>
    </>
  );
};

export default Layout;
