import { Step, StepLabel, Typography } from "@mui/material";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import React from "react";
import "./PMStepper.scss";

export interface PMStepperProps {
  grid?: number
  steps?: Array<StepInterface>
}

export interface StepInterface {
  label: string
  caption?: string
}


const PMStepper = (props: PMStepperProps & StepperProps) => {

  const handleClick = () => {
    console.log("Stepper Clicked")
  }

  return (
    <div onClick={()=>handleClick()} className={`button-${props.grid}`}>
      <Stepper {...props}>
        {props.steps?.map((items) => {
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          labelProps.optional = items.caption?(
            <Typography variant="caption">{items.caption}</Typography>
          ):(<></>)

          return (
            <Step key={items.label}>
              <StepLabel {...labelProps}>{items.label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  );
};

export default PMStepper;