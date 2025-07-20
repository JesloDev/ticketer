import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-[1440px] max-w-full mx-auto">
        <section className="grid grid-cols-6">
          <Sidebar />
          <div className="col-span-5">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default AppLayout;
