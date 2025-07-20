import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  AppLayout,
  Home,
  Login,
  Registeration,
  RegisteredStudents,
  Tickets,
  Upload,
} from "./pages";
import PageNotFound from "./pages/PageNotFound";
import RegisterRegistrations from "./pages/RegisterRegistrations";
import { useAuthStore } from "./stores/authStore";

const App = () => {
  const checkExpiry = useAuthStore((state) => state.checkExpiry);

  useEffect(() => {
    checkExpiry();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => checkExpiry(), 60 * 1000); // every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="upload"
            element={
              <ProtectedRoute allowedRoles={["uploader", "superadmin"]}>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="start_registeration"
            element={
              <ProtectedRoute allowedRoles={["register", "superadmin"]}>
                <Registeration />
              </ProtectedRoute>
            }
          />
          <Route
            path="reg_data"
            element={
              <ProtectedRoute allowedRoles={["register", "superadmin"]}>
                <RegisterRegistrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="student_records"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <RegisteredStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="tickets"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
