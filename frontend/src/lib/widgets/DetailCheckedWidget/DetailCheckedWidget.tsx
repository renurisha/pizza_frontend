import React from "react";
import { PMGrid, PMIcon, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface DetailCheckedWidgetProps {
    text?: string,
    textColor?: string,
    icon?: string
    direction?: string
    data: Object
    fields: Array<any>
}


export const DetailCheckedWidget = (props: BaseWidgetProps & DetailCheckedWidgetProps) => {
    return (
        <BaseWidget {...props}>
            <PMGrid container direction={props.direction || "column"}
                columnSpacing={4}
                rowSpacing={2}
                padding={2}
                justifyContent="space-between"
                alignItems="flex-start">
                {
                    props.fields.map((field, index) => {
                        return (
                            <PMGrid key={index} container={true} padding={1} direction="row" gap={2}  justifyContent="space-between" alignItems="space-between">
                                    
                                    <PMText sx={{fontSize:16, paddingInline:1}} variant="caption">{field.label+":"}</PMText>
                                    {props.fields[index].data?.map((item, idx) => {
                                        return (<React.Fragment key={idx}><PMIcon icon={item?.icon} color={item?.color}></PMIcon></React.Fragment>)
                                    
                                        
                                    })}
                                    
                            </PMGrid>)
                    })
                }
            </PMGrid>
        </BaseWidget>
    )
}

DetailCheckedWidget.defaultProps = {
    direction: "column"
}

export default DetailCheckedWidget