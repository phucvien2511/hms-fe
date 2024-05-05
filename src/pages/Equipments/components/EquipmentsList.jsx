import { memo, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { TablePagination, TableSortLabel } from "@mui/material";

//import "./EquipmentsList.css";
import { useNavigate } from "react-router-dom";

const EquipmentsList = memo(({ data, paginationData, onPaginate }) => {
    console.log("data", data);
    const [sortOption, setSortOption] = useState({
        order: "asc",
        orderBy: "index",
    });
    const handleSortRequest = (property) => {
        const isAsc =
            sortOption.orderBy === property && sortOption.order === "asc";
        setSortOption((prev) => ({
            ...prev,
            order: isAsc ? "desc" : "asc",
        }));
        setSortOption((prev) => ({
            ...prev,
            orderBy: property,
        }));
    };

    const sortedData = [...data].sort((a, b) => {
        let comparison = 0;
        if (a[sortOption.orderBy] > b[sortOption.orderBy]) {
            comparison = 1;
        } else if (a[sortOption.orderBy] < b[sortOption.orderBy]) {
            comparison = -1;
        }
        return sortOption.order === "asc" ? comparison : -comparison;
    });

    const navigate = useNavigate();
    return (
        <div className="Staff-list-header">
            {data.length > 0 ? (
                <TableContainer
                    style={{
                        overflowX: "initial",
                    }}
                    className="Patients-table"
                >
                    <Table sx={{ minWidth: 650 }} aria-label="Patients table">
                        <TableHead
                            style={{
                                position: "sticky",
                                top: 48,
                                background: "white",
                                boxShadow: "0 1px 0px 0 rgba(0,0,0,0.15)",
                            }}
                        >
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === "index"}
                                        direction={
                                            sortOption.orderBy === "index"
                                                ? sortOption.order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSortRequest("index")
                                        }
                                        style={{ fontWeight: 600 }}
                                    >
                                        STT
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={
                                            sortOption.orderBy === "fullName"
                                        }
                                        direction={
                                            sortOption.orderBy === "fullName"
                                                ? sortOption.order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSortRequest("fullName")
                                        }
                                        style={{ fontWeight: 600 }}
                                    >
                                        Tên
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Giá vật tư
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Sẵn sàng để dùng
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Tình trạng
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {sliceData(sortedData).map((row, index) => ( */}
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        navigate(`/patients/${row.id}`)
                                    }
                                    className="patients-table-row"
                                >
                                    <TableCell align="left">
                                        {/* {index +
                                        1 +
                                        paginationOption.page *
                                            paginationOption.rowsPerPage} */}
                                        {index +
                                            1 +
                                            (paginationData.currentPage - 1) *
                                                paginationData.pageSize}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.cost
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                    </TableCell>
                                    <TableCell>{row.availability}</TableCell>
                                    <TableCell>{row.condition}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={paginationData.totalRow}
                        rowsPerPage={paginationData.pageSize * 1}
                        labelRowsPerPage={"Số lượng hiển thị mỗi trang"}
                        labelDisplayedRows={({ from, to, count }) => {
                            return `${from}-${to} trong tổng số ${
                                count !== -1 ? count : `nhiều hơn ${to}`
                            }`;
                        }}
                        page={paginationData.currentPage - 1}
                        //onPageChange={handlePageChange}
                        onRowsPerPageChange={(e) => {
                            onPaginate({
                                pageSize: Number(e.target.value),
                                page: 1,
                            });
                        }}
                        onPageChange={(e, newPage) => {
                            onPaginate({ page: newPage + 1 });
                        }}
                        style={{
                            position: "sticky",
                            bottom: 0,
                            background: "white",
                        }}
                    />
                </TableContainer>
            ) : (
                <div>Không có dữ liệu</div>
            )}
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
EquipmentsList.propTypes = {
    data: PropTypes.array,
    paginationData: PropTypes.object,
    onPaginate: PropTypes.func,
};

// Display name for fast refresh using memo
EquipmentsList.displayName = "EquipmentsList";

export default EquipmentsList;
