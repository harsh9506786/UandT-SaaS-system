import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { getUserById } from "../services/userService";

import LoginHero from "../components/LoginHero";
import LoginForm from "../components/LoginForm";
import { useLoading } from "../context/LoadingContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      startLoading();

      const user = await loginUser(email, password);

      const userData = await getUserById(user.uid);

      navigate(userData.role === "admin" ? "/admin" : "/employee");
    } finally {
      setTimeout(() => {
        stopLoading();
      }, 300);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 0,
        },
        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* Glow Top Left */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 220,
            md: 400,
          },

          height: {
            xs: 220,
            md: 400,
          },
          borderRadius: "50%",
          background: "#6366f1",
          filter: "blur(180px)",
          opacity: 0.18,
          top: -100,
          left: -100,
        }}
      />

      {/* Glow Bottom Right */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 200,
            md: 350,
          },

          height: {
            xs: 200,
            md: 350,
          },
          borderRadius: "50%",
          background: "#8b5cf6",
          filter: "blur(180px)",
          opacity: 0.15,
          bottom: -100,
          right: -100,
        }}
      />

      <Grid
        container
        spacing={{
          xs: 4,
          md: 6,
        }}
        sx={{
          width: "100%",
          maxWidth: 1200,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <LoginHero />

        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Grid>
    </Box>
  );
}

export default Login;
