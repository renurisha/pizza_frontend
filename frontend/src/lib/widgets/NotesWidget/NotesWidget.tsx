import { Box } from "@mui/material";
import { PMGrid, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
import { Variant } from "@mui/material/styles/createTypography";

export interface NotesWidgetProps {
    text?: string;
    textColor?: string;
    icon?: string;
    data: Object;
    content: Array<string>;
    variant?: Variant;
    columns?: number;
    columnSpacing?: number;
    rowSpacing?: number;
}

export const NotesWidget = (props: BaseWidgetProps & NotesWidgetProps) => {
    const { columns, columnSpacing, rowSpacing, content, variant, ...baseProps } = props;

    return (
        <BaseWidget {...baseProps}>
            <Box
                sx={{
                    display: "grid",
                    columnGap: columnSpacing,
                    rowGap: rowSpacing,
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                {content.map((line, index) => {
                    return (
                        <PMGrid key={index}>
                            <PMText variant={variant}>{line}</PMText>
                        </PMGrid>
                    );
                })}
            </Box>
        </BaseWidget>
    );
};

NotesWidget.defaultProps = {
    columns: 1,
    columnSpacing: 1,
    rowSpacing: 1,
    variant: "body1"
};

export default NotesWidget;
