import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

function LoginForm({ email, password, setEmail, setPassword, handleLogin }) {
  return (
    <Grid
      size={{ xs: 12, md: 5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 500,
          },
          mt: {
            xs: 2,
            md: 0,
          },

          background: "rgba(15,23,42,.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 6,
          boxShadow: "0 25px 50px rgba(0,0,0,.5)",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box
              sx={{
                width: { xs: 70, sm: 90 },
                height: { xs: 70, sm: 90 },
                fontSize: { xs: 28, sm: 32 },
                borderRadius: "24px",

                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: "#fff",
                fontWeight: 800,

                boxShadow: "0 0 40px rgba(99,102,241,.45)",
              }}
            >
              T
            </Box>

            <Typography
              variant="h4"
              sx={{
                mt: 3,
                color: "#fff",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                mt: 2,
                mb: 2,
              }}
            >
              Login to continue
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 1,
            }}
          >
            <TextField
              label="Email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& input": {
                  color: "#fff",
                },

                "& input::placeholder": {
                  color: "#cbd5e1",
                  opacity: 1,
                },
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
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "#6366f1",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#8b5cf6",
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
                "& input": {
                  color: "#fff",
                },

                "& input::placeholder": {
                  color: "#cbd5e1",
                  opacity: 1,
                },
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
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "#6366f1",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#8b5cf6",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: {
                  xs: 1.4,
                  sm: 1.6,
                },
                borderRadius: 3,

                textTransform: "none",

                fontSize: {
                  xs: ".95rem",
                  sm: "1rem",
                },
                fontWeight: 700,

                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",

                boxShadow: "0 0 30px rgba(99,102,241,.45)",

                "&:hover": {
                  transform: "translateY(-3px)",

                  boxShadow: "0 0 50px rgba(99,102,241,.7)",
                },
              }}
            >
              Login
            </Button>

            <Typography
              align="center"
              sx={{
                color: "#94a3b8",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default LoginForm;
