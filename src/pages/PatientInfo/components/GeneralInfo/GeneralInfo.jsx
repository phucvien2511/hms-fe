import { TextField } from "@mui/material";
import {
    Suspense,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import ApiCall from "../../../../apis/config";

const GeneralInfo = memo(() => {
    const currentPatientId = useMemo(() => {
        const path = window.location.pathname;
        const pathParts = path.split("/");
        return pathParts[pathParts.length - 1];
    }, []);
    const [patientsData, setPatientsData] = useState([]);
    const getPatientsData = useCallback(async () => {
        const response = await ApiCall.get("/");
        if (response.success) {
            // Change the key name of response.data[0]
            response.data[0].map((item, index) => {
                item.id = index + 1;
                item.firstName = item.first;
                item.lastName = item.last;
                item.fullName = item.first + " " + item.last;
                item.birthday = item.created;
                item.admissionDate = "now";
                item.dischargeDate = "then";
                item.department = "test";
                return item;
            });
            setPatientsData(response.data[0]);
            console.log(response.data[0]);
        }
    }, []);
    useEffect(() => {
        getPatientsData();
    }, [getPatientsData]);
    return (
        <div className="patient-info-form">
            <Suspense fallback={<div>Loading...</div>}>
                {patientsData[currentPatientId - 1] && (
                    <>
                        <TextField
                            label="STT"
                            disabled
                            value={currentPatientId}
                            size="small"
                            required
                        />
                        <TextField
                            label="Họ và tên"
                            defaultValue={
                                patientsData[currentPatientId - 1]?.fullName
                            }
                            size="small"
                            required
                        />
                        <TextField
                            label="Ngày sinh"
                            defaultValue={
                                patientsData[currentPatientId - 1]?.birthday
                            }
                            size="small"
                            required
                        />
                        <TextField
                            label="Khoa điều trị"
                            defaultValue={
                                patientsData[currentPatientId - 1]?.department
                            }
                            size="small"
                            required
                        />
                        <TextField
                            label="Ngày vào viện"
                            defaultValue={
                                patientsData[currentPatientId - 1]
                                    ?.admissionDate
                            }
                            size="small"
                            required
                        />
                    </>
                )}
            </Suspense>
        </div>
    );
});

// Display name for fast refresh using memo
GeneralInfo.displayName = "GeneralInfo";

export default GeneralInfo;
