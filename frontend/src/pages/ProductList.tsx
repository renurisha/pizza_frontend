// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText, PMFormatterText } from "lib";
import { PMIcon } from "lib";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetAllProductsQuery } from "store/apiSlice";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
function ProductList() {
  // Hold page variables to avoid polluting variable space
  const { categoryId } = useParams();

  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const dispatch = useDispatch();

  const getAllProductsParams = {
    category_id: categoryId,
  };
  ({
    data: page.data.productListData,
    isFetching: page.data.productListDataIsFetching,
    isLoading: page.data.productListDataIsLoading,
  } = useGetAllProductsQuery(getAllProductsParams));

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "ProductList" }));
  }, []);
  [page.parameters.createdByData, page.parameters.createdByDataSet] =
    useState("");
  const [clickedProduct, setClickedProduct] = useState({});
  const [hover, setHover] = useState({});

  return (
    <div className="builder_wrapper">
      <PMGrid
        item={true}
        container={true}
        direction="column"
        background="#FFFFFF"
        padding="20px"
      >
        <PMGrid
          sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          <PMText>Categories</PMText>
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
          <div
            style={{
              width: Object.keys(clickedProduct)?.length ? "70%" : "100%",
              display: "grid",
              gridTemplateColumns: Object.keys(clickedProduct)?.length
                ? "33% 33% 33%"
                : "25% 25% 25% 25%",
              gap: "10px",
            }}
          >
            {page.data.productListData?.items?.map((productData, index) => (
              <Card
                style={{
                  width: "18rem",
                  filter: hover?.[index]
                    ? "brightness(50%)"
                    : "brightness(75%)",
                }}
                onMouseEnter={() => {
                  let obj = {};
                  obj[index] = true;
                  setHover({ ...hover, ...obj });
                }}
                onMouseLeave={() => {
                  let obj = {};
                  obj[index] = false;
                  setHover({ ...hover, ...obj });
                }}
              >
                <PMGrid sx={{ width: "100%", height: "200px" }}>
                  <Card.Img
                    variant="top"
                    src={productData?.image}
                    width="100%"
                    height="100%"
                  />
                </PMGrid>
                <Card.Body style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 10,
                      color: "red",
                    }}
                  >
                    <PMFormatterText
                      value={productData?.price}
                      formatType="currency"
                    ></PMFormatterText>
                  </div>
                  <Card.Title>{productData?.name}</Card.Title>
                  <Card.Text style={{ fontSize: "14px", color: "blue" }}>
                    {productData?.description}
                  </Card.Text>

                  <PMGrid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    marginBottom={3}
                  >
                    <Form.Select style={{ fontSize: "12px" }}>
                      {productData["size"]?.map((data) => (
                        <option
                          value={data}
                          onClick={(e) => {
                            if (clickedProduct[productData?.id]) {
                              let obj = {};
                              obj[productData?.id] = {
                                ...clickedProduct[productData?.id],
                                size: e.target.value,
                              };
                              setClickedProduct({ ...clickedProduct, ...obj });
                            }
                          }}
                        >
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select style={{ fontSize: "12px" }}>
                      {productData["toppings"]?.map((data) => (
                        <option
                          value={data}
                          onClick={(e) => {
                            if (clickedProduct[productData?.id]) {
                              let obj = {};
                              obj[productData?.id] = {
                                ...clickedProduct[productData?.id],
                                toppings: e.target.value,
                              };
                              setClickedProduct({ ...clickedProduct, ...obj });
                            }
                          }}
                        >
                          {data}
                        </option>
                      ))}
                    </Form.Select>{" "}
                  </PMGrid>

                  {clickedProduct?.[productData?.id] ? (
                    <PMGrid
                      sx={{
                        borderRadius: "6px",
                        width: "98%",
                        height: "40px",
                        backgroundColor: "red",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                        },
                      }}
                    >
                      <PMIcon
                        icon="add"
                        onClick={() => {
                          if (clickedProduct[productData?.id]) {
                            let obj = {};
                            obj[productData?.id] = {
                              ...clickedProduct[productData?.id],
                              quantity:
                                clickedProduct[productData?.id]?.["quantity"] +
                                1,
                            };
                            setClickedProduct({ ...clickedProduct, ...obj });
                          }
                        }}
                      ></PMIcon>

                      <PMText>
                        {clickedProduct?.[productData?.id]?.["quantity"]}
                      </PMText>

                      <PMIcon
                        icon="remove"
                        onClick={() => {
                          if (
                            clickedProduct?.[productData?.id] &&
                            clickedProduct?.[productData?.id]["quantity"] > 1
                          ) {
                            let obj = {};
                            obj[productData?.id] = {
                              ...clickedProduct[productData?.id],
                              quantity:
                                clickedProduct[productData?.id]?.["quantity"] -
                                1,
                            };
                            setClickedProduct({ ...clickedProduct, ...obj });
                          } else {
                            delete clickedProduct?.[productData?.id];
                            console.log("elseee", clickedProduct);
                            setClickedProduct({ ...clickedProduct });
                          }
                        }}
                      ></PMIcon>
                    </PMGrid>
                  ) : (
                    <PMGrid
                      sx={{
                        borderRadius: "6px",
                        width: "98%",
                        height: "40px",
                        backgroundColor: "red",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                        },
                      }}
                      onClick={() => {
                        if (!clickedProduct[productData?.id]) {
                          let obj = {};
                          obj[productData?.id] = {
                            quantity: 1,
                          };
                          setClickedProduct({ ...clickedProduct, ...obj });
                        }
                      }}
                    >
                      <PMText>Add</PMText>
                    </PMGrid>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
          <Card
            style={{
              width: "22%",
              display: Object.keys(clickedProduct).length ? "block" : "none",
              position: "relative",
              border: "none",
              padding: "15px",
            }}
          >
            {Object.keys(clickedProduct)
              .map((productId) => {
                let productData = page.data.productListData?.items.filter(
                  (prod) => prod?.id == productId
                );
                if (productData.length > 0) {
                  return productData[0];
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
                            console.log("addclicked11");
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
                            clickedProduct?.[selectedProducts?.id]["quantity"] >
                            1
                              ? "remove"
                              : "delete"
                          }
                          onClick={() => {
                            console.log("addclicked22");
                            if (
                              clickedProduct?.[selectedProducts?.id] &&
                              clickedProduct?.[selectedProducts?.id][
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

            <PMGrid
              sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
                background: "rgb(239, 245, 251)",
                position: "absolute",
                left: "0px",
                bottom: "0px",
                width: "100%",
                height: "5rem",
                padding: "10px",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px -0.56rem 0.62rem 0px",
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
                <PMText>Subtotal</PMText>{" "}
                <PMFormatterText
                  value={200}
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
                >
                  CHECKOUT
                </Button>
              </PMGrid>
            </PMGrid>
          </Card>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default ProductList;
