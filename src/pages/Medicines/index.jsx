import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import MedicinesList from "./components/MedicinesList/MedicinesList";

import "./index.css";
// import Filter from "../../assets/icons/Filter";
// import FilterDialog from "./components/FilterDialog/FilterDialog";
import { useNavigate, useSearchParams } from "react-router-dom";

const Medicines = memo(() => {
    const [medicineData, setMedicineData] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState({});
    // const [dialogOpen, setDialogOpen] = useState(false);
    // const [numFilter, setNumFilter] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [deletedMedicineId, setDeletedMedicineId] = useState(null);

    const getMedicineData = useCallback(async (paginationOption) => {
        let endpoint = "/resources/drugs";
        if (paginationOption.page) {
            endpoint += "?currentPage=" + paginationOption.page;
        }
        if (paginationOption.pageSize) {
            endpoint += "&pageSize=" + paginationOption.pageSize;
        }

        const apiCall = new ApiCall();
        const response = await apiCall.get(endpoint);
        if (response.success) {
            setMedicineData([]);
            setSearchResult([]);
            response.data.drugs.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.cost = item.cost;
                formatData.name = item.name;
                formatData.type = item.type;
                formatData.expiryDate = item.expiryDate;
                formatData.quantity = item.quantity;
                setMedicineData((prevData) => [...prevData, formatData]);
                setSearchResult((prevData) => [...prevData, formatData]);
            });
            setPaginationData({
                totalPage: response.data.totalPage,
                currentPage: response.data.currentPage,
                pageSize: response.data.pageSize,
                totalRow: response.data.totalRow,
            });
        }
    }, []);

    useEffect(() => {
        getMedicineData({
            page: searchParams.get("currentPage") || 1,
            pageSize: searchParams.get("pageSize") || 10,
        });
    }, [searchParams, getMedicineData, deletedMedicineId]);

    const handleSearchAndFilter = (searchValue, filters) => {
        // Search by name
        let searchData = medicineData.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Filter by type
        if (filters.type && filters.type !== "") {
            searchData = searchData.filter(
                (item) => item.type === filters.type
            );
        }

        setSearchResult(searchData);
    };

    const navigate = useNavigate();
    return (
        medicineData.length > 0 && (
            <div style={{ marginTop: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "24px" }}>
                        Danh sách thuốc
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
                            className="add-medicine-btn"
                            onClick={() => navigate("/add-medicine")}
                        >
                            <span>+</span>Thêm thuốc
                        </div>
                        {/* <div
                            className="medicine-filter-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDialogOpen(true);
                            }}
                        >
                            <Filter />
                            Lọc
                            {numFilter > 0 && <span>{numFilter}</span>}
                        </div> */}
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên thuốc"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                handleSearchAndFilter(
                                    e.target.value,
                                    filterValue
                                );
                            }}
                            className="medicine-search"
                        />
                    </div>
                </div>
                {/* <FilterDialog
                    open={dialogOpen}
                    onMaskClick={(state) => setDialogOpen(state)}
                    onFilter={(data) => {
                        setNumFilter(
                            Object.values(data).filter((value) => value !== "")
                                .length
                        );
                        setFilterValue(data);
                        handleSearchAndFilter(searchValue, data);
                    }}
                /> */}
                <MedicinesList
                    data={searchResult}
                    paginationData={paginationData}
                    onPaginate={(option) => {
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
                    onDelete={(id) => setDeletedMedicineId(id)}
                />
            </div>
        )
    );
});

Medicines.displayName = "Medicines";

export default Medicines;