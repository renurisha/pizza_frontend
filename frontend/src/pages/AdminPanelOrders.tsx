// @ts-nocheck

import { useEffect, useState } from "react";
import {
  PMGrid,
  TableWidget,
  NotesWidget,
  StatsCardWidget2,
  FilterWidget,
  PMButton,
  PMText,
} from "lib";

import { useSnackbar } from "notistack";

import { useEmployeeFetchQuery } from "store/apiSlice";
import { useNavigate } from "react-router-dom";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";

import { useLeadListApiQuery, useGetAllOrdersQuery } from "store/apiSlice";

function AdminPanelOrders() {
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const history = useNavigate();
  const dispatch = useDispatch();
  const [orderStatusValue, setOrderStatusValue] = useState("PENDING");

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "All Placed Orders" }));
  }, []);

  [page.parameters.leadListFilters, page.parameters.leadListFiltersSet] =
    useState({});
  [
    page.parameters.productListPagination,
    page.parameters.productListPaginationSet,
  ] = useState({ size: 50 });

  const allOrdersParams = {
    ...page.parameters.leadListFilters,
    ...page.parameters.leadListPagination,
    order_status: orderStatusValue,
  };
  ({
    data: page.data.allOrdersData,
    isFetching: page.data.allOrdersDataDataIsFetching,
    isLoading: page.data.allOrdersDataDataIsLoading,
  } = useGetAllOrdersQuery(allOrdersParams));

  const filterChange = (data) => {
    updateFilterParams(data);
  };

  const handleOrderStatus = (val) => {
    setOrderStatusValue(val);
  };

  console.log("handleOrderStatus", orderStatusValue);
  return (
    <div className="builder_wrapper">
      <PMGrid container={true} marginTop={10} marginBottom={2} marginLeft={4}>
        <PMText
          sx={{ color: "#42a5f5", fontSize: "18px", marginRight: "12px" }}
        >
          Order Status:
        </PMText>
        <PMButton
          sx={{
            border:
              orderStatusValue === "PENDING" ? "1px solid #42a5f5" : "none",
          }}
          label="PENDING"
          onClick={() => {
            handleOrderStatus("PENDING");
          }}
        ></PMButton>
        <PMButton
          label="INTRANSIT"
          sx={{
            border:
              orderStatusValue === "INTRANSIT" ? "1px solid #42a5f5" : "none",
          }}
          onClick={() => {
            handleOrderStatus("INTRANSIT");
          }}
        ></PMButton>
        <PMButton
          label="DELIVERED"
          sx={{
            border:
              orderStatusValue === "DELIVERED" ? "1px solid #42a5f5" : "none",
          }}
          onClick={() => {
            handleOrderStatus("DELIVERED");
          }}
        ></PMButton>
        <PMButton
          label="REJECTED"
          sx={{
            border: orderStatusValue === "CANCLED" ? "1px solid red" : "none",
            color: "red",
          }}
          onClick={() => {
            handleOrderStatus("CANCLED");
          }}
        ></PMButton>
      </PMGrid>

      <PMGrid container={true} marginY={2}>
        <TableWidget
          paddingRight={2}
          showSerialNumber={false}
          xs={12}
          tableApi={page.data.allOrdersData || []}
          tableParams={[
            page.parameters.productListPagination,
            page.parameters.productListPaginationSet,
          ]}
          columns={[
            {
              field: "payment.user.username",
              headerName: "User Name",
              sortable: false,
            },
            {
              field: "payment.user.email",
              headerName: "Email Id",
              sortable: false,
            },

            {
              field: "payment.user.phone_number",
              headerName: "Phone Number",
              sortable: false,
            },
            {
              field: "order_status",
              headerName: "Order Status",
              type: "enum",
              sortable: false,
            },
            {
              field: "assignee.username",
              headerName: "Assigneed To",

              sortable: false,
            },

            {
              field: "",
              headerName: "Actions",
              type: "view",
              url: "/orderDetails",
              flex: 0.6,
              condition: [],
            },
          ]}
        ></TableWidget>
      </PMGrid>
    </div>
  );
}
export default AdminPanelOrders;
