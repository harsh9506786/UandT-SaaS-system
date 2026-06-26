import { Card, Typography, Box, Chip, Checkbox, Button } from "@mui/material";

function TaskCard({ task, onToggleStatus, onDeleteTask }) {
  const isCompleted = task.status === "completed";

  return (
    <Card
      sx={{
        position: "relative",
        p: 3,
        borderRadius: 4,

        background: isCompleted ? "rgba(34,197,94,.12)" : "rgba(30,41,59,.8)",

        border: isCompleted
          ? "1px solid rgba(34,197,94,.3)"
          : "1px solid rgba(255,255,255,.08)",
      }}
    >
      {/* Status Fix Position */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-end",
        }}
      >
        <Chip
          label={isCompleted ? "Completed" : "Pending"}
          color={isCompleted ? "success" : "warning"}
          size="small"
          sx={{
            fontWeight: 700,
          }}
        />

        {isCompleted && (
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => onDeleteTask(task.id)}
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              minWidth: 80,
            }}
          >
            Remove
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          pr: 12,
        }}
      >
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggleStatus(task)}
          sx={{
            color: "#64748b",

            "&.Mui-checked": {
              color: "#22c55e",
            },
          }}
        />

        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Task Title : {task.title}
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 1,
            }}
          >
            Task Description : {task.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default TaskCard;
