// @ts-nocheck
import { useSelector } from "react-redux";

import { Backdrop, CircularProgress } from "@mui/material";

export const ApiLoaderWidget = (props: LoaderWidgetProps) => {
    const isPending = (q) => q.status === "pending";
    const isApiLoading = useSelector((state) => {
            return Object.values(state.api.queries).some(isPending) || Object.values(state.api.mutations).some(isPending)
        }
    );
    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isApiLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default ApiLoaderWidget;
