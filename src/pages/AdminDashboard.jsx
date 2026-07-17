import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import UserCard from "../components/UserCard";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignTaskModal from "../components/AssignTaskModal";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/userService";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleRoleChange = async (uid, role) => {
    await updateUserRole(uid, role);

    setSnackbar({
      open: true,
      message: `Role updated to ${role}`,
      severity: "success",
    });

    fetchUsers();
  };

  const handleDeleteClick = (uid) => {
    setSelectedUser(uid);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    await deleteUser(selectedUser);

    setSnackbar({
      open: true,
      message: "User deleted successfully",
      severity: "success",
    });

    fetchUsers();

    setOpenDelete(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUsers = users.length;

  const totalAdmins = users.filter((u) => u.role === "admin").length;

  const totalEmployees = users.filter((u) => u.role === "employee").length;
  const handleOpenTaskModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      {" "}
      <Navbar search={search} setSearch={setSearch} />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg,#0f172a 0%,#020617 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              pt: 4,
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",

                fontWeight: 700,
              }}
            >
              Admin Dashboard
            </Typography>

            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => navigate("/admin/tasks")}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 3,
                px: 3,
                background: "linear-gradient(135deg,#6366f1 0%, #8b5cf6 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg,#7c3aed 0%, #9333ea 100%)",
                },
              }}
            >
              View All Tasks
            </Button>
          </Box>

          <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Total Users"
                value={totalUsers}
                icon={<GroupsIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#6366f1,#8b5cf6)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Admins"
                value={totalAdmins}
                icon={<AdminPanelSettingsIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#ef4444,#f97316)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title="Employees"
                value={totalEmployees}
                icon={<BadgeIcon fontSize="inherit" />}
                gradient="linear-gradient(135deg,#06b6d4,#14b8a6)"
              />
            </Grid>
          </Grid>
          <Box sx={{ height: 64 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Users
            </Typography>

            <Box
              sx={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,.12)",
              }}
            />
          </Box>
          <Grid container spacing={3}>
            {filteredUsers.map((user) => (
              <Grid
                key={user.id}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4,
                }}
              >
                <UserCard
                  user={user}
                  onRoleChange={handleRoleChange}
                  onDelete={handleDeleteClick}
                  onOpenTaskModal={handleOpenTaskModal}
                />
              </Grid>
            ))}
          </Grid>

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>Delete User</DialogTitle>

            <DialogContent>
              Are you sure you want to delete this user?
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

              <Button color="error" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() =>
              setSnackbar({
                ...snackbar,
                open: false,
              })
            }
          >
            <Alert severity={snackbar.severity} variant="filled">
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
        <AssignTaskModal
          open={openTaskModal}
          onClose={handleCloseTaskModal}
          selectedEmployee={selectedEmployee}
        />
      </Box>
    </>
  );
}

export default AdminDashboard;