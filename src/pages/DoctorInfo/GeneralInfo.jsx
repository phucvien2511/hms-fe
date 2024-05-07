import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    //InputLabel,
    MenuItem,
    Select,
    //Snackbar,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";
import { Suspense, memo, useState, useEffect } from "react";
import ApiCall from "../../apis/config";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const GeneralInfo = memo(({ data }) => {
    // const [formData, setFormData] = useState({
    //     id: data?.id,
    //     firstName: data?.firstName,
    //     lastName: data?.lastName,
    //     age: data?.age,
    //     gender: data?.gender,
    //     phoneNumber: data?.phoneNumber,
    //     healthInsurance: data?.healthInsurance,
    //     department: data?.department,
    //     doctorResponsibility: data?.doctorResponsibility,
    //     dateOfBirth: data?.dateOfBirth,
    // });
    console.log('{{{{{Ơ   ', data)
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            id: data?.id,
            firstName: data?.firstName,
            lastName: data?.lastName,
            age: data?.age,
            gender: data?.gender,
            phoneNumber: data?.phoneNumber,
            healthInsurance: data?.healthInsurance,
            department: data?.department,
            doctorResponsibility: data?.doctorResponsibility,
            dateOfBirth: data?.dateOfBirth,
        });
    }, [data]);

    const handleChange = (e, key) => {
        // if (key === "healthInsurance") {
        //     setFormData((prev) => ({
        //         ...prev,
        //         [key]: e?.target.checked,
        //     }));
        // } else {
            setFormData((prev) => ({
                ...prev,
                [key]: e?.target.value,
            }));
        // }
    };
    //const [submitStatus, setSubmitStatus] = useState(false);
    const [validate, setValidate] = useState({
        result: -1,
        message: "",
    });
    const handleSubmit = async (e) => {
        const prepareBody = {
            id: formData?.id,
            firstName: e?.firstName.value || formData?.firstName,
            lastName: e?.lastName.value || formData?.lastName,
            age: formData?.age,
            gender: e?.gender.value || formData?.gender,
            phoneNumber: e?.phoneNumber.value || formData.phoneNumber,
            healthInsurance:
                e?.healthInsurance.checked || formData?.healthInsurance,
            department: e?.department.value || formData?.department,
            doctorResponsibility: formData?.doctorResponsibility,
            dateOfBirth: e?.dateOfBirth.value || formData?.dateOfBirth,
        };

        console.log("prepareBody", prepareBody);
        //check if phoneNumber contains alphabets
        if (prepareBody.phoneNumber.match(/[a-z]/i)) {
            setValidate({
                result: 0,
                message: "Số điện thoại không hợp lệ (Chỉ được chứa số)",
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
        const response = await apiCall.put(
            "/doctors/" + data?.id,
            prepareBody
        );
        if (response.success) {
            setValidate({
                result: 1,
                message: "",
            });
            setTimeout(() => {
                setValidate({
                    result: -1,
                    message: "",
                });
            }, 5000);
        }
    };
    return (
        <div>
            {/* <Snackbar open={submitStatus} autoHideDuration={6000}>
                {submitStatus
                    ? "Cập nhật thông tin thành công"
                    : "Cập nhật thông tin thất bại"}
            </Snackbar> */}
            {validate.result === 0 && (
                <Alert severity="error">{validate.message}</Alert>
            )}
            {validate.result === 1 && (
                <Alert severity="success">Cập nhật thông tin thành công</Alert>
            )}
            <Suspense fallback={<div>Loading...</div>}>
                {formData?.id && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            //console.log(e?.target.elements);
                            handleSubmit(e.target.elements);
                        }}
                        className="doctor-info-form"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Box sx={{
                            margin: '1rem 0',
                            marginLeft: '20px'
                        }}>
                            <TextField
                                name="lastName"
                                label="Họ và tên đệm"
                                value={formData.lastName}
                                onChange={(e) => handleChange(e, "lastName")}
                                size="small"
                                required
                            />
                            <TextField
                                name="firstName"
                                label="Tên"
                                value={formData.firstName}
                                onChange={(e) => handleChange(e, "firstName")}
                                size="small"
                                required
                                sx={{
                                    marginLeft: '1rem'
                                }}
                            />
                        </Box>
                        <Box sx={{ minWidth: 120, marginLeft: '20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="doctor-gender-label">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    name="gender"
                                    labelId="doctor-gender-label"
                                    id="doctor-gender"
                                    //defaultValue={data?.gender}
                                    value={formData.gender}
                                    onChange={(e) => handleChange(e, "gender")}
                                    label="Giới tính"
                                    size="small"
                                >
                                    <MenuItem value={"male"}>Nam</MenuItem>
                                    <MenuItem value={"female"}>Nữ</MenuItem>
                                </Select>

                            </FormControl>
                        </Box>
                        <TextField
                            name="dateOfBirth"
                            label="Ngày sinh"
                            value={formData.dateOfBirth}
                            size="small"
                            required
                            sx={{
                                margin: '1rem 0',
                                marginLeft: '20px'
                            }}
                        />
                        <TextField
                            name="phoneNumber"
                            label="Số điện thoại"
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange(e, "phoneNumber")}
                            size="small"
                            required
                            sx={{
                                margin: '1rem 0',
                                marginLeft: '20px'
                            }}
                        />
                        <Box sx={{ minWidth: 160, marginLeft: '20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="doctor-department-label">
                                    Khoa Trực Thuộc
                                </InputLabel>
                                <Select
                                    name="department"
                                    labelId="doctor-department-label"
                                    id="doctor-department"
                                    //defaultValue={data?.department}
                                    value={formData.department}
                                    onChange={(e) =>
                                        handleChange(e, "department")
                                    }
                                    label="Khoa Trực Thuộc"
                                    size="small"
                                >
                                    <MenuItem value="Khoa ngoại">
                                        Khoa ngoại
                                    </MenuItem>
                                    <MenuItem value="Khoa nội">
                                        Khoa nội
                                    </MenuItem>
                                    <MenuItem value="Khoa sản">
                                        Khoa sản
                                    </MenuItem>
                                    <MenuItem value="Khoa nhi">
                                        Khoa nhi
                                    </MenuItem>
                                    <MenuItem value="Khoa mắt">
                                        Khoa mắt
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/* <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid lightgrey",
                                borderRadius: "4px",
                                paddingLeft: "9px",
                                fontSize: "14px",
                                height: "41px",
                            }}
                        >
                            <div>Có BHYT?</div>
                            <Checkbox
                                name="healthInsurance"
                                checked={formData.healthInsurance}
                                onChange={(e) => {
                                    console.log(e.target.checked);
                                    handleChange(e, "healthInsurance");
                                }}
                            />
                        </div> */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '1rem',
                                marginLeft: '50%'
                            }}
                        >
                            Xác Nhận Thay Đổi
                        </Button>
                    </form>
                )}
            </Suspense>
        </div>
    );
});

GeneralInfo.propTypes = {
    data: PropTypes.object.isRequired,
};
// Display name for fast refresh using memo
GeneralInfo.displayName = "GeneralInfo";

export default GeneralInfo;