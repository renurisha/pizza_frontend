// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText, PMButton, PMIcon, PMFormatterText } from "lib";
import Form from "react-bootstrap/Form";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForwardIcon from "@mui/icons-material/Forward";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";
import { useGetUserOrdersQuery, useGetAllUsersQuery } from "store/apiSlice";
function Home() {
  // Hold page variables to avoid polluting variable space
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [logoutFlag, setLogoutFlag] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  [page.parameters.createdByData, page.parameters.createdByDataSet] =
    useState("");
  const [decodeParamsData, setDecodeParamsData] = useState("userId");

  const getAllUsersParams = {
    username: decodeParamsData,
  };
  ({
    data: page.data.loggedInUserDetails,
    isFetching: page.data.loggedInUserDetailsIsFetching,
    isLoading: page.data.loggedInUserDetailsIsLoading,
  } = useGetAllUsersQuery(getAllUsersParams));

  const getUserOrdersParams = {
    id: page.data.loggedInUserDetails?.items?.[0]?.id,
  };
  ({
    data: page.data.orderListData,
    isFetching: page.data.orderListDataIsFetching,
    isLoading: page.data.orderListDataIsLoading,
  } = useGetUserOrdersQuery(getUserOrdersParams));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    localStorage.removeItem("clickedProduct");
    setLogoutFlag(true);
  };

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "Home" }));
    if (localStorage.getItem("accessToken")) {
      let decodeUsername = jwtDecode(
        localStorage.getItem("accessToken")
      )?.username;
      if (decodeUsername) {
        setDecodeParamsData(decodeUsername);
      }
    }
  }, []);
  return (
    <div className="builder_wrapper">
      <PMGrid
        item={true}
        container={true}
        direction="column"
        background="#FFFFFF"
        margin={0}
        padding={0}
      >
        <PMButton
          onClick={() => {
            setDrawerOpen(true);
          }}
          label="Your Orders"
          icon="shopping_cart"
          sx={{
            color: "gray",
            fontSize: "16px",
            position: "absolute",
            top: 70,
            right: 5,
            border: "1px solid gray",
          }}
        ></PMButton>

        {/* <PMGrid
          sx={{
            width: "100%",
            height: "90px",
            backgroundColor: " #42a5f5",
            display: localStorage.getItem("accessToken") ? "flex" : "none",
            justifyContent: "space-between",
            paddingX: "20px",
          }}
        >
          <PMGrid>
            <PMText sx={{ color: "white" }}>Logo</PMText>
          </PMGrid>
          <PMGrid
            sx={{
              // width: "120px",
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              alignItems: "center",
              width: "380px",
            }}
          >
            <PMIcon
              icon="person"
              sx={{ color: "white", fontSize: "30px" }}
            ></PMIcon>
            <PMGrid
              sx={{
                marginLeft: "5px",
                height: "80%",
                paddingLeft: "5px",
              }}
            >
              <PMText sx={{ color: "white", fontSize: "18px" }}>
                {page.data?.loggedInUserDetails?.items?.[0]?.username}
              </PMText>
              <PMText sx={{ color: "white", fontSize: "18px" }}>
                {page.data.loggedInUserDetails?.items?.[0]?.email}
              </PMText>
            </PMGrid>
            <PMIcon
              onClick={() => {
                setDrawerOpen(true);
              }}
              icon="shopping_cart"
              sx={{ color: "white", fontSize: "30px" }}
            ></PMIcon>
            <PMButton
              label="Logout"
              sx={{ color: "white" }}
              onClick={() => {
                handleLogout();
              }}
            ></PMButton>
          </PMGrid>
        </PMGrid> */}
        {/* drawer */}

        <div
          style={{
            position: "absolute",
            top: 70,
            bottom: 0,
            right: 0,
            minHeight: "100vh !important",
            width: "500px",
            zIndex: 200,
            padding: "48px 0 0",
            paddingTop: "0px",
            boxShadow: "inset -1px 0 0 rgba(0, 0, 0, .1)",

            backgroundColor: "white",
            display: drawerOpen ? "flex" : "none",
          }}
        >
          <PMIcon
            icon="close"
            onClick={() => {
              setDrawerOpen(false);
            }}
            sx={{ position: "absolute", top: 5, right: 1 }}
          ></PMIcon>

          <PMGrid
            sx={{
              alignItems: "center",

              width: "500px",
            }}
          >
            <PMGrid
              sx={{
                justifyContent: "space-between",

                backgroundColor: "rgb(233, 248, 255)",
                display: "flex",
                height: "70px",

                alignItems: "center",

                width: "100%",
                textAlign: "center",
              }}
            >
              <PMText sx={{ fontSize: "16px", paddingLeft: "5px" }}>
                Your Orders
              </PMText>
            </PMGrid>
            <PMGrid>
              {page.data.orderListData?.items?.length &&
                page?.data?.orderListData?.items?.map((orderData, index) => (
                  <PMGrid>
                    <PMText>{`Order:  ${index + 1}`}</PMText>{" "}
                    {orderData?.orderItems?.map((orderIemsData) => (
                      <Card
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                        }}
                      >
                        <Card.Body>
                          <PMGrid
                            sx={{
                              width: "100%",

                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <PMGrid sx={{ width: "80px", height: "80px" }}>
                              <Card.Img
                                variant="top"
                                src={orderIemsData?.product?.image}
                                width="100%"
                                height="100%"
                              />
                            </PMGrid>
                            <PMGrid sx={{ marginLeft: "20px" }}>
                              <PMText sx={{ fontSize: "16px", color: "gray" }}>
                                {orderIemsData?.product?.name}
                              </PMText>
                              <PMText
                                sx={{ fontSize: "14px", marginTop: "16px" }}
                              >
                                {orderIemsData?.product?.description}
                              </PMText>
                            </PMGrid>
                          </PMGrid>
                          <PMGrid
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <PMGrid sx={{ color: "red" }}>
                              <PMFormatterText
                                value={orderIemsData?.product?.price}
                                formatType="currency"
                              ></PMFormatterText>
                              <PMText>{`Quantity: ${
                                orderIemsData?.quantity
                                  ? orderIemsData?.quantity
                                  : 1
                              } `}</PMText>
                            </PMGrid>
                            <PMGrid>
                              <PMText
                                sx={{ fontSize: "12px", color: "blue" }}
                              >{`Status:  ${orderData?.order_status}`}</PMText>
                              <PMText sx={{ fontSize: "12px" }}>{`Net Price: ${
                                orderIemsData?.quantity
                                  ? orderIemsData?.quantity *
                                    orderIemsData?.product?.price
                                  : 1 * orderIemsData?.product?.price
                              } `}</PMText>

                              {orderData?.discount ? (
                                <PMText>{`Discount: ${
                                  orderIemsData?.product?.price *
                                  (orderData?.discount / 100)
                                } `}</PMText>
                              ) : (
                                ""
                              )}

                              <PMText
                                sx={{ fontSize: "12px" }}
                              >{`Total Price: ${
                                orderIemsData?.quantity
                                  ? orderData?.discount
                                    ? orderIemsData?.quantity *
                                        orderIemsData?.product?.price -
                                      orderIemsData?.product?.price *
                                        (orderData?.discount / 100)
                                    : orderIemsData?.quantity *
                                      orderIemsData?.product?.price
                                  : orderData?.discount
                                  ? 1 * orderIemsData?.product?.price -
                                    orderIemsData?.product?.price *
                                      (orderData?.discount / 100)
                                  : 1 * orderIemsData?.product?.price
                              } `}</PMText>
                            </PMGrid>
                          </PMGrid>
                        </Card.Body>
                      </Card>
                    ))}
                  </PMGrid>
                ))}
            </PMGrid>
          </PMGrid>
        </div>

        <PMText
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            color: "red",
            marginTop: "10%",
            marginLeft: 2,
          }}
        >
          Welcome
        </PMText>
        <PMGrid
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
            padding: "50px",
          }}
        >
          <PMGrid sx={{ width: "60%" }}>
            <PMGrid
              sx={{
                width: "80%",
                heigh: "50px",
                display: "flex",
                border: "1px solid #42a5f5",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <PMIcon
                icon="search"
                sx={{ color: "#42a5f5", fontSize: "22px" }}
              ></PMIcon>
              <Form.Control
                type="text"
                placeholder="location"
                style={{
                  border: "none",
                  outline: "none",
                  borderLeft: "1px solid #42a5f5",
                  borderRadius: 0,
                }}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <PMButton
                label="SEARCH"
                variant="contained"
                sx={{ borderRadius: 0 }}
              ></PMButton>
            </PMGrid>
          </PMGrid>
          <PMGrid sx={{ width: "35%" }}>
            <PMGrid
              sx={{
                width: "400px",
                height: "350px",
                margin: "auto",
                borderRadius: "8px",
                overflow: "hidden",
                // boxShadow: "5px 10px gray",
                // transform: "translate(30px, 20px) rotate(45deg)",

                filter: "brightness(80%)",
                "&:hover": {
                  filter: "brightness(50%)",
                },
              }}
              onClick={() => {
                history("/category");
              }}
            >
              <img
                src="https://www.dominos.co.in/theme2/front/images/menu-images/my-vegpizza.webp"
                //   src="https://cdn.create.vista.com/api/media/small/14102752/stock-photo-supreme-pizza-lifted-slice-with-tuna-and-paprika-isolated-over-white-background"
                width="100%"
                height="100%"
              ></img>
            </PMGrid>
          </PMGrid>
        </PMGrid>

        <PMButton
          label="Order Now"
          endIcon={<ForwardIcon />}
          sx={{
            border: "1px solid blue",
            padding: "12px",
            width: "200px",
            backgroundColor: "blue",
            color: "white",
            marginLeft: "50px",
            margin: "auto",
            "&:hover": {
              color: "blue",
            },
          }}
          onClick={() => {
            history("/category");
          }}
        ></PMButton>

        <PMGrid
          sx={{
            position: "absolute",
            bottom: 15,
            right: 10,
            display: localStorage.getItem("accessToken") ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          <PMButton
            label="Login"
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "200px",
              marginBottom: "15px",
            }}
            onClick={() => {
              localStorage.removeItem("accessToken");
              history("/login");
            }}
          ></PMButton>
          <PMButton
            label="Signup"
            sx={{ backgroundColor: "red", color: "white", width: "200px" }}
          ></PMButton>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default Home;
