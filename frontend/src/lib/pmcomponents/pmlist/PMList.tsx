import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListProps } from "@mui/material/List";
import React from "react";
import {PMIcon, PMIconProps } from "../icon";
import "./PMList.scss";

export interface PMListProps{
    grid?: string
    data: Array<listData>
    disablePadding?: boolean
}

export interface listData {
    text?: string
    icon?: PMIconProps
    secondary_text?: string
} 

export const PMList = (props : PMListProps & ListProps) => {
    return(
        // fixed index for key error handling
        <List {...props}>
            {props.data?.map((items, index)=>{
                return (
                    <ListItem key={index} disablePadding={props.disablePadding}>
                        {
                            items.icon?
                                <ListItemIcon>
                                    <PMIcon {...items?.icon}></PMIcon>
                                </ListItemIcon>
                            :<></>
                        }
                        <ListItemText primary={items.text} secondary={items.secondary_text} />
                    </ListItem>
                )
            })}
        </List>
    );
};

export default PMList;