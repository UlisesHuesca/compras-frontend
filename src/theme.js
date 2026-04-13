import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3E92CC",
    },
    secondary: {
      main: "#122D45",
    },
    error: {
      main: "#990f0f",
    },
    grey: {
      500: "#9a9b9d",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
      color: "#122D45",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;