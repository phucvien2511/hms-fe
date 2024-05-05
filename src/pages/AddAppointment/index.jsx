import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Suspense, memo, useState } from "react";
import "./index.css";
import ApiCall from "../../apis/config";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

//import PropsTypes from "prop-types";

const AddAppointment = memo(() => {
    const { id } = useParams();
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [formData, setFormData] = useState({
        department: "",
        doctor: "",
    });
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
            //department: e?.department.value || formData?.department,
            appointmentTime: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            roomID: e?.roomID.value,
            result: e?.result.value,
            doctorID: e?.doctor.value || formData?.doctor,
            patientID: id,
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
        const response = await apiCall.post("/appointments", prepareBody);
        if (response.success) {
            alert("Thêm vào bệnh án thành công");
            navigate("/patients/" + id);
        }
    };
    const navigate = useNavigate();
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <div
                    className="nav"
                    onClick={() => navigate("/patients/" + id)}
                >
                    <span style={{ fontWeight: 600 }}>&lt;</span> Quay lại
                </div>
                <div style={{ color: "brown", fontSize: "20px" }}>
                    Thêm lượt khám
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
                            value={formData.doctor}
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
                        />
                    </div>
                    <div className="form-line">
                        <TextField
                            name="result"
                            label="Chẩn đoán của BS"
                            fullWidth
                            size="small"
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
                        Thêm vào bệnh án
                    </Button>
                </form>
            </Suspense>
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
// AddAppointment.propTypes = {};

// Display name for fast refresh using memo
AddAppointment.displayName = "AddAppointment";

export default AddAppointment;
