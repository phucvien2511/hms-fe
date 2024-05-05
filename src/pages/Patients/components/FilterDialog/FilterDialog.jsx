import { memo, useState } from "react";
import PropsTypes from "prop-types";
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
import { useSearchParams } from "react-router-dom";
const FilterDialog = memo(({ open, onMaskClick, onFilter }) => {
    // const [dialogOpen, setDialogOpen] = useState(open);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterFormData, setFilterFormData] = useState({
        gender: searchParams.get("gender"),
        healthInsurance: searchParams.get("healthInsurance"),
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
                        console.log("formJson", formJson);
                        onFilter(formJson);
                        onMaskClick(false);
                    },
                }}
                //fullWidth
            >
                <DialogTitle>Lọc danh sách bệnh nhân</DialogTitle>
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
                            <InputLabel id="patient-gender-label-dialog">
                                Giới tính
                            </InputLabel>
                            <Select
                                name="gender"
                                labelId="patient-gender-label-dialog"
                                id="patient-gender"
                                value={filterFormData.gender}
                                onChange={(e) => {
                                    setFilterFormData({
                                        ...filterFormData,
                                        gender: e.target.value,
                                    });
                                }}
                                label="Giới tính"
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                            </Select>
                        </FormControl>
                        <div
                            className="clear-filter-dialog"
                            onClick={() =>
                                setFilterFormData({
                                    ...filterFormData,
                                    gender: "",
                                })
                            }
                        >
                            Bỏ chọn
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
                            <InputLabel id="patient-healthInsurance-label-dialog">
                                BHYT
                            </InputLabel>
                            <Select
                                name="healthInsurance"
                                labelId="patient-healthInsurance-label-dialog"
                                id="patient-healthInsurance"
                                defaultValue={""}
                                value={filterFormData.healthInsurance}
                                onChange={(e) => {
                                    setFilterFormData({
                                        ...filterFormData,
                                        healthInsurance: e.target.value,
                                    });
                                }}
                                label="BHYT"
                            >
                                <MenuItem value={true}>Có</MenuItem>
                                <MenuItem value={false}>Không</MenuItem>
                            </Select>
                        </FormControl>
                        <div
                            className="clear-filter-dialog"
                            onClick={() =>
                                setFilterFormData({
                                    ...filterFormData,
                                    healthInsurance: "",
                                })
                            }
                        >
                            Bỏ chọn
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: "red" }}
                        onClick={() =>
                            setFilterFormData({
                                department: "",
                                gender: "",
                                healthInsurance: "",
                            })
                        }
                    >
                        Bỏ chọn tất cả
                    </Button>
                    <Button onClick={() => onMaskClick(false)}>Đóng</Button>
                    <Button type="submit">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
FilterDialog.propTypes = {
    open: PropsTypes.bool,
    onMaskClick: PropsTypes.func,
    onFilter: PropsTypes.func,
};

// Display name for fast refresh using memo
FilterDialog.displayName = "FilterDialog";

export default FilterDialog;
