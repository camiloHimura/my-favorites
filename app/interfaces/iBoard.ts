import React from "react";
import iTag from "./iTag";

export default interface iBoard {
  options: iTag[];
  isWrap: boolean;
  className: string;
  placeHolder: string;
  Component: React.FC;
  setOptions: (tag: iTag) => void;
}
