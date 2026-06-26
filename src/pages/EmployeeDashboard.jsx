import { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { auth } from "../firebase/config";
import { getUserById } from "../services/userService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import TaskCard from "../components/TaskCard";

function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const uid = auth.currentUser?.uid;

    const userData = await getUserById(uid);
    setUser(userData);

    const snap = await getDocs(collection(db, "tasks"));

    const userTasks = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((t) => t.assignedTo === uid);

    setTasks(userTasks);
  };

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase()),
  );
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    await updateDoc(doc(db, "tasks", task.id), {
      status: newStatus,
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
    );
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search tasks..."
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg,#0f172a 0%,#020617 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* 👋 WELCOME SECTION */}
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Welcome {user?.name || "Employee"} 👋
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 4,
            }}
          >
            Here is your task overview
          </Typography>

          <Grid container spacing={2} mb={6}>
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
                gradient="linear-gradient(135deg,#ef4444,#f97316)"
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

          {/* TASK LIST SECTION */}
          <Box mt={5}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mt: 5, // 👈 add this
                mb: 2,
              }}
            >
              Your Tasks
            </Typography>

            <Grid container spacing={2}>
              {filteredTasks.map((task) => (
                <Grid
                  key={task.id}
                  size={{
                    xs: 12,
                  }}
                >
                  <TaskCard
                    task={task}
                    onToggleStatus={handleToggleStatus}
                    onDeleteTask={handleDeleteTask}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default EmployeeDashboard;
