// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText } from "lib";

import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "Home" }));
  }, []);
  [page.parameters.createdByData, page.parameters.createdByDataSet] =
    useState("");

  return (
    <div className="builder_wrapper">
      <PMGrid
        item={true}
        container={true}
        direction="column"
        background="#FFFFFF"
      >
        <PMGrid container={true} direction="row" background="#FFFFFF">
          <PMText
            marginBottom={1}
            color="info"
            children="Welcome To Home page"
          ></PMText>
        </PMGrid>
        <PMGrid
          sx={{
            width: "200px",
            height: "200px",
            margin: "auto",
            boxShadow: "5px 10px gray",
            transform: "translate(30px, 20px) rotate(45deg)",
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
            src="https://cdn.create.vista.com/api/media/small/14102752/stock-photo-supreme-pizza-lifted-slice-with-tuna-and-paprika-isolated-over-white-background"
            width="100%"
            height="100%"
          ></img>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default Home;
