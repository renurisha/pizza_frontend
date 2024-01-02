import { PMTable } from "../../pmcomponents";
import {BaseWidget, BaseWidgetProps } from "../BaseWidget";
import {PMTableProps} from "../../pmcomponents/pmtable/PMTable"

export interface TableWidgetProps extends BaseWidgetProps {
}

export const TableWidget = (props: TableWidgetProps & PMTableProps) => {
    const {rows, columns, tableParams, tableApi, ...baseProps} = props

    return (
        <BaseWidget {...baseProps} bodyPadding={0}>
            <PMTable {...props}/>
        </BaseWidget>
    )
}

TableWidget.defaultProps = {
}

export default TableWidget