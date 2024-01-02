import { PMGrid, PMIcon, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface InteractionHistoryWidgetProps {
  text?: string;
  textColor?: string;
  icon?: string;
  direction?: string;
  // data: Object
  data: Array<any>;
}

/* Example Field data*/
// const fields = [
//     {label: "First Name", key: "first_name" },
//     {label: "Last Name", key: "last_name"},
//     {label: "Phone", key: "phone"},
//     {label: "Email", key: "email"}
// ]

export const InteractionHistoryWidget = (
  props: BaseWidgetProps & InteractionHistoryWidgetProps
) => {
  return (
    <BaseWidget {...props}>
      <PMGrid
        container
        direction={props.direction || "column"}
        columnSpacing={4}
        rowSpacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {props.data.map((item, index) => {
          return (
            
            <PMGrid key={index} direction="column">
              <PMText variant="caption">{item.date}</PMText>
              {item?.items.map((dataitem, index)=>{
              return (<>{dataitem?.event && dataitem?.event !== "" ? (
            
                (<PMGrid key={index} direction="row">
                  {" "}{dataitem?.time}{": "}
                  {dataitem.mode === "call" ?  <PMIcon icon="call"></PMIcon> : ""} {dataitem?.event} 
                {" "}schedule by {dataitem?.schedule_by}
                </PMGrid>)
              ) : (
                <PMGrid key={index} direction="row">
                  {" "}{dataitem?.time}{": "}
                  {dataitem.mode === "sms" ?  <PMIcon icon="sms"></PMIcon> : ""} sent
                  by {dataitem?.subject} - {dataitem.content}
                </PMGrid>
              )}</>)
              })}
            </PMGrid>
          );
        })}
      </PMGrid>
    </BaseWidget>
  );
};

InteractionHistoryWidget.defaultProps = {
  direction: "column",
};

export default InteractionHistoryWidget;
