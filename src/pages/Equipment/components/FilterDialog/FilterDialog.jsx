import { memo, useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

const FilterDialog = memo(({ open, onMaskClick, onFilter }) => {
    const [filterFormData, setFilterFormData] = useState({
        type: "",
        availability: "",
        condition: "",
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => onMaskClick(false)}
                PaperProps={{
                    component: "form",
                    onSubmit: (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        onFilter(formJson);
                        onMaskClick(false);
                    },
                }}
            >
                <DialogTitle>Filter thiết bị</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            minHeight: 80,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <FormControl
                            sx={{
                                maxWidth: "calc(100% - 48px)",
                                width: 240,
                            }}
                            size="small"
                        >
                            <InputLabel id="equipment-type-label-dialog">
                                Loại thiết bị
                            </InputLabel>
                            <Select
                                name="type"
                                labelId="equipment-type-label-dialog"
                                id="equipment-type"
                                defaultValue={""}
                                value={filterFormData.type}
                                onChange={(e) => {
                                    setFilterFormData({
                                        ...filterFormData,
                                        type: e.target.value,
                                    });
                                }}
                                label="Type"
                            >
                                {/* Add MenuItem for each type */}
                            </Select>
                        </FormControl>
                        <div
                            className="clear-filter-dialog"
                            onClick={() =>
                                setFilterFormData({
                                    ...filterFormData,
                                    type: "",
                                })
                            }
                        >
                            Xóa
                        </div>
                    </Box>
                    <Box
                        sx={{
                            minHeight: 80,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <FormControl
                            sx={{
                                maxWidth: "calc(100% - 48px)",
                                width: 240,
                            }}
                            size="small"
                        >
                            <InputLabel id="equipment-availability-label-dialog">
                                Có sẵn
                            </InputLabel>
                            <Select
                                name="availability"
                                labelId="equipment-availability-label-dialog"
                                id="equipment-availability"
                                defaultValue={""}
                                value={filterFormData.availability}
                                onChange={(e) => {
                                    setFilterFormData({
                                        ...filterFormData,
                                        availability: e.target.value,
                                    });
                                }}
                                label="Availability"
                            >
                                <MenuItem value={true}>Available</MenuItem>
                                <MenuItem value={false}>Not Available</MenuItem>
                            </Select>
                        </FormControl>
                        <div
                            className="clear-filter-dialog"
                            onClick={() =>
                                setFilterFormData({
                                    ...filterFormData,
                                    availability: "",
                                })
                            }
                        >
                            Xóa
                        </div>
                    </Box>
                    {/* Filter by Condition */}
                    <Box
                        sx={{
                            minHeight: 80,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <FormControl
                            sx={{
                                maxWidth: "calc(100% - 48px)",
                                width: 240,
                            }}
                            size="small"
                        >
                            <InputLabel id="equipment-condition-label-dialog">
                                Tình trạng
                            </InputLabel>
                            <Select
                                name="condition"
                                labelId="equipment-condition-label-dialog"
                                id="equipment-condition"
                                defaultValue={""}
                                value={filterFormData.condition}
                                onChange={(e) => {
                                    setFilterFormData({
                                        ...filterFormData,
                                        condition: e.target.value,
                                    });
                                }}
                                label="Condition"
                            >
                                {/* Add MenuItem for each condition */}
                            </Select>
                        </FormControl>
                        <div
                            className="clear-filter-dialog"
                            onClick={() =>
                                setFilterFormData({
                                    ...filterFormData,
                                    condition: "",
                                })
                            }
                        >
                            Xóa
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: "red" }}
                        onClick={() =>
                            setFilterFormData({
                                type: "",
                                availability: "",
                                condition: "",
                            })
                        }
                    >
                        Xóa tất cả
                    </Button>
                    <Button onClick={() => onMaskClick(false)}>Đóng</Button>
                    <Button type="submit">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

FilterDialog.propTypes = {
    open: PropTypes.bool,
    onMaskClick: PropTypes.func,
    onFilter: PropTypes.func,
};

FilterDialog.displayName = "FilterDialog";

export default FilterDialog;