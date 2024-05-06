// import { memo, useCallback, useEffect, useState } from "react";
// import ApiCall from "../../apis/config";
// import StaffsList from "./components/StaffsList/StaffsList";

// const Staffs = memo(() => {
//     const [staffsData, setStaffsData] = useState([]);
//     const getRandomDepartment = () => {
//         const departments = [
//             "Khoa nội",
//             "Khoa ngoại",
//             "Khoa sản",
//             "Khoa nhi",
//             "Khoa mắt",
//         ];
//         return departments[Math.floor(Math.random() * departments.length)];
//     };
//     const getStaffsData = useCallback(async () => {
//         let response = await ApiCall.get("/staff/nurse");
//         if (response.success) {
//             // Change the key name of response.data[0]
//             response.data[0].map((item, index) => {
//                 item.id = index + 1;
//                 item.firstName = item.first;
//                 item.lastName = item.last;
//                 item.fullName = item.first + " " + item.last;
//                 item.birthday = item.created;
//                 item.department = getRandomDepartment();
//                 return item;    
//             });
//             setStaffsData(response.data[0]);
//             console.log('NURRRRSE: ', response.data[0]);
//         }

//         response = await ApiCall.get("/staff/supportStaff");
//         if (response.success) {
//             // Change the key name of response.data[0]
//             response.data[0].map((item, index) => {
//                 item.id = index + 1;
//                 item.firstName = item.first;
//                 item.lastName = item.last;
//                 item.fullName = item.first + " " + item.last;
//                 item.birthday = item.created;
//                 item.department = getRandomDepartment();
//                 return item;
//             });
//             setStaffsData(response.data[0]);
//             console.log('SUPPORT: ', response.data[0]);
//         }
//     }, []);
//     useEffect(() => {
//         getStaffsData();
//     }, [getStaffsData]);
//     return (
//         <div style={{ height: "100%" }}>
//             <h2 style={{ color: "brown" }}>Danh sách nhân viên</h2>
//             <StaffsList data={staffsData} />
//         </div>
//     );
// });

// Staffs.displayName = "Staffs";

// export default Staffs;
import { MenuItem, Select, InputLabel } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import StaffsList from "./components/StaffsList/StaffsList";
import Filter from "../../assets/icons/Filter";
import "./index.css";
import FilterDialog from "./components/FilterDialog/FilterDialog";

const Staffs = memo(() => {
    const [searchResult, setSearchResult] = useState([]); // new state for search results
    const [searchValue, setSearchValue] = useState(""); // new state for search value
    const [filterValue, setFilterValue] = useState({}); // new state for filter value
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(0);
    const [StaffsData, setStaffsData] = useState([]);
    const formatPhoneNumber = useCallback((rawPhoneNumber) => {
        return "+84 " + rawPhoneNumber.slice(0, -3).substring(1) + "***";
    });
    const handleChangeSelect = useCallback(() => {});

    const getStaffsData = useCallback(async () => {
        const apiCall = new ApiCall();
        let response = await apiCall.get("/staff/nurses");
        let staffsData = []

        if (response.success) {
            //format Staffs data from response
            console.log('+++++++++NURSEEEEE', response.data);

            const formatStaffData = response.data.nurses.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.firstName + " " + item.lastName;
                formatData.birthday = item.dateOfBirth;
                formatData.absence = item.absence;
                // formatData.department = item.department;
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = formatPhoneNumber(item.phoneNumber);
                formatData.empType = "nurse"
                return formatData;
            });

            staffsData = [...formatStaffData]
        }

        response = await apiCall.get("/staff/supportStaff");

        if (response.success) {
            //format Staffs data from response
            console.log('+++++++++SupportStaff', response.data.message.supportStaff);

            const formatStaffData = response.data.message.supportStaff.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.firstName + " " + item.lastName;
                formatData.birthday = item.dateOfBirth;
                formatData.absence = item.absence;
                // formatData.department = item.department;
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = formatPhoneNumber(item.phoneNumber);
                formatData.empType = "support-staff"
                return formatData;
            });

            staffsData = [...staffsData, ...formatStaffData ]

            // console.log(staffsData)

            setStaffsData([...staffsData]);
            setSearchResult([...staffsData]);
        }
    }, []);

    useEffect(() => {
        getStaffsData();
    }, [getStaffsData]);

    const handleSearchAndFilter = (searchValue, filters) => {
        //search by name
        const searchData = StaffsData.filter((item) =>
            item.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
        //filter by empType
        let filterDepData = searchData;
        if (filters.empType && filters.empType !== "") {
            filterDepData = searchData.filter(
                (item) => item.empType === filters.empType
            );
        }
        //filter by gender
        let filterGenderData = filterDepData;
        if (filters.gender && filters.gender !== "") {
            filterGenderData = filterDepData.filter(
                (item) => item.gender === filters.gender
            );
        }

        setSearchResult(filterGenderData);
    };

    return (
        StaffsData.length > 0 > 0 && (
            <div style={{ marginTop: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "24px" }}>
                    Danh sách Nhân Viên
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                        }}
                    >
                        <div
                            className="doctors-filter-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("clicked");
                                setDialogOpen(true);
                            }}
                        >
                            <Filter />
                            Lọc
                            {numFilter > 0 && <span>{numFilter}</span>}
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên nhân viên"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                handleSearchAndFilter(
                                    e.target.value,
                                    filterValue
                                );
                            }}
                            className="doctor-search"
                        />
                    </div>
                </div>
                <FilterDialog
                    open={dialogOpen}
                    onMaskClick={(state) => setDialogOpen(state)}
                    onFilter={(data) => {
                        //set how many filters are applied (ignore value '')
                        setNumFilter(
                            Object.values(data).filter((value) => value !== "")
                                .length
                        );
                        setFilterValue(data);
                        handleSearchAndFilter(searchValue, data);
                    }}
                />
                <StaffsList data={searchResult} />
            </div>
        )
    );
});

Staffs.displayName = "Staffs";

export default Staffs;
