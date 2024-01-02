import { Avatar, Box, Paper, Stack } from "@mui/material";
import Icon from "@mui/material/Icon";
import { PMGrid, PMText, PMFormatterText } from "../../pmcomponents";
import { BaseWidgetProps } from "../BaseWidget";
export interface MetricWidget2Props {
    metricValue?: string,
    metricSumValue?: string,
    metricPercentageValue?: string
    metricSecValue?: string
    metricSecValueColor?: string
    metricValueColor?: string,
    metricPrefix?: string;
    metricIcon?: string;
    metricIconColor?: any;
    variant?: any
    subvariant?: any
    formatType?: string,
    type?: string,
    fields: Array<any>

}



export const MetricWidget2 = (props: BaseWidgetProps & MetricWidget2Props) => {
    const { bgColor, sx, bodyPadding, headerDividerColor, headerWeight, headerVariant, metricIcon, metricIconColor, metricValueColor, metricPrefix, fields, metricPercentageValue, ...baseProps } = props;

    let cardStyleProps = {
        bgcolor: bgColor,
        ...sx
    }


    const locale = 'en-IN'
    const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'INR',
    });
    return (
        <PMGrid item {...baseProps}>
            <Paper sx={{
                cardStyleProps, color: 'black', boxShadow: 3, position: 'relative', p: 2 ,borderRadius: '8px'
            }} elevation={props.elevation} >


                <Avatar sx={{ backgroundColor: `${metricIconColor}.light`, position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', opacity: .3, zIndex: 0, borderRadius: 0 }}>
                    {/* <Icon color={metricIconColor} sx={{ margin: 1, fontSize: '60px' }}>{metricIcon}</Icon> */}
                </Avatar>

                <Stack direction="column" justifyContent='center' sx={{ width: '100%', p: 2 }}>

                    <Box sx={{ borderBottom: 1, borderColor: headerDividerColor, zIndex: 100 }}>

                        <PMFormatterText
                            value={props?.fields?.length ? props.fields[0].value : ""}
                            formatType={props?.fields?.length ? props.fields[0].type : ""}
                            variant2={headerVariant}
                        />

                        <PMText
                            variant="h5"
                            sx={{ fontWeight: 500 }}

                        >
                            {props?.fields?.length ? props.fields[0].label : ""}
                        </PMText>
                    </ Box>

                    <Stack direction="row" sx={{ mt: 2 }}>

                        <Box sx={{ textAlign: 'start', zIndex: 100, width: '50%' }}>

                            <PMFormatterText
                                value={props?.fields?.length ? props.fields[1].value : ""}
                                formatType={props?.fields?.length ? props.fields[1].type : ""}
                                variant2="h5"
                            />

                            <PMText variant="subtitle2">
                                {props?.fields?.length ? props.fields[1].label : ""}

                            </PMText>
                        </Box>



                        {props?.type === '3' ? <Box sx={{ textAlign: 'end', zIndex: 100, width: '50%' }}>
                            <PMFormatterText
                                variant="h5"
                                value={props?.fields?.length ? props.fields[2].value : ""}
                                formatType={props?.fields?.length ? props.fields[2].type : ""}
                            />


                            <PMText variant="subtitle2">
                                {props?.fields?.length ? props.fields[2].label : ""}

                            </PMText>
                        </Box> : <></>
                        }
                    </Stack>

                </Stack>




            </ Paper>
        </PMGrid>
    )
}

MetricWidget2.defaultProps = {
    metricIconColor: "inherit",
    metricValueColor: "inherit",
    headerDividerColor: "transparent",
    headerWeight: "500",
    headerVariant: 'h3',
    variant: "h2",
    subvariant: "h6",
    label: 'default'
}

export default MetricWidget2


