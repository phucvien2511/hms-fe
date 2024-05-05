import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import DoctorsList from "./components/DoctorsList/DoctorsList";

import "./index.css";
import Filter from "../../assets/icons/Filter";
import FilterDialog from "./components/FilterDialog/FilterDialog";

const Doctors = memo(() => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [searchResult, setSearchResult] = useState([]); // new state for search results
    const [searchValue, setSearchValue] = useState(""); // new state for search value
    const [filterValue, setFilterValue] = useState({}); // new state for filter value
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(0);
    const formatPhoneNumber = useCallback((rawPhoneNumber) => {
        return "+84 " + rawPhoneNumber.slice(0, -3).substring(1) + "***";
    });    
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
            setSearchResult([...formatDoctorData]);
        }
    }, []);

    useEffect(() => {
        getDoctorsData();
    }, []);

    const handleSearchAndFilter = (searchValue, filters) => {
        //search by name
        const searchData = doctorsData.filter((item) =>
            item.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
        //filter by department
        let filterDepData = searchData;
        if (filters.department && filters.department !== "") {
            filterDepData = searchData.filter(
                (item) => item.department === filters.department
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
        doctorsData.length > 0 && (
            <div style={{ marginTop: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "24px" }}>
                        Danh sách Bác Sĩ
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
                            placeholder="Tìm kiếm tên bác sĩ"
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
                <DoctorsList data={searchResult} />
            </div>
        )
    );
});

Doctors.displayName = "Doctors";

export default Doctors;
