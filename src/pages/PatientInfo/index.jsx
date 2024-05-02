// import { TextField } from "@mui/material";
import { memo, useMemo } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
const PatientInfo = memo(() => {
    const currentPatientId = useMemo(() => {
        const path = window.location.pathname;
        const pathParts = path.split("/");
        return pathParts[pathParts.length - 1];
    }, []);
    const navigate = useNavigate();
    return (
        <div className="patient-info-wrapper">
            <div className="nav" onClick={() => navigate("/patients")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <h2 style={{ color: "brown" }}>
                Thông tin bệnh nhân {currentPatientId}
            </h2>
            <div>Thông tin cá nhân</div>
            <GeneralInfo />
            <div>Thông tin bệnh án</div>
        </div>
    );
});

// Display name for fast refresh using memo
PatientInfo.displayName = "PatientInfo";

export default PatientInfo;
