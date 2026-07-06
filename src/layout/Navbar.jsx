import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#fff",
              letterSpacing: ".5px",
              cursor: "pointer",
            }}
          >
            TaskFlow
          </Typography>

          {/* Login */}
          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1,
              fontWeight: 600,

              background:
                "linear-gradient(135deg,#6366f1,#8b5cf6)",

              boxShadow: "0 10px 30px rgba(99,102,241,.35)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#4f46e5,#7c3aed)",
              },
            }}
          >
            Register
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;