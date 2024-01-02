import Stack, { StackProps } from "@mui/material/Stack";

export interface PMStackProps extends StackProps {
}

export const PMStack = (props: PMStackProps) => {

  return (
      <Stack {...props}>{props.children}</Stack>
  );
};

PMStack.defaultProps = {
    direction: { xs: 'column', sm: 'row' },
    spacing: 2,
    alignItems: "center"
}

export default PMStack;