import { memo, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

const Patients = memo(() => {
    const [patientsData, setPatientsData] = useState([]);
    const getPatientsData = async () => {
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
                item.department = "Khoa nội";
                return item;
            });
            setPatientsData(response.data[0]);
            console.log(response.data[0]);
        }
    };
    useEffect(() => {
        getPatientsData();
    }, []);
    return (
        <div>
            <h2 style={{ color: "brown" }}>Danh sách bệnh nhân</h2>
            <PatientsList data={patientsData} />
        </div>
    );
});

Patients.displayName = "Patients";

export default Patients;
