import Typography, { TypographyProps } from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

import PMGrid from "../pmgrid";

export interface PMHeaderProps {
    header: string
    variant?: any
    color?: any
}

export const PMHeader = (props: PMHeaderProps) => {
    let styleProps: object = {
        color: props.color
    }

    return (
        <PMGrid marginTop={4} marginBottom={2}>
            <Typography gutterBottom variant={props.variant} sx={styleProps}>{props.header}</Typography>
            <Divider />
        </PMGrid>
    );
};

PMHeader.defaultProps = {
    variant: "h5",
    color: "primary.main"
}

export default PMHeader;