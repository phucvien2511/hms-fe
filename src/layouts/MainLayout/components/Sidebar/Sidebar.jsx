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
                    onClick={() => handleSidebarNavigate("/doctors")}
                >
                    <div
                        className={`sidebar-option-inner ${
                            isCurrentPath("/doctors") ? "bold" : ""
                        }`}
                    >
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24"
                        >
                            <path fill-rule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                        </svg>

                        <span>Quản lý y bác sĩ</span>
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
