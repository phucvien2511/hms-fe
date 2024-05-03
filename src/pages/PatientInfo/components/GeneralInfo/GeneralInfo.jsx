import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    //InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Suspense, memo, useState } from "react";
import ApiCall from "../../../../apis/config";

const GeneralInfo = memo(({ data }) => {
    const [patientGender, setPatientGender] = useState(data?.gender);
    const handlePatientGenderChange = (e) => {
        setPatientGender(e.target.value);
    };
    const handleSubmit = async (e) => {
        const prepareBody = {
            firstName: e.firstName.value,
            lastName: e.lastName.value,
            dateOfBirth: e.dateOfBirth.value,
            phoneNumber: e.phoneNumber.value,
            gender: e.gender.value,
            healthInsurance: e.healthInsurance.checked,
        };
        const apiCall = new ApiCall();
        const response = await apiCall.put(
            "/patients/" + data?.id,
            prepareBody
        );
        if (response.success) {
            alert("Cập nhật thông tin thành công");
        } else {
            alert("Cập nhật thông tin thất bại");
        }
    };
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {data?.firstName && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e.target.elements);
                        }}
                        className="patient-info-form"
                    >
                        <TextField
                            name="firstName"
                            label="Họ và tên đệm"
                            defaultValue={data?.firstName}
                            size="small"
                            required
                        />
                        <TextField
                            name="lastName"
                            label="Tên"
                            defaultValue={data?.lastName}
                            size="small"
                            required
                        />
                        <TextField
                            name="dateOfBirth"
                            label="Ngày sinh"
                            value={data?.dateOfBirth}
                            size="small"
                            required
                        />
                        <TextField
                            name="phoneNumber"
                            label="Số điện thoại"
                            defaultValue={data?.phoneNumber}
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
                                    defaultValue={data?.gender}
                                    value={patientGender}
                                    onChange={handlePatientGenderChange}
                                    label="Giới tính"
                                    size="small"
                                >
                                    <MenuItem value={"male"}>Nam</MenuItem>
                                    <MenuItem value={"female"}>Nữ</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
                                defaultChecked={data?.healthInsurance}
                            />
                        </div>

                        {/* <Select
                            labelId="patient-gender-select"
                            id="patient-gender"
                            value={data?.gender}
                            label="Giới tính"
                            size="small"
                        >
                            <MenuItem value={"male"}>Nam</MenuItem>
                            <MenuItem value={"female"}>Nữ</MenuItem>
                        </Select> */}
                        {/* <TextField
                            label="Có BHYT hay không"
                            value={data?.healthInsurance}
                            size="small"
                            required
                        /> */}
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
