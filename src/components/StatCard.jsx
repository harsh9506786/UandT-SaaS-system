import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function StatCard({
  title,
  value,
  gradient,
  icon,
}) {
  return (
    <Card
      sx={{
        position: "relative",

        background: gradient,

        color: "white",

        borderRadius: 5,

        overflow: "hidden",

        boxShadow:
          "0 10px 30px rgba(0,0,0,.35)",

        transition: ".3s",

        "&:hover": {
          transform:
            "translateY(-8px)",

          boxShadow:
            "0 20px 50px rgba(0,0,0,.45)",
        },

        "&::before": {
          content: '""',

          position: "absolute",

          width: 120,

          height: 120,

          borderRadius: "50%",

          background:
            "rgba(255,255,255,.15)",

          top: -40,

          right: -30,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.85,
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              fontSize: 42,
              opacity: 0.9,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;