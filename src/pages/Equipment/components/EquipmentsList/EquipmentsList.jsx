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

import "./EquipmentsList.css";

const EquipmentsList = memo(({ data, paginationData, onPaginate, onDelete }) => {
    const [sortOption, setSortOption] = useState({
        order: "asc",
        orderBy: "index",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState({
        id: null,
        name: null,
    });
    
    const openDeleteDialog = (equipmentId, equipmentName) => {
        setEquipmentToDelete({
            id: equipmentId,
            name: equipmentName,
        });
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        // Call your API to delete the equipment
        // Replace this with your actual API call
        const apiCall = new ApiCall();
        const response = await apiCall.delete("/resources/equipment/" + equipmentToDelete.id);
        if (response.success) {
            alert(`Xóa thiết bị: "${equipmentToDelete.name}" thành công`)
            onDelete(equipmentToDelete);
        }
        else {
            alert(`Xóa thiết bị: "${equipmentToDelete.name}" thất bại`)
        }    
        setDialogOpen(false);
        setEquipmentToDelete({
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
        <div className="Equipment-list-header">
            {data.length > 0 ? (
                <TableContainer
                    style={{
                        overflowX: "initial",
                    }}
                    className="Equipment-table"
                >
                    <Table sx={{ minWidth: 650 }} aria-label="Equipment table">
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
                                        Tên thiết bị
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
                                        active={sortOption.orderBy === 'availability'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('availability')}
                                    >
                                        Có sẵn
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortOption.orderBy === 'condition'}
                                        direction={sortOption.order}
                                        onClick={() => handleSortRequest('condition')}
                                    >
                                        Tình trạng
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        navigate(`/equipments/${row.id}`)
                                    }
                                    className="equipment-table-row"
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.cost ? row.cost.toString() : "-"}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.availability !== undefined ? row.availability.toString() : "-"}</TableCell>
                                    <TableCell>{row.condition || "-"}</TableCell>  

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
                            <DialogTitle id="Dialog-Dialog-title">Xoá thiết bị</DialogTitle>

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

EquipmentsList.propTypes = {
    data: PropTypes.array,
    paginationData: PropTypes.object,
    onPaginate: PropTypes.func,
    onDelete: PropTypes.func,
};

EquipmentsList.displayName = "EquipmentsList";

export default EquipmentsList;