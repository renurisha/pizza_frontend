// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText, PMFormatterText, PMIconButton } from "lib";
import { useSnackbar } from "notistack";
import { PMIcon } from "lib";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { useGetAllProductsQuery, useGetAllUsersQuery } from "store/apiSlice";
import { useParams, useNavigate } from "react-router-dom";

import { Divider } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useUserUpdateMutation,
  usePaymentCreateMutation,
  useOrderCreateMutation,
  useOrderItemCreateMutation,
} from "store/apiSlice";
function SelectedProductPage() {
  // Hold page variables to avoid polluting variable space
  const { categoryId } = useParams();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [drawerOpen, setDrawerOpen] = useState(false);
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const dispatch = useDispatch();
  const [userUpdateMutationTrigger, userUpdateMutationResult] =
    useUserUpdateMutation();

  const [paymentCreateMutationTrigger, paymentCreateMutationResult] =
    usePaymentCreateMutation();
  const [orderCreateMutationTrigger, orderCreateMutationResult] =
    useOrderCreateMutation();
  const [orderItemCreateMutationTrigger, orderItemCreateMutationResult] =
    useOrderItemCreateMutation();
  const [userDetails, setUserDetails] = useState({});
  const [hover, setHover] = useState({});
  const [clickedProduct, setClickedProduct] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    bank_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllProductsParams = {
    category_id: categoryId,
  };
  ({
    data: page.data.productListData,
    isFetching: page.data.productListDataIsFetching,
    isLoading: page.data.productListDataIsLoading,
  } = useGetAllProductsQuery(getAllProductsParams));

  if (localStorage.getItem("accessToken")) {
    let decodeUsername = jwtDecode(
      localStorage.getItem("accessToken")
    )?.username;
    if (decodeUsername) {
      const getAllUsersParams = {
        username: decodeUsername,
      };
      ({
        data: page.data.loggedInUserDetails,
        isFetching: page.data.loggedInUserDetailsIsFetching,
        isLoading: page.data.loggedInUserDetailsIsLoading,
      } = useGetAllUsersQuery(getAllUsersParams));
    }
  }

  const updateUserDetails = () => {
    let apidata = { address: address };
    if (apidata) {
      userUpdateMutationTrigger({
        id: page.data.loggedInUserDetails?.items?.[0]?.id,
        data: apidata,
      })
        .unwrap()
        .then((data) => {
          handleShow();
        })
        .catch((error) => {
          enqueueSnackbar(errorSerializer(error), { variant: "error" });
        });
    }
  };

  const showSuccessAlert = (data) => {
    enqueueSnackbar("Order Placed Successfully.", { variant: "success" });
  };
  const creatOrderItem = (orderData) => {
    Object.keys(clickedProduct)?.forEach((prod, index) => {
      orderItemCreateMutationTrigger({
        order_id: orderData?.id,
        product_id: prod,
        quantity: clickedProduct[prod]?.["quantity"],
      })
        .unwrap()
        .then((data) => {
          if (index == Object.keys(clickedProduct)?.length - 1) {
            showSuccessAlert(data);
            handleClose();
            history("/");
          }
        })
        .catch((error) => {
          enqueueSnackbar(errorSerializer(error), { variant: "error" });
        });
    });
  };

  const createOrder = (data) => {
    orderCreateMutationTrigger({
      payment_id: data?.id,
      order_status: "PENDING",
      user_id: page.data.loggedInUserDetails?.items?.[0]?.id,
      coupon_code: promoCode && promoCode == "PERMUTEHQ" ? "PERMUTEHQ" : "",
      discount: promoCode && promoCode == "PERMUTEHQ" ? 25 : 0,
    })
      .unwrap()
      .then((data) => {
        creatOrderItem(data);
      })
      .catch((error) => {
        enqueueSnackbar(errorSerializer(error), { variant: "error" });
      });
  };

  const handlePayment = () => {
    if (Object.values(paymentDetails).includes("")) {
      alert("please fill all details");
      return;
    }
    if (paymentDetails) {
      paymentCreateMutationTrigger({
        ...paymentDetails,
        user_id: page.data.loggedInUserDetails?.items?.[0]?.id,
      })
        .unwrap()
        .then((data) => {
          createOrder(data);
        })
        .catch((error) => {
          enqueueSnackbar(errorSerializer(error), { variant: "error" });
        });
    }
  };
  const handleBack = () => {
    history(-1);
  };

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "SelectedProductPage" }));

    if (
      !Object.keys(clickedProduct).length ||
      { ...JSON.parse(localStorage.getItem("clickedProduct")) } ==
        clickedProduct
    ) {
      setClickedProduct({
        ...JSON.parse(localStorage.getItem("clickedProduct")),
      });
    } else {
      localStorage.removeItem("clickedProduct");
      localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));
    }
  }, [localStorage.getItem("clickedProduct"), clickedProduct]);

  const handleChange = (e) => {
    let obj = {};
    obj[e.target.id] = e.target.value;
    setPaymentDetails({ ...paymentDetails, ...obj });
  };

  return (
    <div className="builder_wrapper">
      <Modal show={show} onHide={handleClose} style={{ marginTop: "50px" }}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                autoFocus
                id="bank_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="account number"
                id="account_number"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="IFSC Code"
                autoFocus
                id="ifsc_code"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          position: "absolute",
          top: 100,
          bottom: 0,
          right: 0,
          minHeight: "100vh !important",
          width: "350px",
          zIndex: 100,
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

            width: "100%",
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
              {localStorage.getItem("accessToken") &&
              page.data?.loggedInUserDetails?.items?.length
                ? "Logged User Details"
                : "Loin "}
            </PMText>
          </PMGrid>

          {localStorage.getItem("accessToken") &&
          page.data?.loggedInUserDetails?.items?.length ? (
            <PMGrid
              sx={{
                border: "1px solid gray",
                padding: "14px",
                margin: "4px",
                marginTop: 2,
              }}
            >
              <PMText
                sx={{ fontSize: "14px" }}
              >{`UserName:    ${page.data?.loggedInUserDetails?.items?.[0]?.username}`}</PMText>
              <PMText
                sx={{ fontSize: "14px" }}
              >{`Email:       ${page.data?.loggedInUserDetails?.items?.[0]?.email}`}</PMText>
              <PMText
                sx={{ fontSize: "14px" }}
              >{`Phone:       ${page.data?.loggedInUserDetails?.items?.[0]?.phone_number}`}</PMText>
              {page.data?.loggedInUserDetails?.items?.[0]?.address ? (
                <PMText
                  sx={{ fontSize: "14px" }}
                >{`Address:    ${page.data?.loggedInUserDetails?.items?.[0]?.address}`}</PMText>
              ) : (
                ""
              )}
            </PMGrid>
          ) : (
            <PMGrid
              sx={{
                padding: "14px",
                margin: "4px",
                marginTop: 2,
              }}
            >
              <u>
                <i>
                  <PMText
                    sx={{
                      color: "blue",
                      marginBottom: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history("/login");
                    }}
                  >
                    Click To Login
                  </PMText>
                </i>
              </u>

              <u>
                <i>
                  <PMText
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      history("/signup");
                    }}
                  >
                    Create New Account
                  </PMText>
                </i>
              </u>
            </PMGrid>
          )}
        </PMGrid>
      </div>

      <PMGrid
        item={true}
        container={true}
        direction="column"
        background="#FFFFFF"
        padding="20px"
        width="100%"
      >
        <PMGrid
          sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          <PMText>Items</PMText>
        </PMGrid>
        <PMGrid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%",
          }}
        >
          <PMIconButton
            icon="arrow_back"
            label="Back"
            onClick={handleBack}
          ></PMIconButton>
          <PMIconButton
            icon="person"
            label="User Details"
            width={150}
            onClick={() => {
              setDrawerOpen(true);
            }}
          ></PMIconButton>
        </PMGrid>

        <PMGrid
          container={true}
          direction="row"
          background="#FFFFFF"
          marginTop={2}
          marginLeft={2}
          marginRight={2}
          sx={{ justifyContent: "space-around" }}
        >
          <Card
            style={{
              width: "60%",

              border: "none",
              padding: "15px",
            }}
          >
            <PMText sx={{ fontSize: "16px", marginBottom: "15px" }}>{`${
              Object.values(clickedProduct)?.length
                ? Object.values(clickedProduct)
                    ?.map((valuesData) => valuesData?.quantity)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                : 0
            } Items you have selected`}</PMText>
            {Object.keys(clickedProduct)
              .map((productId) => {
                let productData = page.data.productListData?.items.filter(
                  (prod) => prod?.id == productId
                );
                if (productData?.length > 0) {
                  return productData?.[0];
                }
              })
              .map((selectedProducts) => (
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
                          src={selectedProducts?.image}
                          width="100%"
                          height="100%"
                        />
                      </PMGrid>
                      <PMGrid sx={{ marginLeft: "20px" }}>
                        <PMText sx={{ fontSize: "16px", color: "gray" }}>
                          {selectedProducts?.name}
                        </PMText>
                        <PMText sx={{ fontSize: "14px", marginTop: "16px" }}>
                          {selectedProducts?.description}
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
                      <PMGrid
                        sx={{
                          borderRadius: "6px",
                          width: "160px",
                          height: "40px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",

                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                        }}
                      >
                        <PMIcon
                          icon="add"
                          onClick={() => {
                            if (clickedProduct[selectedProducts?.id]) {
                              let obj = {};
                              obj[selectedProducts?.id] = {
                                ...clickedProduct[selectedProducts?.id],
                                quantity:
                                  clickedProduct[selectedProducts?.id]?.[
                                    "quantity"
                                  ] + 1,
                              };
                              setClickedProduct({ ...clickedProduct, ...obj });
                            }
                          }}
                        ></PMIcon>

                        <PMText>
                          {clickedProduct?.[selectedProducts?.id]?.["quantity"]}
                        </PMText>

                        <PMIcon
                          icon={
                            clickedProduct?.[selectedProducts?.id]?.[
                              "quantity"
                            ] > 1
                              ? "remove"
                              : "delete"
                          }
                          onClick={() => {
                            if (
                              clickedProduct?.[selectedProducts?.id] &&
                              clickedProduct?.[selectedProducts?.id]?.[
                                "quantity"
                              ] > 1
                            ) {
                              let obj = {};
                              obj[selectedProducts?.id] = {
                                ...clickedProduct[selectedProducts?.id],
                                quantity:
                                  clickedProduct[selectedProducts?.id]?.[
                                    "quantity"
                                  ] - 1,
                              };
                              setClickedProduct({ ...clickedProduct, ...obj });
                            } else {
                              delete clickedProduct?.[selectedProducts?.id];

                              setClickedProduct({ ...clickedProduct });
                            }
                          }}
                        ></PMIcon>
                      </PMGrid>
                      <PMGrid sx={{ color: "red" }}>
                        <PMFormatterText
                          value={
                            selectedProducts?.price *
                            clickedProduct[selectedProducts?.id]?.["quantity"]
                          }
                          formatType="currency"
                        ></PMFormatterText>
                      </PMGrid>
                    </PMGrid>
                  </Card.Body>
                </Card>
              ))}
          </Card>
          <Card style={{ width: "20%", border: "none", padding: "20px" }}>
            {page.data?.loggedInUserDetails?.items?.[0]?.address ? (
              <Card style={{ marginBottom: "20px", padding: "20px" }}>
                <PMText sx={{ fontSize: "16px", colo: "green" }}>
                  Address Details
                </PMText>
                <Divider></Divider>
                <PMText
                  sx={{
                    marginTop: "12px",
                    fontStyle: "italic",
                    color: "gray",
                    fontWeight: 600,
                  }}
                >
                  {page.data?.loggedInUserDetails?.items?.[0]?.address}
                </PMText>
              </Card>
            ) : (
              ""
            )}

            <Card style={{ marginBottom: "20px", padding: "20px" }}>
              <PMText sx={{ fontSize: "16px", colo: "green" }}>
                {page.data?.loggedInUserDetails?.items?.[0]?.address
                  ? "Add New Address"
                  : "Add Address"}
              </PMText>
              <Divider></Divider>
              <Form.Control
                as="textarea"
                rows={3}
                id="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                aria-describedby="passwordHelpBlock"
              />
            </Card>

            <PMText sx={{ fontSize: "16px", colo: "green" }}>
              Price Details
            </PMText>
            <Card style={{ width: "100%" }}>
              <PMGrid
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "center",

                  left: "0px",

                  padding: "10px",
                }}
              >
                <PMGrid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <PMText sx={{ fontSize: "14px" }}>SUBTOTAL</PMText>
                  <PMFormatterText
                    value={Object.keys(clickedProduct)
                      .map((productId) => {
                        let productData =
                          page.data.productListData?.items.filter(
                            (prod) => prod?.id == productId
                          );
                        if (productData?.length > 0) {
                          return (
                            clickedProduct?.[productId]?.["quantity"] *
                            productData?.[0]?.price
                          );
                        }
                      })
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )}
                    formatType="currency"
                  ></PMFormatterText>
                </PMGrid>

                {/* promo code */}

                <PMGrid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <PMText sx={{ fontSize: "14px" }}>PROMOCODE</PMText>
                  <PMText sx={{ fontSize: "14px", color: "red" }}>
                    {promoCode && promoCode == "PERMUTEHQ"
                      ? "Coupon Applied "
                      : ""}
                  </PMText>
                </PMGrid>
                {/* discount */}
                <PMGrid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <PMText sx={{ fontSize: "14px" }}>DISCOUNT</PMText>
                  <PMText sx={{ fontSize: "16px", color: "red" }}>
                    {promoCode && promoCode == "PERMUTEHQ" ? "25%" : "0%"}
                  </PMText>
                </PMGrid>
                <Divider></Divider>
                <PMGrid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <PMText sx={{ fontSize: "14px" }}>TOTAL</PMText>
                  <PMFormatterText
                    value={
                      promoCode && promoCode == "PERMUTEHQ"
                        ? Object.keys(clickedProduct)
                            .map((productId) => {
                              let productData =
                                page.data.productListData?.items.filter(
                                  (prod) => prod?.id == productId
                                );
                              if (productData.length > 0) {
                                return (
                                  clickedProduct[productId]["quantity"] *
                                  productData?.[0]?.price
                                );
                              }
                            })
                            .reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0
                            ) *
                          (25 / 100)
                        : Object.keys(clickedProduct)
                            .map((productId) => {
                              let productData =
                                page.data.productListData?.items.filter(
                                  (prod) => prod?.id == productId
                                );
                              if (productData?.length > 0) {
                                return (
                                  clickedProduct?.[productId]?.["quantity"] *
                                  productData?.[0]?.price
                                );
                              }
                            })
                            .reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0
                            )
                    }
                    formatType="currency"
                  ></PMFormatterText>
                </PMGrid>
                <PMGrid>
                  <Button
                    style={{
                      bottom: "0px",
                      cursor: "pointer",
                      padding: "0.7em 1.5em",
                      width: "98%",
                      height: "2.5rem",
                      background: "rgb(130, 187, 55)",
                      color: "rgb(255, 255, 255)",
                      margin: "auto",
                      border: "none",
                    }}
                    onClick={() => {
                      if (!localStorage.getItem("accessToken")) {
                        setDrawerOpen(true);
                      } else if (
                        !page.data?.loggedInUserDetails?.items?.[0]?.address &&
                        !address
                      ) {
                        alert("please Enter Address");
                      } else {
                        if (address) {
                          updateUserDetails();
                        } else {
                          handleShow();
                        }

                        // history("/payment");
                      }
                    }}
                  >
                    PLACE ORDER
                  </Button>
                </PMGrid>
              </PMGrid>
            </Card>

            <PMGrid marginTop={2}>
              <Form.Label
                htmlFor="inputPassword5"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Enter Promocode
              </Form.Label>
              <Form.Control
                type="text"
                id="promocode"
                onChange={(e) => {
                  setPromoCode(e.target.value);
                }}
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text
                id="passwordHelpBlock"
                muted
                style={{ marginTop: "10px", fontStyle: "italic" }}
              >
                {promoCode
                  ? promoCode == "PERMUTEHQ"
                    ? "Promo Code Applied"
                    : "Invaid Promocode"
                  : "Enter Promo code for PermuteHQ team Only"}
              </Form.Text>
            </PMGrid>
          </Card>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default SelectedProductPage;
