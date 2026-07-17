import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import EditTaskModal from "../components/EditTaskModal";

import { getAllTasks, updateTask, deleteTask } from "../services/taskService";

function AdminTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    // newest first
    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );
    setTasks(data);
  };

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const filteredTasks = tasks.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedToName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  const handleSaveEdit = async (taskId, updates) => {
    await updateTask(taskId, updates);
    setSnackbar({ open: true, message: "Task updated", severity: "success" });
    fetchTasks();
  };

  const handleDeleteClick = (taskId) => {
    setDeletingTaskId(taskId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    await deleteTask(deletingTaskId);
    setSnackbar({ open: true, message: "Task deleted", severity: "success" });
    setDeleteOpen(false);
    setDeletingTaskId(null);
    fetchTasks();
  };

  const formatDate = (createdAt) => {
    if (!createdAt?.seconds) return "—";
    return new Date(createdAt.seconds * 1000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search by task or employee..."
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg,#0f172a 0%,#020617 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <IconButton
              onClick={() => navigate("/admin")}
              sx={{ color: "#94a3b8" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
              All Assigned Tasks
            </Typography>
          </Box>

          <Typography sx={{ color: "#94a3b8", mb: 4, ml: 6 }}>
            Every task assigned across all employees, in one place
          </Typography>

          <Grid container spacing={2} mb={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Total Tasks"
                value={tasks.length}
                icon={<AssignmentIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#6366f1,#8b5cf6)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Completed"
                value={completed}
                icon={<CheckCircleIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#22c55e,#16a34a)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Pending"
                value={pending}
                icon={<PendingActionsIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#06b6d4,#14b8a6)"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {filteredTasks.map((task) => {
              const isCompleted = task.status === "completed";

              return (
                <Grid key={task.id} size={{ xs: 12 }}>
                  <Card
                    sx={{
                      position: "relative",
                      p: 3,
                      borderRadius: 4,
                      background: isCompleted
                        ? "rgba(34,197,94,.12)"
                        : "rgba(30,41,59,.8)",
                      border: isCompleted
                        ? "1px solid rgba(34,197,94,.3)"
                        : "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 240 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={isCompleted ? "Completed" : "Pending"}
                            color={isCompleted ? "success" : "warning"}
                            size="small"
                            sx={{ fontWeight: 700 }}
                          />
                          <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                            Assigned {formatDate(task.createdAt)}
                          </Typography>
                        </Box>

                        <Typography sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}>
                          {task.title}
                        </Typography>

                        <Typography sx={{ color: "#94a3b8", mb: 1 }}>
                          {task.description}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#8b5cf6",
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          👤 Assigned to: {task.assignedToName || "Unknown"}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditClick(task)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "999px",
                            color: "#c4b5fd",
                            border: "1px solid rgba(139,92,246,.35)",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteClick(task.id)}
                          sx={{ textTransform: "none", borderRadius: "999px" }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}

            {filteredTasks.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: "#64748b", textAlign: "center", py: 6 }}>
                  No tasks found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>

        <EditTaskModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          task={editingTask}
          onSave={handleSaveEdit}
        />

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task? This cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default AdminTasks;