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
import jwt_decode from "jwt-decode";
import { Home, Category, ProductList } from "./pages";
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

  if (auth_token) {
    localStorage.setItem(
      "permissionCodes",
      JSON.stringify(jwt_decode(auth_token)["permission_codes"])
    );
  }
  if (userProfileStore && !userProfile) {
    localStorage.setItem("userProfile", userProfileStore || "");
  } else if (!userProfileStore && userProfile) {
    var formatedData = {
      userProfile: userProfile || "",
    };
    dispatch(mergeStore(formatedData));
  }

  if (authTokenstore && !auth_token) {
    localStorage.setItem("authToken", authTokenstore);
    localStorage.setItem(
      "permissionCodes",
      JSON.stringify(jwt_decode(authTokenstore)?.permission_codes)
    );
  } else if (!authTokenstore && auth_token) {
    var formatedData = {
      authToken: auth_token,
    };

    localStorage.setItem(
      "permissionCodes",
      JSON.stringify(jwt_decode(auth_token)["permission_codes"])
    );
    dispatch(mergeStore(formatedData));
  }
  const authToken = authTokenstore ? authTokenstore : auth_token;
  if (authToken) {
    var decoded = jwt_decode(authToken);
    if (Date.now() > decoded.exp * 1000) {
      localStorage.clear();
    }
  } else {
    localStorage.clear();
  }

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
              <Route path="/" element={<Home />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route
                path="/productList/:categoryId"
                element={<ProductList />}
              ></Route>
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
