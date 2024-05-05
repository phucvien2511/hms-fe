import {
    Alert,
    Button,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Suspense, memo, useState, useEffect } from "react";
import ApiCall from "../../../../apis/config";

const MedicineInfo = memo(({ data }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            id: data?.id,
            name: data?.name,
            cost: data?.cost,
            type: data?.type,
            expiryDate: data?.expiryDate,
            quantity: data?.quantity,
        });
    }, [data]);

    const handleChange = (e, key) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e?.target.value,
        }));
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
            expiryDate: e?.expiryDate.value || formData?.expiryDate,
            quantity: e?.quantity.value || formData?.quantity,
        };

        const apiCall = new ApiCall();
        const response = await apiCall.put(
            "/resources/drugs/" + formData?.id,
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
                        className="medicine-info-form"
                    >
                        <TextField
                            name="name"
                            label="Tên thuốc"
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
                            label="Loại thuốc"
                            value={formData.type}
                            onChange={(e) => handleChange(e, "type")}
                            size="small"
                            required
                        />
                        <TextField
                            name="expiryDate"
                            label="Ngày hết hạn"
                            value={formData.expiryDate}
                            onChange={(e) => handleChange(e, "expiryDate")}
                            size="small"
                            required
                        />
                        <TextField
                            name="quantity"
                            label="Số lượng"
                            value={formData.quantity}
                            onChange={(e) => handleChange(e, "quantity")}
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

MedicineInfo.propTypes = {
    data: PropTypes.object.isRequired,
};

MedicineInfo.displayName = "MedicineInfo";

export default MedicineInfo;