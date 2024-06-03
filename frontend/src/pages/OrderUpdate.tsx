// @ts-nocheck

import { useEffect, useState } from "react";
import {
  PMGrid,
  PMIconButton,
  DetailWidget,
  FormWidget,
  NotesWidget,
} from "lib";

import { jsonToFormData } from "helperFn/formData";
import { useSnackbar } from "notistack";
import { errorSerializer } from "helperFn/errorSerializer";

import {
  useOrderUpdateMutation,
  useOrderGetByIdQuery,
  useGetAllUsersQuery,
} from "store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";

function OrderUpdate() {
  // Hold page variables to avoid polluting variable space
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const { orderId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [orderUpdateMutationTrigger, orderUpdateMutationResult] =
    useOrderUpdateMutation();
  const history = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "Update Order" }));
  }, []);
  const getAllUsersParams = {
    is_staff: true,
  };
  ({
    data: page.data.allEmployees,
    isFetching: page.data.allEmployeesIsFetching,
    isLoading: page.data.allEmployeesIsLoading,
  } = useGetAllUsersQuery(getAllUsersParams));
  const OrdersParams = {
    id: orderId,
  };
  ({
    data: page.data.orderDetail,
    isFetching: page.data.orderDetailIsFetching,
    isLoading: page.data.orderDetailIsLoading,
  } = useOrderGetByIdQuery(OrdersParams));

  console.log("allEmployesss", page.data.allEmployees);
  const showSuccessAlert = (data) => {
    enqueueSnackbar("Order Updated Successfully", { variant: "success" });
  };

  const orderNavigate = () => {
    history("/allOrders");
  };

  const orderUpdateApi = async (data) => {
    var apiData = data;
    apiData = {
      order_status: apiData["order_status"],
      user_id: apiData["user_id"],
      payment_id: apiData["payment_id"],
      coupon_code: apiData["coupon_code"],
      discount: apiData["discount"],
      assignee_id: apiData["assignee_id"],
    };
    console.log("datatata", data);

    if (apiData) {
      orderUpdateMutationTrigger({
        id: data["id"],
        data: apiData,
      })
        .unwrap()
        .then((data) => {
          showSuccessAlert(data);
          orderNavigate(data);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(errorSerializer(error), { variant: "error" });
        });
    }
  };

  const orderManageDetails = (data) => {
    orderUpdateApi(data);
  };

  const moveToBack = (data) => {
    history("/leadDetails" + "/" + page.parameters.route.id);
  };

  const backToPage = (data) => {
    moveToBack(data);
  };

  return (
    <div className="builder_wrapper">
      <PMGrid marginBottom={2}>
        <PMIconButton
          label="Back"
          icon="arrow_back"
          color="primary"
          onClick={backToPage}
        ></PMIconButton>
      </PMGrid>

      <PMGrid container={true}>
        <PMGrid container={true}>
          <DetailWidget
            direction="row"
            columns={3}
            marginTop={2}
            md={12}
            fields={[
              {
                label: "User Name",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.user?.username
                  : "",
              },

              {
                label: "Email",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.user?.email
                  : "",
              },
              {
                label: "Phone Number",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.user?.phone_number
                  : "",
              },
              {
                label: "Address",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.user?.address
                  : "",
              },
              {
                label: "Bank Name",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.bank_name
                  : "",
              },
              {
                label: "Account Number",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.account_number
                  : "",
              },
              {
                label: "IFSC Code",
                value: page.data?.orderDetail
                  ? page.data?.orderDetail?.payment?.ifsc_code
                  : "",
              },
            ]}
          ></DetailWidget>

          <FormWidget
            defaultValues={page?.data?.orderDetail}
            submitButtonLabel="Submit"
            header="Order Details"
            fullWidth="true"
            Onsubmit={orderManageDetails}
            fieldsets={[
              {
                fieldsetIndex: false,
                direction: "row",
                fields: [
                  {
                    label: "Order Status",
                    name: "order_status",

                    type: "select",
                    required: true,
                    md: 4,
                    options: [
                      { id: "PENDING", label: "Pending" },
                      { id: "INTRANSIT", label: "In-Transit" },
                      { id: "DELIVERED", label: "Delivered" },
                    ],
                  },

                  {
                    label: "Assigned To",
                    name: "assignee_id",
                    type: "select",

                    required: true,
                    md: 4,
                    options:
                      page.data.allEmployees?.items.map((employeedata) => ({
                        ...employeedata,
                        label: employeedata?.username,
                        value: employeedata?.username,
                      })) || [],
                  },
                ],
              },
            ]}
          ></FormWidget>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default OrderUpdate;
