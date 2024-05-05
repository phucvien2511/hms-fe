import { memo, useCallback, useEffect, useState } from "react";
import ApiCall from "../../apis/config";
import EquipmentList from "./components/EquipmentsList/EquipmentsList"; // Import EquipmentList

import "./index.css";
import Filter from "../../assets/icons/Filter";
import FilterDialog from "./components/FilterDialog/FilterDialog"; // Import FilterDialog
import { useNavigate, useSearchParams } from "react-router-dom";

const Equipment = memo(() => {
    const [equipmentData, setEquipmentData] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numFilter, setNumFilter] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [deletedEquipmentId, setDeletedEquipmentId] = useState(null);

    const getEquipmentData = useCallback(async (paginationOption) => {
        let endpoint = "/resources/equipment";
        if (paginationOption.page) {
            endpoint += "?currentPage=" + paginationOption.page;
        }
        if (paginationOption.pageSize) {
            endpoint += "&pageSize=" + paginationOption.pageSize;
        }

        const apiCall = new ApiCall();
        const response = await apiCall.get(endpoint);
        if (response.success) {
            setEquipmentData([]);
            setSearchResult([]);
            response.data.equipment.map((item, index) => {
                const formatData = {};
                formatData.id = item.id;
                formatData.index = index + 1;
                formatData.cost = item.cost;
                formatData.name = item.name;
                formatData.type = item.type;
                formatData.availability = item.availability;
                formatData.condition = item.condition;
                setEquipmentData((prevData) => [...prevData, formatData]);
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
        getEquipmentData({
            page: searchParams.get("currentPage") || 1,
            pageSize: searchParams.get("pageSize") || 10,
        });
    }, [searchParams, getEquipmentData, deletedEquipmentId]);

    const handleSearchAndFilter = (searchValue, filters) => {
        // Search by name
        let searchData = equipmentData.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Filter by type
        if (filters.type && filters.type !== "") {
            searchData = searchData.filter(
                (item) => item.type === filters.type
            );
        }

        // Filter by status
        if (filters.status && filters.status !== "") {
            searchData = searchData.filter(
                (item) => item.status === filters.status
            );
        }

        setSearchResult(searchData);
    };

    const navigate = useNavigate();
    return (
        equipmentData.length > 0 && (
            <div style={{ marginTop: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "24px" }}>
                        Danh sách thiết bị
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
                            className="add-equipment-btn"
                            onClick={() => navigate("/add-equipment")}
                        >
                            <span>+</span>Thêm thiết bị
                        </div>
                        <div
                            className="equipment-filter-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDialogOpen(true);
                            }}
                        >
                            <Filter />
                            Lọc
                            {numFilter > 0 && <span>{numFilter}</span>}
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên thiết bị"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                handleSearchAndFilter(
                                    e.target.value,
                                    filterValue
                                );
                            }}
                            className="equipment-search"
                        />
                    </div>
                </div>
                <FilterDialog
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
                />
                <EquipmentList
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
                    onDelete={(id) => setDeletedEquipmentId(id)}
                />
            </div>
        )
    );
});

Equipment.displayName = "Equipment";

export default Equipment;