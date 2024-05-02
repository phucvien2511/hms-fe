// import { TextField } from "@mui/material";
import {
    Suspense,
    memo,
    useCallback,
    useEffect,
    // useMemo,
    useState,
} from "react";
import ApiCall from "../../../../apis/config";

const MedicalInfo = memo(() => {
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
                <div>{patientsData[0].id}</div>
            </Suspense>
        </div>
    );
});

// Display name for fast refresh using memo
MedicalInfo.displayName = "MedicalInfo";

export default MedicalInfo;
