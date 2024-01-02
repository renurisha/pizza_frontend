import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background: {
      default: "#F9FAFC",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#42a5f5",
      light: "#D8EAFB",
      dark: "#21537b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#020002",
      light: "#ffffff",
      dark: "#7921b1",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#40b649",
      light: "#ebfaed",
      dark: "#40b649",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#747474",
      light: "#e3e1e1de",
      dark: "#707070",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#ec841d",
      light: "#fff2e5",
      dark: "#c56203",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF0000",
      light: "#fee8e4",
      dark: "#b01010",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 600,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: 1.375,
    },
  },
});
