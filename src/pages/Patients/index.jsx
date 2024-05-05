import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import PatientsList from "./components/PatientsList/PatientsList";

import "./index.css";
import Filter from "../../assets/icons/Filter";
import FilterDialog from "./components/FilterDialog/FilterDialog";
import { useNavigate, useSearchParams } from "react-router-dom";

const Patients = memo(() => {
    const [searchParams, setSearchParams] = useSearchParams(); // new state for search params
    const [patientsData, setPatientsData] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [searchResult, setSearchResult] = useState([]); // new state for search results
    const [searchValue, setSearchValue] = useState(searchParams.get("name")); // new state for search value
    const [filterValue, setFilterValue] = useState({
        gender: searchParams.get("gender"),
        healthInsurance: searchParams.get("healthInsurance"),
    }); // new state for filter value
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(
        //count how many filters are applied
        Object.values(filterValue).filter((value) => value && value !== "")
            .length
    );

    const getPatientsData = useCallback(async () => {
        // check if paginationOption is provided
        let endpoint = "/patients";
        if (searchParams) {
            endpoint += "?";
        }
        if (searchParams.get("currentPage")) {
            endpoint += "&currentPage=" + searchParams.get("currentPage");
        }
        if (searchParams.get("pageSize")) {
            endpoint += "&pageSize=" + searchParams.get("pageSize");
        }
        if (searchParams.get("gender")) {
            endpoint +=
                "&gender=" + searchParams.get("gender") + "&currentPage=1";
        }
        if (searchParams.get("healthInsurance")) {
            endpoint +=
                "&healthInsurance=" +
                searchParams.get("healthInsurance") +
                "&currentPage=1&";
        }
        if (searchParams.get("name")) {
            endpoint += "&name=" + searchParams.get("name") + "&currentPage=1";
        }
        if (searchParams.get("sortBy")) {
            endpoint += "&sortBy=" + searchParams.get("sortBy");
        }
        if (searchParams.get("sortOrder")) {
            endpoint += "&sortOrder=" + searchParams.get("sortOrder");
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
        }
    }, [searchParams]);
    useEffect(() => {
        //get page parameter from url
        getPatientsData();
    }, [searchParams, getPatientsData]);
    const handleSearchAndFilter = (searchValue, filters) => {
        //search by name
        const urlSearchParams = new URLSearchParams(searchParams);
        if (searchValue && searchValue.length > 0)
            urlSearchParams.set("name", searchValue);
        else urlSearchParams.delete("name");
        //filter by gender
        //let filterGenderData = searchData;
        if (filters.gender && filters.gender !== "") {
            urlSearchParams.set(
                "gender",
                filters.gender === "Nam" ? "male" : "female"
            );
        } else {
            urlSearchParams.delete("gender");
        }
        if (filters.healthInsurance && filters.healthInsurance !== "") {
            urlSearchParams.set("healthInsurance", filters.healthInsurance);
        } else {
            urlSearchParams.delete("healthInsurance");
        }

        //sortOrder and sortBy
        if (searchParams.get("sortOrder")) {
            urlSearchParams.set("sortOrder", searchParams.get("sortOrder"));
        } else {
            urlSearchParams.delete("sortOrder");
        }
        if (searchParams.get("sortBy")) {
            urlSearchParams.set("sortBy", searchParams.get("sortBy"));
        } else {
            urlSearchParams.delete("sortBy");
        }
        setSearchParams(urlSearchParams.toString());

        //setSearchResult(filterHealthInsuranceData);
    };
    const navigate = useNavigate();
    return (
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
                            handleSearchAndFilter(e.target.value, filterValue);
                        }}
                        value={searchValue}
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
            {patientsData.length > 0 ? (
                <PatientsList
                    data={searchResult}
                    paginationData={paginationData}
                    onPaginate={(option) => {
                        // Get the current search params
                        const currentSearchParams = new URLSearchParams(
                            searchParams
                        );

                        // Set the new currentPage parameter
                        const currentPage =
                            option.page ||
                            currentSearchParams.get("currentPage") ||
                            1;
                        currentSearchParams.set("currentPage", currentPage);

                        // Set the new pageSize parameter
                        const pageSize =
                            option.pageSize ||
                            currentSearchParams.get("pageSize") ||
                            10;
                        currentSearchParams.set("pageSize", pageSize);

                        // Get the updated search params string
                        const updatedSearchParams =
                            currentSearchParams.toString();

                        // Update the search params
                        setSearchParams(updatedSearchParams);
                    }}
                    onSort={(option) => {
                        // Get the current search params
                        const currentSearchParams = new URLSearchParams(
                            searchParams
                        );

                        // Set the new sort parameter
                        const sortOrder =
                            option.sortOrder ||
                            currentSearchParams.get("sortOrder") ||
                            "asc";

                        currentSearchParams.set("sortOrder", sortOrder);
                        const sortBy =
                            option.sortBy ||
                            currentSearchParams.get("sortBy") ||
                            "name";

                        currentSearchParams.set("sortBy", sortBy);
                        // Get the updated search params string
                        const updatedSearchParams =
                            currentSearchParams.toString();

                        // Update the search params
                        setSearchParams(updatedSearchParams);
                    }}
                />
            ) : (
                <div>Không có dữ liệu</div>
            )}
        </div>
    );
});

Patients.displayName = "Patients";

export default Patients;
