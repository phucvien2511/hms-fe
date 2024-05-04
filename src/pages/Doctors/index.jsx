import { MenuItem, Select, InputLabel } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import DoctorsList from "./components/DoctorsList/DoctorsList";

const Doctors = memo(() => {
    const [doctorsData, setDoctorsData] = useState([]);
    const formatPhoneNumber = useCallback((rawPhoneNumber) => {
        return "+84 " + rawPhoneNumber.slice(0, -3).substring(1) + "***";
    });
    const handleChangeSelect = useCallback(() => {});
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

    const getDoctorsData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/staff/doctors");

        if (response.success) {
            //format doctors data from response
            console.log('+++++++++', response.data);

            const formatDoctorData = response.data.doctors.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.firstName + " " + item.lastName;
                formatData.birthday = item.dateOfBirth;
                formatData.absence = item.absence;
                formatData.department = item.department;
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = formatPhoneNumber(item.phoneNumber);
                return formatData;
            });

            setDoctorsData([...formatDoctorData]);
        }
    }, []);

    useEffect(() => {
        getDoctorsData();
    }, [getDoctorsData]);

    return (
        doctorsData.length > 0 && (
            <div>
                <div style={{ color: "brown", fontSize: "24px", marginTop: "8px" }}>
                    Danh sách Bác Sĩ
                </div>
                <InputLabel id="khoa-truc-thuoc-select-label">Khoa Trực Thuộc</InputLabel>
                <Select
                    labelId="khoa-truc-thuoc-select-label"
                    id="khoa-truc-thuoc"
                    value={0}
                    label="Khoa Trực Thuộc"
                    onChange={handleChangeSelect}
                >
                    <MenuItem value={0}>Tất Cả Các Khoa</MenuItem>
                    <MenuItem value={1}>Khoa nhi</MenuItem>
                    <MenuItem value={2}>Khoa sản</MenuItem>
                    <MenuItem value={3}>Khoa nội</MenuItem>
                </Select>
                <DoctorsList data={doctorsData} />
            </div>
        )
    );
});

Doctors.displayName = "Doctors";

export default Doctors;