import Grid, { GridProps } from "@mui/material/Grid";
import "./PMGrid.scss";

export interface PMGridProps {
  bgColor?: string
  grid?: number
}

const PMGrid = (props: PMGridProps & GridProps) => {
    var {spacing, ...baseProps } = props;

    if (props.container == true && typeof(spacing) == "undefined") {
        // Default Spacing
        spacing = 2
    }

  return (
      <Grid {...baseProps} spacing={spacing} item className={`background-${props.bgColor}`}></Grid>
  );
};

export default PMGrid;