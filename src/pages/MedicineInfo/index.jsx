import { memo, useCallback, useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import MedicineInfo from "./components/MedicineInfo/MedicineInfo";
import ApiCall from "../../apis/config";

const MedicineDetails = memo(() => {
    const { id } = useParams();
    const [medicineData, setMedicineData] = useState({});

    const getMedicineData = useCallback(async () => {
        const apiCall = new ApiCall();
        const response = await apiCall.get("/resources/drugs/" + id);
        // get status
        if (response.success) {
            setMedicineData(response.data);
        }
    }, [id]);

    useEffect(() => {
        getMedicineData();
    }, [getMedicineData]);

    const navigate = useNavigate();
    return (
        <div className="medicine-info-wrapper">
            <div className="nav" onClick={() => navigate("/medicines")}>
                <span style={{ fontWeight: 600 }}>&lt;</span> Quay về danh sách
            </div>
            <div>Thông tin thuốc</div>
            <MedicineInfo data={medicineData} />
        </div>
    );
});

// Display name for fast refresh using memo
MedicineDetails.displayName = "MedicineDetails";

export default MedicineDetails;