import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";
import "./PMInput.scss";

export enum labelPosition{
    inline,
    above
  }

  export enum Sizes {
    small,
    medium,
    large
  }

export interface PMInputProps {
    grid?:number
    validation?: Object
    onChange?:Function,
    validateField?:Function,
    error?:string,
    validationText?:string,
    hideContent?:boolean
}


const PMInput = (props: PMInputProps & TextFieldProps) => {
  const handleChange = (event) => {
    if(props?.onChange){
      props?.onChange(event.target.value)
    }
  }
  var shrinkData = {}
  if(props.type=="datetime-local"){
    shrinkData = {shrink:true}
  }
  return (
            <div className={`input-${props.grid} display-${props?.hideContent?"none":"all"}`}>
                <TextField {...props}
                  InputLabelProps={{
                    ...shrinkData
                  }}
                  fullWidth={true}
                  onChange={handleChange}
                  onBlur={e => props?.validateField(e.target.value)}
                ></TextField>
            </div>
    )
}; 

export default PMInput;