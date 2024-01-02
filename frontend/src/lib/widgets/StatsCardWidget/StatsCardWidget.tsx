import Stack from "@mui/material/Stack";
import { PMGrid, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface StatsCardWidgetProps {
    text?: string,
    textColor?: string,
    type?: string,
    label1?: string,
    label2?: string,
    label3?: string,
    label4?: string,
    value1?: string,
    value2?: string,
    value3?: string,
    value4?: string,
    icon?: string
    direction?: string
    data: Object
    fields: Array<any>
}

/* Example Field data*/
// const fields = [
//     {label: "First Name", key: "first_name" },
//     {label: "Last Name", key: "last_name"},
//     {label: "Phone", key: "phone"},
//     {label: "Email", key: "email"}
// ]

export const StatsCardWidget = (props: BaseWidgetProps & StatsCardWidgetProps) => {
    return (
        <BaseWidget {...props}>
            <PMGrid container direction={props.direction || "column"}
                justifyContent="space-around"
                sx={{fontFamily:"Leyton", }}
                alignItems="center">
                     {props?.type=="3" ? (
                        <Stack  direction="row" width="100%" paddingX={2}  justifyContent="space-between">
                                <Stack direction="column" sx={{padding:1, marginTop:2}} gap={1} justifyContent="space-between">
                                    <PMGrid >
                                    <PMText variant="subtitle2" >{props.label1}</PMText>
                                    <PMText variant="h6">{props.value1}</PMText>

                                    </PMGrid>
                                    <PMGrid >

                                    <PMText variant="subtitle2">{props.label2}</PMText>
                                    <PMText variant="h6">{props.value2}</PMText>
                                    </PMGrid>
                                </Stack>
                                <Stack direction="column" sx={{padding:1, marginTop:2}} justifyContent="center" alignSelf="right">
                                    <PMText variant="subtitle2">{props.label3}</PMText>
                                    <PMText variant="h6">{props.value3}</PMText>

                                </Stack>
                            </Stack>):<><Stack  direction="row" width="100%" paddingX={2}  justifyContent="space-between">
                                <Stack direction="column" sx={{padding:1,  marginTop:2}} gap={1} justifyContent="space-between">
                                    <PMGrid >
                                    <PMText variant="subtitle2">{props.label1}</PMText>
                                    <PMText variant="h6">{props.value1}</PMText>

                                    </PMGrid>
                                    <PMGrid >

                                    <PMText variant="subtitle2">{props.label2}</PMText>
                                    <PMText variant="h6">{props.value2}</PMText>
                                    </PMGrid>
                                </Stack>
                                <Stack direction="column" sx={{padding:1, marginTop:2}} justifyContent="space-between" alignSelf="right">
                                    <PMGrid >
                                    <PMText variant="subtitle2">{props.label3}</PMText>
                                    <PMText variant="h6">{props.value3}</PMText>

                                    </PMGrid>
                                    <PMGrid>

                                    <PMText variant="subtitle2">{props.label4}</PMText>
                                    <PMText variant="h6">{props.value4}</PMText>
                                    </PMGrid>

                                </Stack>
                            </Stack></>}
                            
                 
                
            </PMGrid>
        </BaseWidget>
    )
}

StatsCardWidget.defaultProps = {
    direction: "column"
}

export default StatsCardWidget