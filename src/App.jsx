import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute user={user} role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
