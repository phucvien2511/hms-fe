import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import "./PatientsList.css";

const PatientsList = memo(({ data }) => {
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

    const sliceData = useCallback(() => {
        return data.slice(
            paginationOption.page * paginationOption.rowsPerPage,
            paginationOption.page * paginationOption.rowsPerPage +
                paginationOption.rowsPerPage
        );
    }, [data, paginationOption.page, paginationOption.rowsPerPage]);
    return (
        <div>
            <TableContainer
                style={{
                    overflowX: "initial",
                }}
                className="patients-table"
            >
                <Table sx={{ minWidth: 650 }} aria-label="patients table">
                    <TableHead
                        style={{
                            position: "sticky",
                            top: 48,
                            background: "white",
                            boxShadow: "0 1px 0px 0 rgba(0,0,0,0.15)",
                        }}
                    >
                        <TableRow>
                            <TableCell style={{ fontWeight: 600 }}>
                                STT
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                                Họ và tên
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                                Ngày sinh
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                                Ngày vào viện
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                                Khoa khám
                            </TableCell>
                            <TableCell style={{ fontWeight: 600 }}>
                                Ngày xuất viện
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sliceData().map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {index +
                                        1 +
                                        paginationOption.page *
                                            paginationOption.rowsPerPage}
                                </TableCell>
                                <TableCell align="left">
                                    {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell>{row.created}</TableCell>
                                <TableCell>{row.admissionDate}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.dischargeDate}</TableCell>
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
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
PatientsList.propTypes = {
    data: PropTypes.array,
};

// Display name for fast refresh using memo
PatientsList.displayName = "PatientsList";

export default PatientsList;