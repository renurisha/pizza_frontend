import { Avatar, Box, Link, Paper, Stack } from "@mui/material";
import Icon from "@mui/material/Icon";
import { PMGrid, PMText } from "../../pmcomponents";
import { BaseWidgetProps } from "../BaseWidget";

export interface MetricWidgetProps {
  metricValue?: string;
  metricSecValue?: string;
  metricSecValueColor?: string;
  metricValueColor?: string;
  metricPrefix?: string;
  metricIcon?: string;
  metricIconColor?: any;
  variant?: any;
  subvariant?: any;
  url?: string;
}

let current_url = window.location.href.split("/");
let base_url = current_url[0] + "//" + current_url[2];
export const MetricWidget = (props: BaseWidgetProps & MetricWidgetProps) => {
  const {
    bgColor,
    sx,
    bodyPadding,
    headerDividerColor,
    headerWeight,
    headerVariant,
    metricIcon,
    metricIconColor,
    metricValueColor,
    metricPrefix,
    ...baseProps
  } = props;

  let cardStyleProps = {
    bgcolor: bgColor,
    ...sx,
  };

  let formattedMetricValue = Array.isArray(props.metricValue)
    ? "0"
    : props.metricValue;

  if (metricPrefix) {
    formattedMetricValue = `${props.metricPrefix}${formattedMetricValue}`;
  }

  return (
    <PMGrid item {...baseProps}>
      <Paper sx={cardStyleProps} elevation={props.elevation}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            {props.header && (
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  borderBottom: 1,
                  borderColor: headerDividerColor,
                }}
              >
                <PMText
                  variant={headerVariant}
                  sx={{ fontWeight: headerWeight }}
                  color={props.headerColor}
                >
                  {props.header}
                </PMText>
              </Box>
            )}
            <Box sx={{ width: "100%", padding: bodyPadding }}>
              <PMText
                variant={props?.variant}
                color={metricValueColor}
                sx={{ px: 2 }}
              >
                {formattedMetricValue}
              </PMText>
              {props.metricSecValue && (
                <PMText
                  variant={props.subvariant}
                  color={props.metricSecValueColor}
                  sx={{ px: 2, pb: 2 }}
                >
                  {props.metricSecValue}
                </PMText>
              )}
            </Box>
            {props?.url ? (
              <Link
                href={`${base_url}${props.url}`}
                sx={{ pl: 2 }}
                underline="hover"
              >
                View All
              </Link>
            ) : (
              <></>
            )}
          </Stack>
          {metricIcon && (
            <Stack alignSelf="center" sx={{ pr: 2 }}>
              <Avatar sx={{ backgroundColor: `${metricIconColor}.light` }}>
                <Icon color={metricIconColor} sx={{ margin: 1 }}>
                  {metricIcon}
                </Icon>
              </Avatar>
            </Stack>
          )}
        </Stack>
      </Paper>
    </PMGrid>
  );
};

MetricWidget.defaultProps = {
  metricIconColor: "inherit",
  metricValueColor: "inherit",
  headerDividerColor: "transparent",
  headerWeight: "500",
  headerVariant: "subtitle2",
  variant: "h2",
  subvariant: "h6",
};

export default MetricWidget;
