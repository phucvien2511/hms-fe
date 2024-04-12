import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useCallback, useState } from "react";
import Header from "./components/Header";

const MainLayout = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpened((prev) => !prev);
    }, []);
    return (
        <div>
            <Header onClick={toggleSidebar} />
            <Sidebar open={sidebarOpened} onMaskClick={toggleSidebar} />
            <Outlet />
        </div>
    );
};

export default MainLayout;
