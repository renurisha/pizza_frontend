// @ts-nocheck

import { Outlet, PMMenu } from "lib";

import { useNavigate } from "react-router-dom";
function NavigationMenu() {
  // Hold page variables to avoid polluting variable space
  var page = {
    data: {},
    parameters: {
      route: {},
    },
  };

  const history = useNavigate();
  page.data.menuItems = [
    {
      text: "Home",
      url: "/",
      icon: {
        icon: "homeOutlined",
        text_color: "info",
        size: "large",
      },
    },
  ];

  //   const MenuHomeNavigate = (data) => {
  //     history("" + "" + data["url"]);
  //   };

  const MenuHomeCLick = (data) => {
    if (localStorage.getItem("accessToken")) {
      let decodeUsername = jwtDecode(
        localStorage.getItem("accessToken")
      )?.username;
      if (decodeUsername) {
        history("/allOrders");
      } else {
        history("/");
      }
    } else {
      history("/");
    }
  };

  return (
    <div className="builder_wrapper">
      <PMMenu
        open={true}
        title=""
        logo="https://ecomoney.in/assets/public/images/new-logo.jpg"
        onClick={MenuHomeCLick}
        menuItems={page.data.menuItems}
      >
        <Outlet></Outlet>
      </PMMenu>
      {/* <PMMenu
        open={true}
        title=""
        //    / logo="https://ecomoney.in/assets/public/images/new-logo.jpg"
        onClick={MenuHomeCLick}
        menuItems={page.data.menuItems}
      >
        <Outlet></Outlet>
      </PMMenu> */}
    </div>
  );
}
export default NavigationMenu;
