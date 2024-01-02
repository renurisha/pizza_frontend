import { Icon, IconProps } from "@mui/material";

export interface PMIconProps extends IconProps  {
  icon: string,
  states?: Array<string>
}

export const PMIcon = (props: PMIconProps) => {

  let stateListClass = ''
  if (props.states) {
    props.states.map(element => {
      stateListClass += `button-${element} `
    });
  }
  return (
    <Icon {...props}>{props.icon}</Icon>
  )
};

PMIcon.defaultProps = {
  size: 'medium',
  states: ['hover']
};


export default PMIcon;