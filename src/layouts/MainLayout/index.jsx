import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useCallback, useState } from "react";
import Header from "./components/Header/Header";
import "./index.css";
const MainLayout = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpened((prev) => !prev);
    }, []);
    return (
        <div>
            <Header onClick={toggleSidebar} />
            <Sidebar open={sidebarOpened} onMaskClick={toggleSidebar} />
            <div className="children-style">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
