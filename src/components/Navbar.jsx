import { useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/authStore";
import Button from "./Button";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <nav className="bg-sky-200 flex justify-between py-4 relative z-0 w-[1440px] mx-auto shadow-lg max-w-full">
      {/* <section className=""> */}
      <h2 className="ml-4">Ticketer</h2>

      {user && (
        <>
          <section className="flex gap-2 items-center mr-4">
            <span className="bg-white rounded-full p-2">
              <AiOutlineUser />
            </span>
            <span>{user.username}</span>
            <AiOutlineCaretDown
              className={cn("block cursor-pointer", showDropDown && "hidden")}
              onClick={() => setShowDropDown(!showDropDown)}
            />
            <AiOutlineCaretUp
              className={cn("hidden cursor-pointer", showDropDown && "block")}
              onClick={() => setShowDropDown(!showDropDown)}
            />
          </section>
          <div
            className={cn(
              "hidden flex-col space-y-2 absolute top-[90%] right-[0%] mt-5 rounded-lg bg-white-200 p-2 px-4 shadow-lg shadow-sky-200/50 z-30",
              showDropDown && "flex"
            )}
          >
            <Button
              text="Logout"
              type="submit"
              onClick={handleLogout}
              className="bg-red-300"
            />
          </div>
        </>
      )}
      {/* </section> */}
    </nav>
  );
};

export default Navbar;
