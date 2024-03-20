import React from "react";
import { BigHeaderStyles } from "./BigHeader.styles";

const BigHeader = ({ children }) => {
  return <h1 className={BigHeaderStyles}>{children}</h1>;
};

export default BigHeader;
