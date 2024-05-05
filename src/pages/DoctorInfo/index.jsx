// import { TextField } from "@mui/material";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import ApiCall from "../../apis/config";
// import MedicalInfo from "./components/MedicalInfo/MedicalInfo";

const DoctorInfo = memo(() => {
    const doctorId = useMemo(() => {
        const path = window.location.pathname;
        const pathParts = path.split("/")[2];
        return pathParts;
    }, []);
    const [doctorData, setDoctorData] = useState({});
    const getDoctorData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/staff/doctors/" + doctorId);
        // get status
        if (response.success) {
            setDoctorData(response.data);
        }
    }, [doctorId]);

    useEffect(() => {
        getDoctorData();
    }, [getDoctorData]);
    const navigate = useNavigate();
    return (
        <div className="doctor-info-wrapper">
            <div className="nav" onClick={() => navigate("/doctors")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div className="mt-2">Thông Tin Hồ Sơ Bác Sĩ</div>
            <GeneralInfo data={doctorData} />
        </div>
    );
});

// Display name for fast refresh using memo
DoctorInfo.displayName = "DoctorInfo";

export default DoctorInfo;