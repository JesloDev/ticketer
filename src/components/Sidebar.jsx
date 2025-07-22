import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const sidebarData = [
    { text: "Home", path: "/", img: "", allowedRoles: ["superadmin"] },
    {
      text: "Register",
      path: "/start_registeration",
      img: "",
      allowedRoles: ["register", "superadmin"],
    },
    {
      text: "Records",
      path: "/student_records",
      img: "",
      allowedRoles: ["superadmin"],
    },
    {
      text: "Registrations",
      path: "/reg_data",
      img: "",
      allowedRoles: ["superadmin", "register"],
    },
    {
      text: "Upload",
      path: "/upload",
      img: "",
      allowedRoles: ["uploader", "superadmin"],
    },
    {
      text: "Tickets",
      path: "/tickets",
      img: "",
      allowedRoles: ["superadmin"],
    },
  ];

  return (
    <div className="bg-sky-200 shadow-lg col-span-1 h-dvh">
      {sidebarData
        .filter((item) => item.allowedRoles.includes(user?.role))
        .map(({ text, path }, i) => (
          <Link
            key={i}
            to={path}
            className={`block ml-4 my-2 p-2 ${
              location.pathname === path
                ? "bg-sky-700 text-white rounded-l-full"
                : "text-black"
            }`}
          >
            {text}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
