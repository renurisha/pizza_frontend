import React from "react";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import './style.scss'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { Box } from "@mui/system";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


export interface EventCalendarWidgetProps extends BaseWidgetProps {
    height: string
    events: any[]
    eventStartKey: string
    eventEndKey: string
}

export const EventCalendarWidget = (props: EventCalendarWidgetProps) => {
    const {height, eventStartKey, eventEndKey, events, ...baseProps } = props;

    function parseStartDate(event) {
        //TODO: Do localization handling here
        return new Date(event[eventStartKey])
    }

    function parseEndDate(event) {
        //TODO: Do localization handling here
        return new Date(event[eventEndKey])
    }

    return (
        <BaseWidget {...baseProps}>
            <Box sx={{height: props.height}}>
                <Calendar
                    localizer={localizer}
                    startAccessor={parseStartDate}
                    endAccessor={parseEndDate}
                    events={events}
                    sx={{ width: "100%" }}
                />
            </Box>
        </BaseWidget>
    );
};

EventCalendarWidget.defaultProps = {
    height: "400px",
    eventStartKey: "start",
    eventEndKey: "end"
};

export default EventCalendarWidget;
