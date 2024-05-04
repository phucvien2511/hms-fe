import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

import "./index.css";
import Filter from "../../assets/icons/Filter";
import FilterDialog from "./components/FilterDialog/FilterDialog";

const Patients = memo(() => {
    const [patientsData, setPatientsData] = useState([]);
    const [searchResult, setSearchResult] = useState([]); // new state for search results
    const [searchValue, setSearchValue] = useState(""); // new state for search value
    const [filterValue, setFilterValue] = useState({}); // new state for filter value
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(0);
    const getPatientsData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/patients");
        // get status
        if (response.success) {
            //format patients data from response
            response.data.patients.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.lastName + " " + item.firstName;
                formatData.birthday = item.dateOfBirth;
                formatData.healthInsurance = item.healthInsurance;
                formatData.department = item.department;
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = item.phoneNumber;
                setPatientsData((prevData) => [...prevData, formatData]);
                setSearchResult((prevData) => [...prevData, formatData]);
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
    }, []);
    useEffect(() => {
        getPatientsData();
    }, [getPatientsData]);
    const handleSearchAndFilter = (searchValue, filters) => {
        //search by name
        const searchData = patientsData.filter((item) =>
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
        patientsData.length > 0 && (
            <div style={{ marginTop: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "24px" }}>
                        Danh sách bệnh nhân
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
                            className="patients-filter-btn"
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
                            placeholder="Tìm kiếm tên bệnh nhân"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                handleSearchAndFilter(
                                    e.target.value,
                                    filterValue
                                );
                            }}
                            className="patient-search"
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
                <PatientsList data={searchResult} />
            </div>
        )
    );
});

Patients.displayName = "Patients";

export default Patients;
