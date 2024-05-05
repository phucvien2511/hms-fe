import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import StaffsList from "./components/StaffsList/StaffsList";

const Staffs = memo(() => {
    const [staffsData, setStaffsData] = useState([]);
    const getRandomDepartment = () => {
        const departments = [
            "Khoa nội",
            "Khoa ngoại",
            "Khoa sản",
            "Khoa nhi",
            "Khoa mắt",
        ];
        return departments[Math.floor(Math.random() * departments.length)];
    };
    const getStaffsData = useCallback(async () => {
        const response = await ApiCall.get("/staff");
        if (response.success) {
            // Change the key name of response.data[0]
            response.data[0].map((item, index) => {
                item.id = index + 1;
                item.firstName = item.first;
                item.lastName = item.last;
                item.fullName = item.first + " " + item.last;
                item.birthday = item.created;
                item.department = getRandomDepartment();
                return item;
            });
            setStaffsData(response.data[0]);
            console.log(response.data[0]);
        }
    }, []);
    useEffect(() => {
        getStaffsData();
    }, [getStaffsData]);
    return (
        <div style={{ height: "100%" }}>
            <h2 style={{ color: "brown" }}>Danh sách nhân viên</h2>
            <StaffsList data={staffsData} />
        </div>
    );
});

Staffs.displayName = "Staffs";

export default Staffs;
