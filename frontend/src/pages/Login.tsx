// // @ts-nocheck

// @ts-nocheck

import { useEffect, useState } from "react";
import { PMGrid, PMText } from "lib";
import { errorSerializer } from "helperFn/errorSerializer";
import { setStore } from "store/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLoginApiMutation } from "store/apiSlice";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
function Login() {
  // Hold page variables to avoid polluting variable space
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginApiMutationTrigger, loginApiMutationResult] =
    useLoginApiMutation();

  const afterLogin = (data) => {
    history("/category");
  };
  const loginApi = async (data) => {
    var apiData = data;

    console.log("apiDataloginnn", apiData, apiData instanceof FormData);
    if (apiData) {
      loginApiMutationTrigger(apiData)
        .unwrap()
        .then((data) => {
          console.log("datatat", data, data?.detail);
          if (data?.status_code == 400) {
            enqueueSnackbar(errorSerializer(data), {
              variant: "error",
            });
          } else {
            localStorage.setItem("accessToken", data?.access_token);
            if (data?.access_token) {
              let decodeUsername = jwtDecode(data?.access_token)?.username;
              console.log("decodeUsername", decodeUsername);
              if (decodeUsername === "ADMIN") {
                history("/allOrders");
              } else {
                afterLogin();
              }
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
          enqueueSnackbar(errorSerializer(error), { variant: "error" });
        });
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please Enter details");
      return;
    } else {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      // console.log("formDatalogin", formData);

      console.log("formData", formData instanceof FormData, formData);
      loginApi(formData);
    }
  };

  useEffect(() => {
    dispatch(setStore({ currentPageTitle: "Login" }));
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
          <PMText marginBottom={1} color="info" children="SignIn"></PMText>
        </PMGrid>
        <PMGrid
          sx={{
            width: "50%",

            margin: "auto",
          }}
        >
          <Form onSubmit={handleLogin}>
            <Form.Label>Login Form</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              // onClick={() => {
              //   handleLogin();
              // }}
            >
              Submit
            </Button>
          </Form>
        </PMGrid>
      </PMGrid>
    </div>
  );
}
export default Login;
