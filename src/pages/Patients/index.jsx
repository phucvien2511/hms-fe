import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

const Patients = memo(() => {
    const [patientsData, setPatientsData] = useState([]);
    const getRandomDepartment = useCallback(() => {
        const departments = [
            "Khoa nội",
            "Khoa ngoại",
            "Khoa sản",
            "Khoa nhi",
            "Khoa mắt",
        ];
        return departments[Math.floor(Math.random() * departments.length)];
    }, []);
    const getPatientsData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/patients");
        // get status
        if (response.success) {
            //format patients data from response
            response.data.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.firstName + " " + item.lastName;
                formatData.birthday = item.dateOfBirth;
                formatData.healthInsurance = item.healthInsurance;
                formatData.department = getRandomDepartment();
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = item.phoneNumber;
                setPatientsData((prevData) => [...prevData, formatData]);
            });

            // response.data[0].map((item, index) => {
            //     item.id = index + 1;
            //     item.firstName = item.first;
            //     item.lastName = item.last;
            //     item.fullName = item.first + " " + item.last;
            //     item.birthday = item.created;
            //     item.admissionDate = "now";
            //     item.dischargeDate = "then";
            //     item.department = getRandomDepartment();
            //     return item;
            // });
        }
    }, [getRandomDepartment]);
    useEffect(() => {
        getPatientsData();
    }, [getPatientsData]);
    return (
        patientsData.length > 0 && (
            <div>
                <div style={{ color: "brown", fontSize: "24px" }}>
                    Danh sách bệnh nhân
                </div>
                <PatientsList data={patientsData} />
            </div>
        )
    );
});

Patients.displayName = "Patients";

export default Patients;
