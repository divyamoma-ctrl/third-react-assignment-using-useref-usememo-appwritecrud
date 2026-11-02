import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { Toaster } from "sonner";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
         <CssBaseline />
        <Toaster position="top-right" closeButton richColors />
        <RouterProvider router={Routes}></RouterProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
