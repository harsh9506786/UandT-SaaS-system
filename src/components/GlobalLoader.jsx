import { Box, CircularProgress, Typography } from "@mui/material";

function GlobalLoader() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        background:
          "linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: "#6366f1",
          mb: 2,
        }}
      />

      <Typography
        sx={{
          color: "#fff",
          fontWeight: 500,
          letterSpacing: 1,
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}

export default GlobalLoader;