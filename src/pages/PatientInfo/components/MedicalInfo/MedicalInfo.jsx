import {
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    //TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { Suspense, memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MedicalInfo = memo(({ data }) => {
    // const [paginationOption, setPaginationOption] = useState({
    //     page: 0,
    //     rowsPerPage: 10,
    // });
    // const handlePageChange = useCallback((e, newPage) => {
    //     setPaginationOption((prevState) => ({
    //         ...prevState,
    //         page: newPage,
    //     }));
    // }, []);

    // const handleRowsPerPageChange = useCallback((e) => {
    //     setPaginationOption((prevState) => ({
    //         ...prevState,
    //         rowsPerPage: Number(e.target.value),
    //     }));
    //     setPaginationOption((prevState) => ({
    //         ...prevState,
    //         page: 0,
    //     }));
    // }, []);

    // Slice data to display on table
    // Will implement different logic when backend pagination is available
    // const sliceData = useCallback(
    //     (data) => {
    //         return data.slice(
    //             paginationOption.page * paginationOption.rowsPerPage,
    //             paginationOption.page * paginationOption.rowsPerPage +
    //                 paginationOption.rowsPerPage
    //         );
    //     },
    //     [paginationOption.page, paginationOption.rowsPerPage]
    // );

    const [sortOption, setSortOption] = useState({
        order: "asc",
        orderBy: "appointmentId",
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
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div className="patient-info-form">
            <Suspense fallback={<div>Loading...</div>}>
                {data.length > 0 ? (
                    <TableContainer
                        style={{
                            overflowX: "initial",
                        }}
                        className="Staffs-table"
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="Staffs table">
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
                                            active={
                                                sortOption.orderBy ===
                                                "appointmentTime"
                                            }
                                            direction={
                                                sortOption.orderBy ===
                                                "appointmentTime"
                                                    ? sortOption.order
                                                    : "asc"
                                            }
                                            onClick={() =>
                                                handleSortRequest(
                                                    "appointmentTime"
                                                )
                                            }
                                            style={{ fontWeight: 600 }}
                                        >
                                            Thời gian
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Bác sĩ phụ trách
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Chẩn đoán
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Phòng điều trị
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() => {
                                            navigate(
                                                "/edit-appointment/" +
                                                    id +
                                                    "/" +
                                                    row.appointmentId
                                            );
                                        }}
                                        className="medic-table-row"
                                    >
                                        <TableCell align="left">
                                            {row.appointmentTime}
                                        </TableCell>
                                        <TableCell>{row.doctor}</TableCell>
                                        <TableCell>{row.result}</TableCell>
                                        <TableCell>{row.roomID}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* <TablePagination
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
                        /> */}
                    </TableContainer>
                ) : (
                    <Alert
                        variant="outlined"
                        severity="info"
                        className="no-medical-records"
                    >
                        Không tìm thấy thông tin bệnh án của bệnh nhân này
                    </Alert>
                )}
            </Suspense>
        </div>
    );
});

MedicalInfo.propTypes = {
    data: PropTypes.array.isRequired,
};
// Display name for fast refresh using memo
MedicalInfo.displayName = "MedicalInfo";

export default MedicalInfo;
