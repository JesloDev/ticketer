import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/authStore";
import { useLoader } from "../stores/useLoader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data) => {
    const { adminID: username, password, role } = data;

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }), // data = { admin_id, password }
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json(); // { username, role } //roles: uploader, registrar, superadmin

      login(result); // save to zustand store
      toast.success(result.message || "Login Successful");

      // Redirect based on role
      if (result.role === "uploader") navigate("/upload");
      else if (result.role === "register") navigate("/start_registeration");
      else if (result.role === "superadmin") navigate("/");
      else navigate("/"); // fallback
    } catch (err) {
      console.error(err);
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="grid place-items-center mt-[100px]">
        <h2 className="text-left font-bold text-2xl tracking-wide ml-0 mb-5">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] max-w-full bg-sky-50 rounded-sm py-4 space-y-5"
        >
          <div className="w-[80%] mx-auto">
            <label htmlFor="adminID">
              Admin ID:{" "}
              {errors.adminID && (
                <span className="text-red-300">Admin ID is required</span>
              )}
            </label>
            <input
              name="adminID"
              className="border border-l-4 border-sky-300 p-1 rounded block w-full"
              type="text"
              {...register("adminID", { required: true })}
              placeholder="Admin ID"
            />
          </div>

          <div className="relative w-[80%] mx-auto">
            <label htmlFor="password">
              Password:{" "}
              {errors.password && (
                <span className="text-red-300">Password is required</span>
              )}
            </label>
            <input
              name="password"
              className="border border-l-4 border-sky-300 p-1 rounded block w-full"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {!showPassword ? (
              <BsEyeSlash
                className="absolute top-[55%] right-[3%] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <BsEye
                className="absolute top-[55%] right-[3%] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>

          <div className="w-[80%] mx-auto">
            <label htmlFor="role">
              Role:{" "}
              {errors.role && (
                <span className="text-red-300">Role is required</span>
              )}
            </label>
            <select
              id="role"
              defaultValue="superadmin"
              className="border border-l-4 border-sky-300 p-1 rounded block w-full"
              {...register("role", { required: true })}
            >
              <option value="">Select role</option>
              <option value="uploader">Uploader</option>
              <option value="register">Registrar</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <Button
            type="submit"
            text="Login"
            className="mx-auto bg-sky-600 mt-10"
          />
        </form>
      </section>
    </div>
  );
};

export default Login;
