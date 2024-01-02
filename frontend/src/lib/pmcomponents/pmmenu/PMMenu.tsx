// @ts-nocheck
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/icons-material/Menu";
import { Avatar, Button, Collapse, Popover, Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PMGrid, PMIcon, SvgRender } from "../../pmcomponents";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  margin: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  maxWidth: "100%",
  minHeight: "100vh",
  ...(open && {
    transition: theme.transitions.create("margin, width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    maxWidth: `100%`,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PMMenu(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [subMenuOpen, setSubMenuOpen] = React.useState({});
  const currentPageTitle = useSelector(
    (states) => states?.appStore?.currentPageTitle
  );
  const location = useLocation();
  const params = useParams<Record<string, string>>();
  const history = useNavigate();

  const currentPath = Object.values(params).reduce(
    (path, param) => path.replace("/" + param, ""),
    location.pathname
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profilePopOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const userProfile = JSON.parse(localStorage?.getItem("userProfile"));
  const permissionCodes = localStorage?.getItem("permissionCodes") || [];
  const userId = userProfile?.user_id;
  const userName = userProfile?.username;
  const email = userProfile?.user?.emails[0]?.email;
  const phone = userProfile?.user?.phones[0]?.phone;

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
    history("/");
  };

  const handleClick = (url: string) => {
    if (props.onClick) {
      props.onClick({ url: url });
    }
  };

  const expandMenu = (index) => {
    let subMenuOpenTemp = { ...subMenuOpen };
    if (subMenuOpenTemp[index]) {
      subMenuOpenTemp[index] = !subMenuOpenTemp[index];
    } else {
      subMenuOpenTemp[index] = true;
    }
    setSubMenuOpen({ ...subMenuOpenTemp });
  };

  const selectedUrl = (menuData, parentIndex = "") => {
    menuData?.map((item, index) => {
      if (item?.url && currentPath === item.url) {
        if (parentIndex) {
          if (!subMenuOpen[parentIndex]) {
            expandMenu(parentIndex);
          }
        }
      }
      if (item.collapseItem) {
        selectedUrl(item.collapseItem, index);
      }
    });
  };
  if (props?.menuItems) {
    selectedUrl(props?.menuItems);
  }

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };
  const stringAvatar = (name: string) => {
    if (!name) {
      return {};
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0].toUpperCase()}`,
    };
  };
  const menuItemLayout = (items, isChild = false, parentIndex = 0) => {
    return (
      <List>
        {items?.map((item, index) => {
          let key = "li" + index;
          let selected = false;

          if (item?.url && currentPath === item.url) {
            selected = true;
          }
          switch (item?.type) {
            case "Divider":
              return <Divider key={key} />;
            case "Subheader":
              return (
                <ListSubheader
                  sx={
                    item?.requirePermissions
                      ? !item?.requirePermissions.some(
                          (r) => permissionCodes?.indexOf(r) >= 0
                        )
                        ? { display: "none" }
                        : {}
                      : {}
                  }
                  component="div"
                  key={key}
                >
                  {item.text}
                </ListSubheader>
              );
            case "Nested":
              return (
                <React.Fragment key={key}>
                  <ListItem
                    sx={
                      item?.requirePermissions
                        ? !item?.requirePermissions.some(
                            (r) => permissionCodes?.indexOf(r) >= 0
                          )
                          ? { display: "none" }
                          : {}
                        : {}
                    }
                    onClick={() => expandMenu(index)}
                    disablePadding
                  >
                    <ListItemButton hidden={false}>
                      <ListItemIcon>
                        {item?.icon?.iconType ? (
                          <SvgRender icon={item.icon.icon} />
                        ) : (
                          <PMIcon icon={item.icon.icon}></PMIcon>
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {subMenuOpen[index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={subMenuOpen[index]} timeout="auto">
                    {menuItemLayout(item?.collapseItem, true, index)}
                  </Collapse>
                </React.Fragment>
              );
            default:
              return (
                <ListItem
                  sx={
                    item?.requirePermissions
                      ? !item?.requirePermissions?.some(
                          (r) => permissionCodes?.indexOf(r) >= 0
                        )
                        ? { display: "none" }
                        : selected
                        ? {
                            color: "primary.main",
                            borderColor: "primary.main",
                            backgroundColor: "primary.light",
                            borderLeft: 3,
                          }
                        : {}
                      : selected
                      ? {
                          color: "primary.main",
                          borderColor: "primary.main",
                          backgroundColor: "primary.light",
                          borderLeft: 3,
                        }
                      : {}
                  }
                  onClick={() => handleClick(item?.url)}
                  hidden={!item.toShow}
                  key={key}
                  disablePadding
                >
                  <ListItemButton sx={isChild ? { pl: 4 } : {}}>
                    <ListItemIcon>
                      {item?.icon?.iconType ? (
                        <SvgRender
                          icon={item.icon.icon}
                          color={selected ? "#6eb9f7" : "grey"}
                        />
                      ) : (
                        <PMIcon
                          icon={item.icon.icon}
                          color={selected ? "primary" : "inherit"}
                        ></PMIcon>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
          }
        })}
      </List>
    );
  };

  return (
    <Main open={open}>
      {/* <DrawerHeader /> */}
      {props?.children}
    </Main>
  );
}
