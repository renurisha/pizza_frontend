import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";
import "./PMDatepicker.scss";
export interface PMDatepickerProps {
    grid:number
}

const PMDatepicker = (props: PMDatepickerProps & TextFieldProps) => {

    return (
            <div className={`input-${props.grid}`}>
              {/* <DatePicker {...props}></DatePicker> */}
                <TextField {...props} type="date" fullWidth={true}></TextField>
            </div>
    )
}; 

export default PMDatepicker;