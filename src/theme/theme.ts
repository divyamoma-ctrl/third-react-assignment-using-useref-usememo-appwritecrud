
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#5141A4",
      light: "#E8E3FF",
      dark: "#211B3D",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#8B72FF",
      light: "#EAE5FF",
      dark: "#6950D5",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F3F1FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#211B3D",
      secondary: "#777187",
    },

    divider: "#E3DFEF",

    success: {
      main: "#15803D",
    },

    error: {
      main: "#DC2626",
    },

    warning: {
      main: "#D97706",
    },

    info: {
      main: "#2563EB",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.8px",
    },

    h5: {
      fontWeight: 700,
      letterSpacing: "-0.4px",
    },

    h6: {
      fontWeight: 700,
    },

    body1: {
      lineHeight: 1.7,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F3F1FA",
        },
      },
    },

    MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 10,
      padding: "10px 20px",
      boxShadow: "none",
      transition: "all 0.2s ease",
    },
  },

  variants: [
    {
      props: {
        variant: "contained",
        color: "primary",
      },
      style: {
        "&:hover": {
          backgroundColor: "#332875",
          boxShadow: "0 5px 14px rgba(81, 65, 164, 0.2)",
        },
      },
    },
  ],
},
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E3DFEF",
          boxShadow: "0 6px 24px rgba(33, 27, 61, 0.06)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "medium",
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
