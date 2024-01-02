import Typography, { TypographyProps } from "@mui/material/Typography";
import { PropsWithChildren } from "react";
import "./PMText.scss";


const PMText = (props: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography {...props}>{''+props.children}</Typography>
  );
};

export default PMText;