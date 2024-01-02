import { Avatar, Box, ButtonBase, Chip, Typography } from "@mui/material";
import { PMGrid } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Icon from "@mui/material/Icon";
import React from "react";

export interface SimpleMetricWidgetProps extends BaseWidgetProps {
    metricName: string;
    metricValue: string;
    metricPrefix?: string;
    metricSubtext?: string;
    metricGrowth?: number;
    metricIcon?: string;
    metricIconColor?: string;
    onClick?: React.MouseEventHandler;
}

export const SimpleMetricWidget = (props: SimpleMetricWidgetProps) => {
    const { metricName, metricValue, metricPrefix, metricSubtext, metricGrowth, metricIcon, metricIconColor, onClick, ...baseProps } = props;

    let growthIcon: any = "";
    let growthColor: any = "warning.main";
    let formattedGrowth = "";
    let formattedMetricValue = props.metricValue;

    if (metricPrefix) {
        formattedMetricValue = `${props.metricPrefix}${formattedMetricValue}`;
    }

    if (metricGrowth) {
        formattedGrowth = props.metricGrowth + "%";

        if (metricGrowth < 0) {
            growthColor = "error";
            growthIcon = <ArrowDownwardIcon color="error" />;
        } else if (metricGrowth > 0) {
            growthColor = "success.main";
            growthIcon = <ArrowUpwardIcon color="success" />;
        }
    }

    let avatarProps = {
        bgcolor: metricIconColor,
        height: 56,
        width: 56,
    };

    const widgetContent =
            <PMGrid container direction="column" spacing={1}>
                <PMGrid container item direction="row" justifyContent="space-between" spacing={1}>
                    <PMGrid item>
                        <Typography color="textSecondary" gutterBottom variant="overline">
                            {metricName}
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            {formattedMetricValue}
                        </Typography>
                    </PMGrid>
                    {metricIcon && (
                        <PMGrid item>
                            <Avatar sx={avatarProps}>
                                <Icon>{metricIcon}</Icon>
                            </Avatar>
                        </PMGrid>
                    )}
                </PMGrid>

                <PMGrid container item direction="row" alignItems="center" justifyContent="flex-start" spacing={0.5}>
                    {metricGrowth && (
                        <PMGrid>{growthIcon}</PMGrid>
                    )}
                    {metricGrowth && (
                        <PMGrid>
                            <Typography color={growthColor} variant="body2" sx={{display: "inline"}}>
                                {formattedGrowth}
                            </Typography>
                        </PMGrid>
                    )}
                    {metricSubtext && (
                        <PMGrid item>
                            <Typography color="textSecondary" variant="caption">
                                {metricSubtext}
                            </Typography>
                        </PMGrid>
                    )}
                </PMGrid>


            </PMGrid>

    return (
        <BaseWidget {...baseProps}>
            {
                onClick ?
                    <ButtonBase onClick={(event) => {onClick(event)}}>
                        {widgetContent}
                    </ButtonBase>
                : widgetContent
            }
        </BaseWidget>
    )

};

SimpleMetricWidget.defaultProps = {
    metricIconColor: "primary.light",
};
export default SimpleMetricWidget;
