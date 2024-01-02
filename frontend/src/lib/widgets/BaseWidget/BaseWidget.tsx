import { Paper, Stack } from "@mui/material";
import Box from '@mui/material/Box';
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode } from "react";
import { PMGrid, PMText } from "../../pmcomponents";
import { PMGridProps } from "../../pmcomponents/pmgrid/PMGrid";

export interface BaseWidgetProps extends PMGridProps {
    header?: string
    header1?: string
    header2?: string
    header3?: string
    children?: ReactNode
    bodyPadding?: number
    bgColor?: string
    headerBackgroundColor?: string
    headerDividerColor?: string
    headerWeight? : string
    headerVariant? : Variant
    elevation?: number
    direction?: any
    headerColor?: string
    sx?: Object
    md?: number
}


export const BaseWidget = (props:BaseWidgetProps) => {
    const {bgColor, sx, bodyPadding, headerBackgroundColor, headerDividerColor, headerWeight, headerVariant, ...baseProps } = props;

    let cardStyleProps = {
        bgcolor: bgColor,
        overflow: "auto",
        ...sx
    }

    // All widgets are grid items by default
    return (
        <PMGrid item {...baseProps}>
            <Paper sx={cardStyleProps} elevation={props.elevation}>
                <Stack direction="column">
                    {
                        props.header &&
                            <Box sx={{ p:1, borderBottom: 1, borderColor: headerDividerColor, backgroundColor: headerBackgroundColor }}>
                                <PMText variant={headerVariant} sx={{ fontWeight: headerWeight }} color={props.headerColor}>{props.header}</PMText>
                            </ Box>
                    }
                    <Box sx={{width: "100%", padding: bodyPadding}}>
                        {props?.children}
                    </ Box>
                </ Stack>
            </ Paper>
        </PMGrid>
    )
}

BaseWidget.defaultProps = {
    headerBackgroundColor: 'primary.light',
    bgColor: "background.paper",
    headerDividerColor: "grey.200",
    headerWeight: "600",
    headerVariant: 'body1',
    elevation: 1,
    bodyPadding: 2
}

export default BaseWidget