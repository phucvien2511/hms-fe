import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

import "./index.css";
import Filter from "../../assets/icons/Filter";
import FilterDialog from "./components/FilterDialog/FilterDialog";
import { useNavigate, useSearchParams } from "react-router-dom";

const Patients = memo(() => {
    const [patientsData, setPatientsData] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [searchResult, setSearchResult] = useState([]); // new state for search results
    const [searchValue, setSearchValue] = useState(""); // new state for search value
    const [filterValue, setFilterValue] = useState({}); // new state for filter value
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams(); // new state for search params
    const getPatientsData = useCallback(async (paginationOption) => {
        // check if paginationOption is provided
        let endpoint = "/patients";
        if (paginationOption.page) {
            endpoint += "?currentPage=" + paginationOption.page;
        }
        if (paginationOption.pageSize) {
            endpoint += "&pageSize=" + paginationOption.pageSize;
        }

        const apiCall = new ApiCall();
        const response = await apiCall.get(endpoint);
        // get status
        if (response.success) {
            //format patients data from response
            setPatientsData([]);
            setSearchResult([]);
            //console.log(response.data.patients);
            response.data.patients.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.fullName = item.lastName + " " + item.firstName;
                formatData.birthday = item.dateOfBirth;
                formatData.healthInsurance = item.healthInsurance;
                formatData.gender = item.gender === "male" ? "Nam" : "Nữ";
                formatData.phoneNumber = item.phoneNumber;
                setPatientsData((prevData) => [...prevData, formatData]);
                setSearchResult((prevData) => [...prevData, formatData]);
                //setPatientsData(formatData);
                //setSearchResult(formatData);
            });
            setPaginationData({
                totalPage: response.data.totalPage,
                currentPage: response.data.currentPage,
                pageSize: response.data.pageSize,
                totalRow: response.data.totalRow,
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
        //get page parameter from url
        getPatientsData({
            page: searchParams.get("currentPage") || 1,
            pageSize: searchParams.get("pageSize") || 10,
        });
    }, [searchParams, getPatientsData]);
    const handleSearchAndFilter = (searchValue, filters) => {
        //search by name
        const searchData = patientsData.filter((item) =>
            item.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );

        //filter by gender
        let filterGenderData = searchData;
        if (filters.gender && filters.gender !== "") {
            filterGenderData = searchData.filter(
                (item) => item.gender === filters.gender
            );
        }

        //filter by health insurance
        let filterHealthInsuranceData = filterGenderData;
        if (filters.healthInsurance && filters.healthInsurance !== "") {
            const formatFilterValue =
                filters.healthInsurance === "true" ? true : false;
            filterHealthInsuranceData = filterGenderData.filter(
                (item) => item.healthInsurance === formatFilterValue
            );
        }

        setSearchResult(filterHealthInsuranceData);
    };
    const navigate = useNavigate();
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
                            className="add-patient-btn"
                            onClick={() => navigate("/add-patient")}
                        >
                            <span>+</span>Thêm bệnh nhân
                        </div>
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
                <PatientsList
                    data={searchResult}
                    paginationData={paginationData}
                    onPaginate={(option) => {
                        //append page parameter to url
                        setSearchParams({
                            currentPage:
                                option.page ||
                                searchParams.get("currentPage") ||
                                1,
                            pageSize:
                                option.pageSize ||
                                searchParams.get("pageSize") ||
                                10,
                        });
                    }}
                />
            </div>
        )
    );
});

Patients.displayName = "Patients";

export default Patients;
