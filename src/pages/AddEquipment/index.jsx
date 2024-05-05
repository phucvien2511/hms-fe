import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./index.css";
import ApiCall from "../../apis/config";
import { useNavigate } from "react-router-dom";

const AddEquipment = () => {
    const [formData, setFormData] = useState({
        name: "",
        cost: "",
        availability: false,
        condition: "",
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
            availability: e?.availability.value || formData?.availability,
            condition: e?.condition.value || formData?.condition,
        };

        const apiCall = new ApiCall();
        const response = await apiCall.post("/resources/equipment", prepareBody);
        if (response.success) {
            alert(`Thêm thiết bị "${e?.name.value}" thành công`);
            setFormData({
                name: "",
                cost: "",
                availability: false,
                condition: "",
            });
            navigate("/equipments");
        }
        else {
            alert(`Thêm thiết bị "${e?.name.value}" thất bại, vui lòng thử lại.`);
        }
    };

    const navigate = useNavigate();

    return (
        <div>
            <div className="nav" onClick={() => navigate("/equipments")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div style={{ color: "brown", fontSize: "20px" }}>
                Thêm thiết bị
            </div>
            <form
                className="add-equipment-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e.target.elements);
                }}
            >
                <div className="form-line">
                    <TextField
                        name="name"
                        label="Tên thiết bị"
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
                        name="availability"
                        label="Tình trạng sẵn có"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.availability}
                        onChange={(e) => handleChange(e, "availability")}
                    />
                    <TextField
                        name="condition"
                        label="Điều kiện"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        value={formData.condition}
                        onChange={(e) => handleChange(e, "condition")}
                    />
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "brown" }}
                >
                    Thêm thiết bị
                </Button>
            </form>
        </div>
    );
};

export default AddEquipment;