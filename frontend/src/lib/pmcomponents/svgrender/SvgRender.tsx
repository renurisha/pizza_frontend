import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
// import * as Icons from "../../SideNavbarIcons/";

export interface PMSvgProps {
  icon: any;
  color: string;
}

const Icons = {
  icon: "",
};

const SvgRender = (props: PMSvgProps & SvgIconProps) => {
  return <SvgIcon component={Icons[props?.icon]} sx={{ fill: props?.color }} />;
};

export default SvgRender;
