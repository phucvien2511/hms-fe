import { memo } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import Dashboard from "../../../../assets/icons/Dashboard";
import Patient from "../../../../assets/icons/Patient";
import Staff from "../../../../assets/icons/Staff";
import Medicine from "../../../../assets/icons/Medicine";
import Tool from "../../../../assets/icons/Tool";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
const Sidebar = memo(({ open, onMaskClick }) => {
    const navigate = useNavigate();
    const isCurrentPath = (path) => {
        return window.location.pathname === path;
    };
    const handleSidebarNavigate = (path) => {
        navigate(path);
        onMaskClick();
    };
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    const handleLogout = () => {
        removeCookies("user", { path: "/" });
        navigate("/login");
    };
    return (
        <>
            <div className={`sidebar ${open === true ? "open" : ""}`}>
                <div
                    className="sidebar-option"
                    onClick={() => handleSidebarNavigate("/")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/") ? "bold" : ""
                        }`}
                    >
                        <Dashboard />
                        <span>Dashboard</span>
                    </div>
                </div>
                <div
                    className="sidebar-option"
                    onClick={() => handleSidebarNavigate("/patients")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/patients") ? "bold" : ""
                        }`}
                    >
                        <Patient />
                        <span>Quản lý bệnh nhân</span>
                    </div>
                </div>
                <div
                    className="sidebar-option"
                    onClick={() => handleSidebarNavigate("/staffs")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/staffs") ? "bold" : ""
                        }`}
                    >
                        <Staff />
                        <span>Quản lý nhân viên</span>
                    </div>
                </div>
                <div className="sidebar-option"
                    onClick={() => handleSidebarNavigate("/medicines")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/medicines") ? "bold" : ""
                        }`}
                    >
                        <Medicine />
                        <span>Quản lý thuốc men</span>
                    </div>
                </div>
                <div className="sidebar-option"
                    onClick={() => handleSidebarNavigate("/equipments")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/equipments") ? "bold" : ""
                        }`}
                    >
                        <Tool />
                        <span>Quản lý trang thiết bị</span>
                    </div>
                </div>
                <div className="sidebar-option" onClick={handleLogout}>
                    <div className="sidebar-option-inner">
                        <span>Đăng xuất</span>
                    </div>
                </div>
            </div>
            <div
                className={`sidebar-mask ${open === true ? "open" : ""}`}
                onClick={onMaskClick}
            ></div>
        </>
    );
});

Sidebar.propTypes = {
    open: PropTypes.bool,
    onMaskClick: PropTypes.func,
};

Sidebar.defaultProps = {
    open: false,
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
