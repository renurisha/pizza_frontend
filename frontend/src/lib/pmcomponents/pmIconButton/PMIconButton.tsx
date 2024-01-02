import { Box, Icon, IconProps } from "@mui/material";
import Typography from "@mui/material/Typography";
export interface PMIconButtonProps extends IconProps {
  icon: string;
  label?: string;
  variant?: string;
  width?: any;
  height?: any;
}
export const PMIconButton = (props: PMIconButtonProps) => {
  const { width, height, label, icon } = props;
  if (props?.variant === "contained") {
    return (
      <Box
        {...props}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          border: "0.5px solid #e5e5e5",
          width: width ? width : 150,
          height: height ? height : 60,
          borderRadius: 2,

          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#42a5f5",
            border: "2px solid #42a5f5",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            "& .addColor": {
              color: "white",
              width: "55%",

              transitionTimingFunction: "ease-out",
              transition: "0.1s",
              fontSize: 18,
            },
            "& .iconColor": {
              width: "20%",
              transitionTimingFunction: "ease-in",
              transition: "0.2",
            },
          },
        }}
      >
        <Icon
          className="iconColor"
          sx={{
            color: "white",
            backgroundColor: "#42a5f5",
            height: "110%",
            width: "25%",
            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            transitionTimingFunction: "ease-in",
            transition: "0.2s",
            marginBottom: "5px",
          }}
        >
          {icon}
        </Icon>
        <Typography
          className="addColor"
          variant="h5"
          align="center"
          sx={{
            color: `${props.color}.main`,
            height: "100%",
            width: "75%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,

            transitionTimingFunction: "ease-out",
            transition: "0.2s",
          }}
        >
          {"" + props?.label ? props?.label : "Back"}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          width: width ? width : 80,
          height: height ? height : 60,

          color: "#42a5f5",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Icon sx={{ marginBottom: "5px" }}>{icon}</Icon>
        <Typography>{"" + label ? label : "Back"}</Typography>
      </Box>
    );
  }
};

PMIconButton.defaultProps = {
  size: "medium",
  states: ["hover"],
};
export default PMIconButton;
