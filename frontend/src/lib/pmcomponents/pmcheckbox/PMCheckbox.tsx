import { FormControlLabel } from "@mui/material";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import React from "react";
import "./PMCheckbox.scss";

export interface PMCheckboxProps {
  grid?: number
  label?: string
}

const PMCheckbox = (props: PMCheckboxProps & CheckboxProps) => {

  const handleClick = () => {
    console.log("Button Clicked")
  }

  return (
    <div onClick={()=>handleClick()} className={`button-${props.grid}`}>
      <FormControlLabel control={<Checkbox {...props} />} label={props.label} />
    </div>
  );
};

export default PMCheckbox;