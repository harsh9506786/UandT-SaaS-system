import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Paper,
  Slide,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";
import { logoutUser } from "../services/authService";
import { getUserById } from "../services/userService";

function Navbar({ search, setSearch, searchPlaceholder = "Search..." }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (auth.currentUser) {
        const data = await getUserById(auth.currentUser.uid);
        setCurrentUser(data);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(15,23,42,.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            minHeight: 72,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 700,
            }}
          >
            User Management
          </Typography>

          {/* Desktop */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              ml: 5,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                px: 4,
              }}
            >
              <TextField
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                sx={{
                  width: "100%",
                  maxWidth: 520,

                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    borderRadius: 3,
                    background: "rgba(255,255,255,.05)",

                    "& fieldset": {
                      borderColor: "rgba(255,255,255,.08)",
                    },

                    "&:hover fieldset": {
                      borderColor: "#8b5cf6",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#8b5cf6",
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Avatar sx={{ bgcolor: "#8b5cf6" }}>
                  {currentUser?.name?.[0]?.toUpperCase()}
                </Avatar>

                <Box>
                  <Typography color="#fff" fontWeight={600}>
                    {currentUser?.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: 12,
                      textTransform: "capitalize",
                    }}
                  >
                    {currentUser?.role}
                  </Typography>
                </Box>
              </Box>

              <Button
                color="error"
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Mobile */}

          <IconButton
            onClick={() => setOpenMenu((prev) => !prev)}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "#fff",
              transition: "0.3s",
            }}
          >
            {openMenu ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* ================= Mobile Slide Menu ================= */}

      <Slide direction="down" in={openMenu} mountOnEnter unmountOnExit>
        <Paper
          elevation={0}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },

            position: "fixed",

            top: "72px", // Navbar ke niche

            left: 16,
            right: 16,

            zIndex: 1100,

            borderRadius: 4,

            overflow: "hidden",

            background:
              "linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)",

            border: "1px solid rgba(255,255,255,.08)",

            boxShadow: "0 20px 50px rgba(0,0,0,.45)",
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
          >
           

            {/* User Card */}

            <Box
              sx={{
                mt:2,
                display: "flex",
                alignItems: "center",
                gap: 2,

                p: 2,

                borderRadius: 3,

                bgcolor: "rgba(255,255,255,.05)",

                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#8b5cf6",
                  width: 50,
                  height: 50,
                }}
              >
                {currentUser?.name?.[0]?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {currentUser?.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: ".85rem",
                    textTransform: "capitalize",
                  }}
                >
                  {currentUser?.role}
                </Typography>
              </Box>
            </Box>

            {/* Search */}

            <TextField
              fullWidth
              value={search}
              placeholder={searchPlaceholder}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mt: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,

                  color: "#fff",

                  background: "rgba(255,255,255,.05)",

                  "& fieldset": {
                    borderColor: "rgba(255,255,255,.08)",
                  },

                  "&:hover fieldset": {
                    borderColor: "#8b5cf6",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#8b5cf6",
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Logout */}

            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}

export default Navbar;
