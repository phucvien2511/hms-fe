import { memo, useState } from "react";
import PropTypes from "prop-types";
import IconButton from '@mui/material/IconButton';
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../../../apis/config";

import "./MedicinesList.css";

const MedicinesList = memo(({ data, paginationData, onPaginate, onDelete }) => {
    const [sortOption, setSortOption] = useState({
        order: "asc",
        orderBy: "index",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [medicineToDelete, setMedicineToDelete] = useState({
        id: null,
        name: null,
    });
    
    const openDeleteDialog = (medicineId, medicineName) => {
        setMedicineToDelete({
            id: medicineId,
            name: medicineName,
        });
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.delete("/resources/drugs/" + medicineToDelete.id);
        if (response.success) {
            alert(`Xóa thuốc: "${medicineToDelete.name}" thành công`)
            onDelete(medicineToDelete);
        }
        else {
            alert(`Xóa thuốc: "${medicineToDelete.name}" thất bại`)
        }    
        setDialogOpen(false);
        setMedicineToDelete({
            id: null,
            name: null,
        });
    };
    
    const handleSortRequest = (property) => {
        const isAsc =
            sortOption.orderBy === property && sortOption.order === "asc";
        setSortOption((prev) => ({
            ...prev,
            order: isAsc ? "desc" : "asc",
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
        <div className="Medicine-list-header">
            {data.length > 0 ? (
                <TableContainer
                    style={{
                        overflowX: "initial",
                    }}
                    className="Medicine-table"
                >
                    <Table sx={{ minWidth: 650 }} aria-label="Medicine table">
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
                                        active={sortOption.orderBy === 'name'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('name')}
                                    >
                                        Tên thuốc
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === 'cost'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('cost')}
                                    >
                                        Giá tiền
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === 'type'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('type')}
                                    >
                                        Loại
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === 'expiryDate'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('expiryDate')}
                                    >
                                        Ngày hết hạn
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === 'quantity'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('quantity')}
                                    >
                                       Số lượng
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        navigate(`/medicines/${row.id}`)
                                    }
                                    className="medicine-table-row"
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.cost ? row.cost.toString() : "-"}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.expiryDate !== undefined ? row.expiryDate.toString() : "-"}</TableCell>
                                    <TableCell>{row.quantity || "-"}</TableCell>  

                                    <TableCell>
                                        <IconButton color="secondary" onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click event
                                            openDeleteDialog(row.id, row.name);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <Dialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            aria-labelledby="Dialog-Dialog-title"
                            aria-describedby="Dialog-Dialog-description"
                        >
                            <DialogTitle id="Dialog-Dialog-title">Xoá thuốc</DialogTitle>

                            <DialogContent>
                                <DialogContentText
                                    id="Dialog-Dialog-description"
                                    sx={{ mt: 2 }}
                                >
                                    Bạn có chắc muốn xóa thông tin? Hành động này không
                                    thể hoàn tác.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
                                <Button onClick={handleDelete}>Xóa</Button>
                            </DialogActions>
                        </Dialog>
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

MedicinesList.propTypes = {
    data: PropTypes.array,
    paginationData: PropTypes.object,
    onPaginate: PropTypes.func,
    onDelete: PropTypes.func,
};

MedicinesList.displayName = "MedicinesList";

export default MedicinesList;