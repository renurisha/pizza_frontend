import Button, { ButtonProps } from "@mui/material/Button";

export interface PMButtonProps {
  grid?: number;
  label: string;
}

const PMButton = (props: PMButtonProps & ButtonProps) => {
  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    // <div onClick={()=>handleClick()} className={`button-${props.grid}`}>
    <Button {...props}>{props.label}</Button>
    // </div>
  );
};

export default PMButton;
