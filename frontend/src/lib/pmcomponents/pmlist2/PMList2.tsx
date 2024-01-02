import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { ListProps } from "@mui/material/List";
import React from "react";
import Typography from '@mui/material/Typography';
import "./PMList2.scss";
import { MdEmail } from "react-icons/md";
import { green} from '@mui/material/colors';

export interface PMList2Props{
    grid?: string
    data: Array<any>
    disablePadding?: boolean
    primaryTextKey?: string
    secondaryTextKey?: string
    secondaryPrefixKey?: string
}

const PMList2 = (props : PMList2Props & ListProps) => {
    return(
        // fixed index for key error handling
        <List {...props}>
            {Array.isArray(props.data) ?
                props.data.map((item, index)=>{
                    return (
                        <ListItem key={index} disablePadding={props.disablePadding}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: green[500] }}>
                                    <MdEmail/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item[props.primaryTextKey]} secondary={
                                item[props.secondaryPrefixKey]?   
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item[props.secondaryPrefixKey]}
                                    </Typography>
                                    {" - "}
                                    {item[props.secondaryTextKey]}
                                </React.Fragment>
                                :
                                item[props.secondaryTextKey]
                            } />
                        </ListItem>
                    )
                }) :
                (
                    <ListItem key={0} disablePadding={props.disablePadding}>
                        <ListItemText primary="Invalid Data" secondary="Array Not Passed to List" />
                    </ListItem>
                )
            }
        </List>
    );
};

export default PMList2;

