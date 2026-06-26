import { Grid, Typography, Box, Stack, Card } from "@mui/material";

function LoginHero() {
  return (
    <Grid
      size={{ xs: 12, md: 7 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        textAlign: {
          xs: "center",
          md: "left",
        },

        mt: {
          xs: 6, // 👈 mobile pe top se gap
          sm: 8,
          md: 0,
        },

        mb: {
          xs: 5,
          md: 0,
        },
        px: {
          xs: 2,
          md: 0,
        },
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 800,
          lineHeight: 1.1,
          mb: 3,

          fontSize: {
            xs: "2.3rem",
            sm: "3rem",
            md: "4rem",
          },
        }}
      >
        Task Management
        <br />
        System
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          fontSize: "1.1rem",
          maxWidth: {
            xs: "100%",
            md: 500,
          },
          mb: 5,
        }}
      >
        Manage employees, assign tasks and track progress from one powerful
        dashboard.
      </Typography>

      <Stack
        spacing={2}
        sx={{
          alignItems: {
            xs: "flex-start",
            md: "flex-start",
          },

          mx: {
            xs: "auto",
            md: 0,
          },
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          ✅ Admin Dashboard
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          ✅ Employee Dashboard
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          ✅ Real-time Task Tracking
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          ✅ Task Assignment System
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          gap: 4,
          flexWrap: "wrap",

          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
        }}
      >
        <Card
          sx={{
            p: 3,
            minWidth: {
              xs: "100%",
              sm: 170,
            },
            bgcolor: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 4,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
            }}
          >
            100+
          </Typography>

          <Typography sx={{ color: "#94a3b8" }}>Tasks Managed</Typography>
        </Card>

        <Card
          sx={{
            p: 3,
            minWidth: {
              xs: "100%",
              sm: 170,
            },
            bgcolor: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 4,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
            }}
          >
            24/7
          </Typography>

          <Typography sx={{ color: "#94a3b8" }}>Progress Tracking</Typography>
        </Card>
      </Box>
    </Grid>
  );
}

export default LoginHero;
