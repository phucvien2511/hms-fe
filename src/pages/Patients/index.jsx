import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

const Patients = memo(() => {
    const [patientsData, setPatientsData] = useState([]);
    // const getRandomDepartment = useCallback(() => {
    //     const departments = [
    //         "Khoa nội",
    //         "Khoa ngoại",
    //         "Khoa sản",
    //         "Khoa nhi",
    //         "Khoa mắt",
    //     ];
    //     return departments[Math.floor(Math.random() * departments.length)];
    // }, []);
    const getPatientsData = useCallback(async () => {
        const response = await ApiCall.get("/patients");
        // get status
        if (response.success) {
            console.log("response", response.data);
            // response.data.map((index, item) => {
            //     item.id = index + 1;
            //     item.fullName = item.firstName + " " + item.lastName;
            //     item.birthday = item.dateOfBirth;
            //     item.age;
            //     item.gender;
            //     item.healthInsurance;
            //     item.department = getRandomDepartment();
            //     return item;
            // });

            setPatientsData(response.data);
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
    }, []);
    useEffect(() => {
        getPatientsData();
        console.log("Patients data called!");
    }, [getPatientsData]);
    return (
        <div>
            <div style={{ color: "brown", fontSize: "24px" }}>
                Danh sách bệnh nhân
            </div>
            <PatientsList data={patientsData} />
        </div>
    );
});

Patients.displayName = "Patients";

export default Patients;
