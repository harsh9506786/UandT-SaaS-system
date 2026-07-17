import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTasks from "./pages/AdminTasks";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import GlobalLoader from "./components/GlobalLoader";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { useLoading } from "./context/LoadingContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user } = useAuth();
  const { loading } = useLoading();

  return (
    <>
      {/* GLOBAL LOADER OVERLAY */}
      {loading && <GlobalLoader />}

      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<GlobalLoader />}>
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
              path="/admin/tasks"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AdminTasks />
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

            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;