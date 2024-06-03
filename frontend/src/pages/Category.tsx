// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText } from "lib";

import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetAllCategoryQuery } from "store/apiSlice";
import { useNavigate } from "react-router-dom";
function Category() {
  // Hold page variables to avoid polluting variable space
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const dispatch = useDispatch();
  const history = useNavigate();

  const getAllCategoryParams = {};
  ({
    data: page.data.categoryListData,
    isFetching: page.data.categoryListDataIsFetching,
    isLoading: page.data.categoryListDataIsLoading,
  } = useGetAllCategoryQuery(getAllCategoryParams));

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "Category" }));
  }, []);
  [page.parameters.createdByData, page.parameters.createdByDataSet] =
    useState("");

  const [hover, setHover] = useState({});
  console.log("hoverr", hover);
  return (
    <div className="builder_wrapper">
      <PMGrid
        item={true}
        container={true}
        direction="column"
        background="#FFFFFF"
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "22% 22% 22% 22%",
            gap: "20px",
            marginTop: 100,
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          {page.data.categoryListData?.items?.map((categoryData, index) => (
            <Card
              style={{
                width: "18rem",
                filter: hover?.[index] ? "brightness(50%)" : "brightness(75%)",
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
              onClick={() => {
                history(`/productList/${categoryData?.id}`);
              }}
            >
              <Card.Img variant="top" src={categoryData?.image} />
              <Card.Body>
                <Card.Title>{categoryData?.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </PMGrid>
    </div>
  );
}
export default Category;
