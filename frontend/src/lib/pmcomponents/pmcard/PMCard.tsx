import Card, { CardProps } from "@mui/material/Card";
import "./PMCard.scss";
import ButtonBase from '@mui/material/ButtonBase';
import { CardContent } from "@mui/material";

export interface PMCardProps {
  bgColor?: string
  onClick?: Function
}

const PMCard = (props: PMCardProps & CardProps) => {
    return (
        <Card {...props}>
            <CardContent>{props.children}</CardContent>
        </Card>
    );
};

export default PMCard;