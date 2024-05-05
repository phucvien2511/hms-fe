// import { TextField } from "@mui/material";

import { memo, useCallback, useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import ApiCall from "../../apis/config";
import MedicalInfo from "./components/MedicalInfo/MedicalInfo";
const PatientInfo = memo(() => {
    const { id } = useParams();
    const [patientData, setPatientData] = useState({});
    const [medicalRecord, setMedicalRecord] = useState({});
    const getPatientData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/patients/" + id);
        // get status
        if (response.success) {
            setPatientData(response.data);
        }
    }, [id]);
    const getMedicalRecord = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get(
            "/patients/" + id + "/medicalRecords"
        );
        if (response.success) {
            setMedicalRecord(response.data.appointments);
        }
    }, [id]);

    useEffect(() => {
        getPatientData();
        getMedicalRecord();
    }, [getPatientData, getMedicalRecord]);
    const navigate = useNavigate();
    return (
        <div className="patient-info-wrapper">
            <div className="nav" onClick={() => navigate("/patients")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div>Thông tin bệnh nhân</div>
            <GeneralInfo data={patientData} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>Lịch sử khám</div>
                <div
                    className="add-medic-btn"
                    onClick={() => navigate("/add-appointment/" + id)}
                >
                    <span>+</span>Thêm lượt khám
                </div>
            </div>
            <MedicalInfo data={medicalRecord} />
        </div>
    );
});

// Display name for fast refresh using memo
PatientInfo.displayName = "PatientInfo";

export default PatientInfo;
