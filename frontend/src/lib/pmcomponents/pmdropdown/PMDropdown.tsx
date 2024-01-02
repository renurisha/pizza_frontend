import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select/Select";
import React, { FocusEvent } from "react";
import "./PMDropdown.scss";

export interface PMDropdownProps {
    grid?: number;
    options?: Array<Options>;
    validation?: Object;
    Onchange?: Function;
    validateField?: Function;
    error?: string;
    validationText?: string;
}
export interface Options {
    value: string;
    name?: string;
}

const PMDropdown = (props: PMDropdownProps & SelectProps) => {
    const [select, setSelect] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
        if (props?.Onchange) {
            props?.Onchange(event.target.value);
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setSelect(event.target.value);
        if (props?.validateField) {
            props?.validateField(event.target.value);
        }
    };

    return (
        <FormControl fullWidth={true}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                {...props}
                // value={select}
                onBlur={handleBlur}
                onChange={handleChange}
            >
                {props.options ? (
                    props.options.map((option, index) => {
                        let key = "option" + index;
                        return (
                            <MenuItem value={option.value} key={key}>
                                {option.name ? option.name : option.value}
                            </MenuItem>
                        );
                    })
                ) : (
                    <></>
                )}
            </Select>
        </FormControl>
    );
};

PMDropdown.defaultProps = {
    autoWidth: true
};

export default PMDropdown;
