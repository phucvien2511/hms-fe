import { memo, useCallback, useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentInfo from "./components/EquipmentInfo/EquipmentInfo";
import ApiCall from "../../apis/config";

const EquipmentDetails = memo(() => {
    const { id } = useParams();
    const [equipmentData, setEquipmentData] = useState({});

    const getEquipmentData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/resources/equipment/" + id);
        // get status
        if (response.success) {
            setEquipmentData(response.data);
        }
    }, [id]);

    useEffect(() => {
        getEquipmentData();
    }, [getEquipmentData]);

    const navigate = useNavigate();
    return (
        <div className="equipment-info-wrapper">
            <div className="nav" onClick={() => navigate("/equipments")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div>Thông tin thiết bị</div>
            <EquipmentInfo data={equipmentData} />
        </div>
    );
});

// Display name for fast refresh using memo
EquipmentDetails.displayName = "EquipmentDetails";

export default EquipmentDetails;