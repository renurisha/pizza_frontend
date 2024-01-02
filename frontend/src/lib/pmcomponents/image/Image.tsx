import { Grid } from "@mui/material";
import { GridProps } from "@mui/system";
import React from "react";
import "./Image.scss";

export interface ImageProps {
    image: string
}

export const Image = (props: ImageProps & GridProps) => {

    return (
        <Grid {...props}>
            <div>
                <img className={`image-img`} src={props?.image} />
            </div>
        </Grid>
    );
};

Image.defaultProps = {};

export default Image;
