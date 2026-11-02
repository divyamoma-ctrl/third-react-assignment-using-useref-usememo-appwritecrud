import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { BookPlus, BookText, Timer } from "lucide-react";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        borderBottom: 1,
        borderColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 76,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Typography
            component={NavLink}
            to="/"
            variant="h5"
            sx={{
              fontWeight: 800,
              textDecoration: "none",
              color: "primary.contrastText",
              letterSpacing: "-0.5px",
            }}
          >
            RA3
          </Typography>

          {/* Navigation Links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* <Typography
              component={NavLink}
              to="/"
              end
              sx={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Home
              <House strokeWidth={1.25} size={16} />
            </Typography> */}

            <Typography
              component={NavLink}
              to="/"
              sx={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Memo
              <BookText strokeWidth={1.25} size={16} />
            </Typography>

            <Typography
              component={NavLink}
              to="/stopwatch"
              sx={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Stopwatch
              <Timer strokeWidth={1.25} size={16} />
            </Typography>

            <Typography component={NavLink} to="/crud"
             sx={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}>
              CRUD
              <BookPlus strokeWidth={1.25} size={16} />
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: 400,
  fontSize: "0.90rem",
  px: 2,
  py: 1,
  borderRadius: 1,
  transition: "all 0.2s ease",

  "&:hover": {
    color: "#FFFFFF",
    bgcolor: "rgba(255, 255, 255, 0.12)",
  },

  "&.active": {
    color: "#FFFFFF",
    bgcolor: "primary.main",
    fontWeight: 500,
  },
};

export default Header;
