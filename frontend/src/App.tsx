// @ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./authComponent/AuthRoute";
import { ApiLoaderWidget } from "lib";
import { mergeStore } from "store/appSlice";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import {
  Home,
  Category,
  ProductList,
  SelectedProductPage,
  Login,
  AdminPanelOrders,
  OrderUpdate,
} from "./pages";
import { NavigationMenu } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const dispatch = useDispatch();
  const auth_token = localStorage.getItem("authToken");
  const userProfile = localStorage.getItem("userProfile");
  const permissionCodes = localStorage.getItem("permissionCodes");
  const authTokenstore = useSelector((states) => states?.appStore?.authToken);
  const userProfileStore = useSelector(
    (states) => states?.appStore?.userProfile
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApiLoaderWidget></ApiLoaderWidget>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Routes>
            {/* <Route path="/permission-denied" element={<PermissionDenied />}></Route>

                        <Route path="*" element={<PageNotFound />}></Route> */}

            <Route element={<NavigationMenu />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/allOrders" element={<AdminPanelOrders />}></Route>
              <Route
                path="/productList/:categoryId"
                element={<ProductList />}
              ></Route>

              <Route
                path="/selectedProducts/:categoryId"
                element={<SelectedProductPage />}
              ></Route>
              <Route
                path="/orderDetails/:orderId"
                element={<OrderUpdate />}
              ></Route>
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
