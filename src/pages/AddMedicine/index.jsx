import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./index.css";
import ApiCall from "../../apis/config";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
    const [formData, setFormData] = useState({
        name: "",
        cost: "",
        expiryDate: "",
        quantity: "",
    });

    const handleChange = (e, key) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        const prepareBody = {
            name: e?.name.value || formData?.name,
            cost: e?.cost.value || formData?.cost,
            expiryDate: e?.expiryDate.value || formData?.expiryDate,
            quantity: e?.quantity.value || formData?.quantity,
        };

        const apiCall = new ApiCall();
        const response = await apiCall.post("/resources/drugs", prepareBody);
        if (response.success) {
            alert(`Thêm loại thuốc "${e?.name.value}" thành công`);
            setFormData({
                name: "",
                cost: "",
                expiryDate: "",
                quantity: "",
            });
            navigate("/medicines");
        }
        else {
            alert(`Thêm loại thuốc "${e?.name.value}" thất bại, vui lòng thử lại.`);
        }
    };

    const navigate = useNavigate();

    return (
        <div>
            <div className="nav" onClick={() => navigate("/medicines")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div style={{ color: "brown", fontSize: "20px" }}>
                Thêm loại thuốc
            </div>
            <form
                className="add-medicine-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e.target.elements);
                }}
            >
                <div className="form-line">
                    <TextField
                        name="name"
                        label="Tên thuốc"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleChange(e, "name")}
                    />
                    <TextField
                        name="cost"
                        label="Giá"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.cost}
                        onChange={(e) => handleChange(e, "cost")}
                    />
                </div>
                <div className="form-line">
                    <TextField
                        name="expiryDate"
                        label="Ngày hết hạn"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.expiryDate}
                        onChange={(e) => handleChange(e, "expiryDate")}
                    />
                    <TextField
                        name="quantity"
                        label="Số lượng"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.quantity}
                        onChange={(e) => handleChange(e, "quantity")}
                    />
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "brown" }}
                >
                    Thêm loại thuốc
                </Button>
            </form>
        </div>
    );
};

export default AddMedicine;