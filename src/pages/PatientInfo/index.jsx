// import { TextField } from "@mui/material";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import ApiCall from "../../apis/config";
import MedicalInfo from "./components/MedicalInfo/MedicalInfo";
const PatientInfo = memo(() => {
    const patientId = useMemo(() => {
        const path = window.location.pathname;
        const pathParts = path.split("/")[2];
        return pathParts;
    }, []);
    const [patientData, setPatientData] = useState({});
    const [medicalRecord, setMedicalRecord] = useState({});
    const getPatientData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/patients/" + patientId);
        // get status
        if (response.success) {
            setPatientData(response.data);
        }
    }, [patientId]);
    const getMedicalRecord = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get(
            "/patients/" + patientId + "/medicalRecords"
        );
        if (response.success) {
            setMedicalRecord(response.data.appointments);
        }
    }, [patientId]);

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
            <div>Lịch sử bệnh án</div>
            <MedicalInfo data={medicalRecord} />
        </div>
    );
});

// Display name for fast refresh using memo
PatientInfo.displayName = "PatientInfo";

export default PatientInfo;
