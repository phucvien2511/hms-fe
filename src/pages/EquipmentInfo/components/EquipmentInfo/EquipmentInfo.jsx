import {
    Alert,
    // Box,
    Button,
    Checkbox,
    // FormControl,
    // InputLabel,
    // MenuItem,
    // Select,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Suspense, memo, useState, useEffect } from "react";
import ApiCall from "../../../../apis/config";
// import { useNavigate } from "react-router-dom";

const EquipmentInfo = memo(({ data }) => {
    const [formData, setFormData] = useState({});
    // const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            id: data?.id,
            name: data?.name,
            cost: data?.cost,
            type: data?.type,
            availability: data?.availability,
            condition: data?.condition,
        });
    }, [data]);

    const handleChange = (e, key) => {
        if (key === "availability") {
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

    const [validate, setValidate] = useState({
        result: -1,
        message: "",
    });

    const handleSubmit = async (e) => {
        const prepareBody = {
            id: formData?.id,
            name: e?.name.value || formData?.name,
            cost: e?.cost.value || formData?.cost,
            type: e?.type.value || formData?.type,
            availability: e?.availability.checked || formData?.availability,
            condition: e?.condition.value || formData?.condition,
        };

        const apiCall = new ApiCall();
        const response = await apiCall.put(
            "/resources/equipment/" + formData?.id,
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
                            handleSubmit(e.target.elements);
                        }}
                        className="equipment-info-form"
                    >
                        <TextField
                            name="name"
                            label="Tên thiết bị"
                            value={formData.name}
                            onChange={(e) => handleChange(e, "name")}
                            size="small"
                            required
                        />
                        <TextField
                            name="cost"
                            label="Giá tiền"
                            value={formData.cost}
                            onChange={(e) => handleChange(e, "cost")}
                            size="small"
                            required
                        />
                        <TextField
                            name="type"
                            label="Loại thiết bị"
                            value={formData.type}
                            onChange={(e) => handleChange(e, "type")}
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
                            <div>Có sẵn</div>
                            <Checkbox
                                name="availability"
                                checked={formData.availability}
                                onChange={(e) => {
                                    handleChange(e, "availability");
                                }}
                            />
                        </div>
                        <TextField
                            name="condition"
                            label="Tình trạng"
                            value={formData.condition}
                            onChange={(e) => handleChange(e, "condition")}
                            size="small"
                            required
                        />
                        <Button type="submit" variant="contained">
                            Xác nhận
                        </Button>
                    </form>
                )}
            </Suspense>
        </div>
    );
});

EquipmentInfo.propTypes = {
    data: PropTypes.object.isRequired,
};

EquipmentInfo.displayName = "EquipmentInfo";

export default EquipmentInfo;