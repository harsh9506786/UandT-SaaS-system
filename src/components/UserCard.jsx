import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import AddTaskIcon from "@mui/icons-material/AddTask";

function UserCard({ user, onRoleChange, onDelete, onOpenTaskModal }) {
  const isAdmin = user.role === "admin";

  return (
    <Card
      sx={{
        background: "rgba(30,41,59,.65)",

        backdropFilter: "blur(20px)",

        border: "1px solid rgba(255,255,255,.08)",

        boxShadow: "0 12px 40px rgba(0,0,0,.35)",

        borderRadius: 5,

        transition: ".3s",

        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-8px)",

          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              fontSize: "1.2rem",
              fontWeight: "bold",

              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            }}
          >
            {user.name?.[0]?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#f8fafc",
              }}
            >
              {user.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <Divider
          sx={{
            my: 2,
            borderColor: "rgba(255,255,255,.08)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mt: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            User Role :
          </Typography>

          <Chip
            label={isAdmin ? "Admin" : "Employee"}
            size="small"
            sx={{
              background: isAdmin
                ? "linear-gradient(135deg,#ef4444,#dc2626)"
                : "linear-gradient(135deg,#3b82f6,#2563eb)",

              color: "#fff",
              fontWeight: 700,
              height: 28,
            }}
          />
          {!isAdmin && (
            <Chip
              icon={<AddTaskIcon />}
              label="Assign Task"
              clickable
              size="small"
              onClick={() => onOpenTaskModal(user)}
              sx={{
                background: "linear-gradient(135deg,#f59e0b,#f97316)",
                color: "#fff",
                fontWeight: 700,

                "& .MuiChip-icon": {
                  color: "#fff",
                },
              }}
            />
          )}
        </Box>

        <Stack spacing={1} mt={3}>
          {!isAdmin && (
            <Button
              fullWidth
              variant="contained"
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => onRoleChange(user.id, "admin")}
              sx={{
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              Make Admin
            </Button>
          )}

          {isAdmin && (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PersonIcon />}
              onClick={() => onRoleChange(user.id, "employee")}
              sx={{
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              Make Employee
            </Button>
          )}

          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(user.id)}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Delete User
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;
