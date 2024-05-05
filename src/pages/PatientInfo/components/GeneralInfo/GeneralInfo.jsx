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
import ApiCall from "../../../../apis/config";
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
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            id: data?.id,
            firstName: data?.firstName,
            lastName: data?.lastName,
            gender: data?.gender,
            phoneNumber: data?.phoneNumber,
            healthInsurance: data?.healthInsurance,
            doctorResponsibility: data?.doctorResponsibility,
            dateOfBirth: data?.dateOfBirth,
        });
    }, [data]);

    const handleChange = (e, key) => {
        if (key === "healthInsurance") {
            setFormData((prev) => ({
                ...prev,
                [key]: e?.target.checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [key]: e?.target.value,
            }));
        }
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
            gender: e?.gender.value || formData?.gender,
            phoneNumber: e?.phoneNumber.value || formData.phoneNumber,
            healthInsurance:
                e?.healthInsurance.checked || formData?.healthInsurance,
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
            "/patients/" + data?.id,
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
                        className="patient-info-form"
                    >
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
                        />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="patient-gender-label">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    name="gender"
                                    labelId="patient-gender-label"
                                    id="patient-gender"
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
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            //adapterLocale="vi"
                        >
                            <DatePicker
                                name="dateOfBirth"
                                label="Ngày sinh"
                                format="DD/MM/YYYY"
                                value={dayjs(
                                    formData.dateOfBirth,
                                    "DD/MM/YYYY"
                                )}
                                slotProps={{ textField: { size: "small" } }}
                                onChange={(value) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        dateOfBirth: value,
                                    }));
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            name="phoneNumber"
                            label="Số điện thoại"
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange(e, "phoneNumber")}
                            size="small"
                            required
                        />
                        <div
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
                        </div>
                        <Button type="submit" variant="contained">
                            Xác nhận
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
