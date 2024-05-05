import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Dialog,
    Select,
    TextField,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { Suspense, memo, useCallback, useEffect, useState } from "react";
import "./index.css";
import ApiCall from "../../apis/config";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

//import PropsTypes from "prop-types";

const EditAppointment = memo(() => {
    const { pid, id } = useParams();
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [formData, setFormData] = useState({
        appointmentId: "",
        appointmentTime: "",
        department: "",
        doctor: "",
        roomID: "",
        result: "",
    });
    const getDoctorById = useCallback(async (id) => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/staff/doctors/" + id);
        if (response.success) {
            setFormData((prev) => ({
                ...prev,
                doctor: id,
            }));
        }
    }, []);
    const getFormData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/appointments/" + id);
        if (response.success) {
            setFormData(response.data);
            getAvailableDoctors(response.data.department);
            getDoctorById(response.data.doctorID);
        }
    }, [id, getDoctorById]);

    useEffect(() => {
        getFormData();
    }, [getFormData]);

    const getAvailableDoctors = async (department) => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/staff/doctors");
        if (response.success) {
            const filteredDoctors = response.data.doctors.filter(
                (doctor) =>
                    doctor.department === department && doctor.absence === false
            );
            setAvailableDoctors(filteredDoctors);
        }
    };
    const toBoolean = (value) => {
        if (value === "true") return true;
        else if (value === "false") return false;
        return value;
    };
    const handleChange = (e, key) => {
        console.log(e?.target.value);
        setFormData((prev) => ({
            ...prev,
            [key]: toBoolean(e?.target.value),
        }));
    };
    const [validate, setValidate] = useState({
        result: -1,
        message: "",
    });
    const handleSubmit = async (e) => {
        const prepareBody = {
            department: e?.department.value || formData?.department,
            appointmentTime:
                formData.appointmentTime ||
                dayjs().format("DD/MM/YYYY HH:mm:ss"),
            roomID: e?.roomID.value || formData?.roomID,
            result: e?.result.value || formData?.result,
            doctorID: e?.doctor.value || formData?.doctor,
            appointmentId: id,
            patientID: pid,
        };

        //check if roomID is a number
        if (isNaN(prepareBody.roomID)) {
            setValidate({
                result: 0,
                message: "Phòng khám chỉ được chứa số",
            });
            setTimeout(() => {
                setValidate({
                    result: -1,
                    message: "",
                });
            }, 5000);
            return;
        }
        const apiCall = new ApiCall();
        const response = await apiCall.put("/appointments/" + id, prepareBody);
        if (response.success) {
            alert("Chỉnh sửa bệnh án thành công");
            //return back to previous page
            navigate("/patients/" + pid);
        }
    };
    const handleDelete = async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.delete("/appointments/" + id);
        if (response.success) {
            alert("Xóa lượt khám thành công");
            //return back to previous page
            navigate("/patients/" + pid);
        }
    };
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    aria-labelledby="Dialog-Dialog-title"
                    aria-describedby="Dialog-Dialog-description"
                >
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
                        <Button onClick={() => setDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button onClick={handleDelete}>Xóa</Button>
                    </DialogActions>
                </Dialog>
                <div
                    className="nav"
                    onClick={() => navigate("/patients/" + pid)}
                >
                    <span style={{ fontWeight: 600 }}>&lt;</span> Quay lại
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "50%",
                    }}
                >
                    <div style={{ color: "brown", fontSize: "20px" }}>
                        Chỉnh sửa thông tin lượt khám
                    </div>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDialogOpen(true)}
                    >
                        Xóa lượt khám
                    </Button>
                </div>
                <form
                    className="add-patient-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e?.target.elements);
                        handleSubmit(e.target.elements);
                    }}
                >
                    <div className="form-line">
                        <FormControl
                            fullWidth
                            //sx={{ minWidth: 200 }}
                            size="small"
                            required
                        >
                            <InputLabel id="patient-department-label">
                                Khoa phụ trách
                            </InputLabel>
                            <Select
                                name="department"
                                labelId="patient-department-label"
                                id="patient-department"
                                value={formData.department}
                                onChange={(e) => {
                                    getAvailableDoctors(e.target.value);
                                    handleChange(e, "department");
                                }}
                                label="Khoa phụ trách"
                            >
                                <MenuItem value="Khoa ngoại">
                                    Khoa ngoại
                                </MenuItem>
                                <MenuItem value="Khoa nội">Khoa nội</MenuItem>
                                <MenuItem value="Khoa sản">Khoa sản</MenuItem>
                                <MenuItem value="Khoa nhi">Khoa nhi</MenuItem>
                                <MenuItem value="Khoa mắt">Khoa mắt</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            //sx={{ minWidth: 200 }}
                            size="small"
                            required
                        >
                            <InputLabel id="patient-doctor-label">
                                BS phụ trách
                            </InputLabel>
                            <Select
                                name="doctor"
                                labelId="patient-doctor-label"
                                id="patient-doctor"
                                //defaultValue={data?.department}                              value={formData.department}
                                onChange={(e) => handleChange(e, "doctor")}
                                label="BS phụ trách"
                                value={formData.doctor}
                                //value={availableDoctors[0]?.id}
                                //size="small"
                            >
                                {availableDoctors.length > 0 ? (
                                    availableDoctors.map((doctor) => (
                                        <MenuItem
                                            key={doctor.id}
                                            value={doctor.id}
                                        >
                                            {doctor.lastName +
                                                " " +
                                                doctor.firstName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value={null} disabled>
                                        --Không có BS để phân công--
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            name="roomID"
                            label="Phòng khám"
                            fullWidth
                            required
                            size="small"
                            value={formData.roomID}
                            onChange={(e) => handleChange(e, "roomID")}
                        />
                    </div>
                    <div className="form-line">
                        <TextField
                            name="result"
                            label="Chẩn đoán của BS"
                            fullWidth
                            size="small"
                            value={formData.result}
                            onChange={(e) => handleChange(e, "result")}
                        />
                    </div>
                    {validate.result === 0 && (
                        <Alert severity="error">{validate.message}</Alert>
                    )}
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ background: "brown" }}
                    >
                        Chỉnh sửa bệnh án
                    </Button>
                </form>
            </Suspense>
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
// EditAppointment.propTypes = {};

// Display name for fast refresh using memo
EditAppointment.displayName = "EditAppointment";

export default EditAppointment;
