import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { useLoader } from "../stores/useLoader";

const apiUrl = import.meta.env.VITE_BASE_URL;

const Registeration = () => {
  const { setLoading } = useLoader();
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/receipt_reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        const data = await response.json();
        throw new Error(data.error);
      }

      if (!response.ok) {
        throw new Error("An error occured");
      }

      const result = await response.json();

      reset();
      toast.success(result.message || "Registeration Successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="tracking-wide text-2xl text-center w-full mt-5">
        Registration
      </h2>
      <form className="py-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto">
          <label htmlFor="first_name">
            First Name:{" "}
            {errors.first_name && (
              <span className="text-red-300">
                {errors.first_name.message || "*required"}
              </span>
            )}
          </label>
          <input
            name="first_name"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="text"
            {...register("first_name", {
              required: true,
              pattern: {
                value: /^\S+$/,
                message: "No spaces allowed, use one continuous word",
              },
            })}
            placeholder="John"
          />
        </div>
        <div className="w-[80%] mx-auto">
          <label htmlFor="last_name">
            Last Name:{" "}
            {errors.last_name && (
              <span className="text-red-300">
                {errors.last_name.message || "*required"}
              </span>
            )}
          </label>
          <input
            name="last_name"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="text"
            {...register("last_name", {
              required: true,
              pattern: {
                value: /^\S+$/,
                message: "No spaces allowed, use one continuous word",
              },
            })}
            placeholder="Doe"
          />
        </div>
        <div className="w-[80%] mx-auto">
          <label htmlFor="other_name">
            Other Name:{" "}
            {errors.other_name && (
              <span className="text-red-300">
                {errors.other_name.message || "*required"}
              </span>
            )}
          </label>
          <input
            name="other_name"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="text"
            {...register("other_name", {
              required: true,
              pattern: {
                value: /^\S+$/,
                message: "No spaces allowed, use one continuous word",
              },
            })}
            placeholder="Shaun"
          />
        </div>
        <div className="w-[80%] mx-auto">
          <label htmlFor="email">
            Email:{" "}
            {errors.email && (
              <span className="text-red-300">
                {errors.email.message || "*required"}
              </span>
            )}
          </label>
          <input
            name="email"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="a@gmail.com"
          />
        </div>
        <div className="w-[80%] mx-auto">
          <label htmlFor="phone_number">
            Phone number:{" "}
            {errors.phone_number && (
              <span className="text-red-300">
                {errors.phone_number.message || "*required"}
              </span>
            )}
          </label>
          <input
            name="phone_number"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="tel"
            {...register("phone_number", { required: true, maxLength: 11 })}
            placeholder="e.g. 09029387645"
          />
        </div>
        <div className="w-[80%] mx-auto">
          <label htmlFor="matric_number">
            Matric number:{" "}
            {errors.matric_number && (
              <span className="text-red-300">*required</span>
            )}
          </label>
          <input
            name="matric_number"
            className="border border-l-4 border-sky-300 p-1 rounded block w-full"
            type="text"
            {...register("matric_number", { required: true })}
            placeholder=""
          />
        </div>
        <Button
          type="submit"
          text="Register Student"
          className="mx-auto bg-sky-600 mt-10"
        />
      </form>
    </>
  );
};

export default Registeration;
