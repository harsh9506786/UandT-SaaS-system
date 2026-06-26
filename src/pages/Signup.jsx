import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      startLoading();

      await signupUser(email, password, name);
      alert("Account Created Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
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
        background:
          "linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          background: "rgba(15,23,42,.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 6,
          boxShadow: "0 25px 50px rgba(0,0,0,.5)",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "20px",
                background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              U
            </Box>

            <Typography
              variant="h4"
              sx={{
                mt: 3,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Create Account
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                mt: 1,
              }}
            >
              Create your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSignup}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              mt: 2,
            }}
          >
            <TextField
              label="Full Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: 3,
                  background: "rgba(255,255,255,.03)",
                },

                "& .MuiInputLabel-root": {
                  color: "#94a3b8",
                },

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.1)",
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: 3,
                  background: "rgba(255,255,255,.03)",
                },

                "& .MuiInputLabel-root": {
                  color: "#94a3b8",
                },

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.1)",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: 3,
                  background: "rgba(255,255,255,.03)",
                },

                "& .MuiInputLabel-root": {
                  color: "#94a3b8",
                },

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.1)",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.6,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 700,

                background: "linear-gradient(135deg,#8b5cf6,#6366f1)",

                "&:hover": {
                  transform: "translateY(-2px)",

                  boxShadow: "0 10px 25px rgba(99,102,241,.4)",
                },
              }}
            >
              Create Account
            </Button>

            <Typography
              align="center"
              sx={{
                color: "#94a3b8",
                mt: 1,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
