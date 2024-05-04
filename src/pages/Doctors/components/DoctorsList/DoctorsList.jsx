import { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { TablePagination, TableSortLabel } from "@mui/material";

import "./DoctorsList.css";
import { useNavigate } from "react-router-dom";

const DoctorsList = memo(({ data }) => {
    console.log("data", data);
    const [paginationOption, setPaginationOption] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const handlePageChange = useCallback((e, newPage) => {
        setPaginationOption((prevState) => ({
            ...prevState,
            page: newPage,
        }));
    }, []);

    const handleRowsPerPageChange = useCallback((e) => {
        setPaginationOption((prevState) => ({
            ...prevState,
            rowsPerPage: Number(e.target.value),
        }));
        setPaginationOption((prevState) => ({
            ...prevState,
            page: 0,
        }));
    }, []);

    const sliceData = useCallback(
        (data) => {
            return data.slice(
                paginationOption.page * paginationOption.rowsPerPage,
                paginationOption.page * paginationOption.rowsPerPage +
                    paginationOption.rowsPerPage
            );
        },
        [paginationOption.page, paginationOption.rowsPerPage]
    );

    const [sortOption, setSortOption] = useState({
        order: "asc",
        orderBy: "id",
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
            {data.length > 0 && (
                <TableContainer
                    style={{
                        overflowX: "initial",
                    }}
                    className="Doctors-table"
                >
                    <Table sx={{ minWidth: 650 }} aria-label="Doctors table">
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
                                        Họ và tên
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Ngày sinh
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Giới tính
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Khoa Trực Thuộc
                                </TableCell>
                                <TableCell style={{ fontWeight: 600 }}>
                                    Điện Thoại
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sliceData(sortedData).map((row, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        navigate(`/doctors/${row.id}`)
                                    }
                                    className="doctors-table-row"
                                >
                                    <TableCell align="left">
                                        {/* {index +
                                        1 +
                                        paginationOption.page *
                                            paginationOption.rowsPerPage} */}
                                        {row.index}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.fullName}
                                    </TableCell>
                                    <TableCell>{row.birthday}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                    <TableCell>
                                        {row.phoneNumber}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={data.length}
                        rowsPerPage={paginationOption.rowsPerPage}
                        labelRowsPerPage={"Số lượng hiển thị mỗi trang"}
                        labelDisplayedRows={({ from, to, count }) => {
                            return `${from}-${to} trong tổng số ${
                                count !== -1 ? count : `nhiều hơn ${to}`
                            }`;
                        }}
                        page={paginationOption.page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        style={{
                            position: "sticky",
                            bottom: 0,
                            background: "white",
                        }}
                    />
                </TableContainer>
            )}
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
DoctorsList.propTypes = {
    data: PropTypes.array,
};

// Display name for fast refresh using memo
DoctorsList.displayName = "DoctorsList";

export default DoctorsList;
