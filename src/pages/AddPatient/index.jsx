import {
    Alert,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from "@mui/material";
import { Suspense, memo, useState } from "react";
import "./index.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ApiCall from "../../apis/config";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

//import PropsTypes from "prop-types";

const AddPatient = memo(() => {
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "male",
        dateOfBirth: "06/05/2024",
        phoneNumber: "",
        department: "",
        healthInsurance: true,
        doctorResponsibility: "",
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
            firstName: e?.firstName.value || formData?.firstName,
            lastName: e?.lastName.value || formData?.lastName,
            gender: e?.gender.value || formData?.gender,
            phoneNumber: e?.phoneNumber.value || formData.phoneNumber,
            healthInsurance:
                e?.healthInsurance.value || formData?.healthInsurance,
            department: e?.department.value || formData?.department,
            doctorResponsibility:
                e?.doctorResponsibility.value || formData?.doctorResponsibility,
            dateOfBirth: e?.dateOfBirth.value || formData?.dateOfBirth,
        };
        if (prepareBody.phoneNumber.match(/[a-z]/i)) {
            setValidate({
                result: 0,
                message: "Số điện thoại không hợp lệ (Chỉ được chứa số)",
            });
            return;
        }

        const apiCall = new ApiCall();
        const response = await apiCall.post("/patients", prepareBody);
        if (response.success) {
            alert("Thêm bệnh nhân thành công");
            setFormData({
                firstName: "",
                lastName: "",
                gender: "",
                dateOfBirth: "",
                phoneNumber: "",
                department: "",
                healthInsurance: null,
                doctorResponsibility: "",
            });
        }
    };
    const navigate = useNavigate();
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="nav" onClick={() => navigate("/patients")}>
                    <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh
                    sách
                </div>
                <div style={{ color: "brown", fontSize: "20px" }}>
                    Thêm bệnh nhân
                </div>
                <form
                    className="add-patient-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e?.target.elements);
                        handleSubmit(e.target.elements);
                    }}
                >
                    <div>Thông tin cá nhân</div>
                    <div className="form-line">
                        <TextField
                            name="lastName"
                            label="Họ và tên đệm"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={formData.lastName}
                            onChange={(e) => handleChange(e, "lastName")}
                        />
                        <TextField
                            name="firstName"
                            label="Tên"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={formData.firstName}
                            onChange={(e) => handleChange(e, "firstName")}
                        />
                        <RadioGroup
                            row
                            name="gender"
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: 18,
                                },
                            }}
                            value={formData.gender}
                            onChange={(e) => handleChange(e, "gender")}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Nam"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Nữ"
                            />
                        </RadioGroup>
                    </div>
                    <div className="form-line">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="dateOfBirth"
                                label="Ngày sinh"
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: "small" } }}
                                sx={{ width: "100%" }}
                                value={dayjs(
                                    formData.dateOfBirth,
                                    "DD/MM/YYYY"
                                )}
                                onChange={(e) => handleChange(e, "dateOfBirth")}
                            />
                        </LocalizationProvider>

                        <TextField
                            name="phoneNumber"
                            label="Số điện thoại"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange(e, "phoneNumber")}
                        />
                    </div>
                    <div>Thông tin khám chữa bệnh</div>
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
                        <FormControl fullWidth>
                            <RadioGroup
                                row
                                name="healthInsurance"
                                value={formData.healthInsurance}
                                onChange={(e) =>
                                    handleChange(e, "healthInsurance")
                                }
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="Khám BHYT"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="Khám dịch vụ"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="form-line">
                        <FormControl
                            fullWidth
                            //sx={{ minWidth: 200 }}
                            size="small"
                            required
                            value={formData.doctorResponsibility}
                        >
                            <InputLabel id="patient-doctor-label">
                                BS phụ trách
                            </InputLabel>
                            <Select
                                name="doctorResponsibility"
                                labelId="patient-doctor-label"
                                id="patient-doctor"
                                //defaultValue={data?.department}                              value={formData.department}
                                onChange={(e) =>
                                    handleChange(e, "doctorResponsibility")
                                }
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
                    </div>
                    {validate.result === 0 && (
                        <Alert severity="error">{validate.message}</Alert>
                    )}
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ background: "brown" }}
                    >
                        Thêm bệnh nhân
                    </Button>
                </form>
            </Suspense>
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
// AddPatient.propTypes = {};

// Display name for fast refresh using memo
AddPatient.displayName = "AddPatient";

export default AddPatient;
