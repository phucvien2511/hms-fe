import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./index.css";
import { Cookies } from "react-cookie";
const MainLayout = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    //check if don't have cookie, redirect to login page
    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("user");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
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
