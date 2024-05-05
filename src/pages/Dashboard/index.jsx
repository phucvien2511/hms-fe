import { memo, useEffect, useState } from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import "./index.css";
// import { NumberCard } from "../../assets/data/dashboard/NumberCard";
import MyPieChart from "./components/Charts/MyPieChart";
import MyBarChart from "./components/Charts/MyBarChart";
import ApiCall from "../../apis/config";

const Dashboard = memo(() => {
    const CHART_CONTAINER_HEIGHT = 360;
    const [cardCount, setCardCount] = useState({
        doctors: 0,
        nurses: 0,
        supStaffs: 0,
        patients: 0,
        appointments: 0,
    });
    const [doctorAbsenceData, setDoctorAbsenceData] = useState([
        {
            name: "Có mặt",
            value: 0,
            fill: "#8884d8",
        },
        {
            name: "Nghỉ phép",
            value: 0,
            fill: "#82ca9d",
        },
    ]);
    const [nurseAbsenceData, setNurseAbsenceData] = useState([
        {
            name: "Có mặt",
            value: 0,
            fill: "#8884d8",
        },
        {
            name: "Nghỉ phép",
            value: 0,
            fill: "#82ca9d",
        },
    ]);
    const [supStaffAbsenceData, setSupStaffAbsenceData] = useState([
        {
            name: "Có mặt",
            value: 0,
            fill: "#8884d8",
        },
        {
            name: "Nghỉ phép",
            value: 0,
            fill: "#82ca9d",
        },
    ]);
    const [appointmentData, setAppointmentData] = useState([]);
    const getDoctorAbsenceData = async () => {
        const apiCall = new ApiCall();

        const response = await apiCall.get("/staff/doctors?pageSize=1000");
        if (response.success) {
            const presentDoctors =
                response.data.totalRow -
                response.data.doctors.filter(
                    (doctor) => doctor.absence === false
                ).length;
            const absentDoctors = response.data.totalRow - presentDoctors;

            setCardCount((prev) => {
                return {
                    ...prev,
                    doctors: response.data.totalRow,
                };
            });
            setDoctorAbsenceData([
                {
                    name: "Có mặt",
                    value: presentDoctors,
                    fill: "#8884d8",
                },
                {
                    name: "Nghỉ phép",
                    value: absentDoctors,
                    fill: "#82ca9d",
                },
            ]);
        } else {
            console.error(response.error);
        }
    };
    const getNurseAbsenceData = async () => {
        const apiCall = new ApiCall();

        const response = await apiCall.get("/staff/nurses?pageSize=1000");
        if (response.success) {
            const presentNurses =
                response.data.totalRow -
                response.data.nurses.filter((nurse) => nurse.absence === false)
                    .length;
            const absentNurses = response.data.totalRow - presentNurses;

            setCardCount((prev) => {
                return {
                    ...prev,
                    nurses: response.data.totalRow,
                };
            });
            setNurseAbsenceData([
                {
                    name: "Có mặt",
                    value: presentNurses,
                    fill: "#8884d8",
                },
                {
                    name: "Nghỉ phép",
                    value: absentNurses,
                    fill: "#82ca9d",
                },
            ]);
        } else {
            console.error(response.error);
        }
    };
    const getSupStaffAbsenceData = async () => {
        const apiCall = new ApiCall();

        const response = await apiCall.get("/staff/supportStaff?pageSize=1000");
        if (response.success) {
            const presentSupStaffs =
                response.data.message.totalRow -
                response.data.message.supportStaff.filter(
                    (supStaff) => supStaff.absence === false
                ).length;
            const absentSupStaffs =
                response.data.message.totalRow - presentSupStaffs;

            setCardCount((prev) => {
                return {
                    ...prev,
                    supStaffs: response.data.message.totalRow,
                };
            });
            setSupStaffAbsenceData([
                {
                    name: "Có mặt",
                    value: presentSupStaffs,
                    fill: "#8884d8",
                },
                {
                    name: "Nghỉ phép",
                    value: absentSupStaffs,
                    fill: "#82ca9d",
                },
            ]);
        } else {
            console.error(response.error);
        }
    };

    const getTotalPatient = async () => {
        const apiCall = new ApiCall();

        const response = await apiCall.get("/patients");
        if (response.success) {
            const patients = response.data.totalRow;

            setCardCount((prev) => {
                return {
                    ...prev,
                    patients: patients,
                };
            });
        } else {
            console.error(response.error);
        }
    };

    const getTotalAppointment = async () => {
        const apiCall = new ApiCall();

        const response = await apiCall.get(
            "/appointments/departments/statistics"
        );
        if (response.success) {
            const appointments = response.data.departments;
            // map data to change prop name total -> value
            appointments.map((appointment) => {
                appointment.value = appointment.total;
                delete appointment.total;
            });
            setAppointmentData(appointments);

            //calculate total appointments by sum all values
            const totalAppointments = response.data.departments.reduce(
                (acc, cur) => acc + cur.value,
                0
            );

            setCardCount((prev) => {
                return {
                    ...prev,
                    appointments: totalAppointments,
                };
            });
        } else {
            console.error(response.error);
        }
    };

    useEffect(() => {
        getDoctorAbsenceData();
        getNurseAbsenceData();
        getSupStaffAbsenceData();
        getTotalPatient();
        getTotalAppointment();
    }, []);
    return (
        <div className="dashboard-wrapper">
            <ul className="dashboard-stat-cards">
                {/* Test data */}
                {/* {NumberCard.map((card, index) => (
                    <DashboardCard
                        key={index}
                        title={card.title}
                        value={card.value}
                    />
                ))} */}
                <DashboardCard
                    title="Tổng số bác sĩ"
                    value={cardCount.doctors}
                />
                <DashboardCard title="Tổng số y tá" value={cardCount.nurses} />
                <DashboardCard
                    title="Tổng số NV hỗ trợ"
                    value={cardCount.supStaffs}
                />
                <DashboardCard
                    title="Tổng số bệnh nhân"
                    value={cardCount.patients}
                />
                <DashboardCard
                    title="Tổng số lượt khám"
                    value={cardCount.appointments}
                />
            </ul>
            <div className="dashboard-charts">
                <div
                    className="dashboard-charts-item"
                    style={{ height: CHART_CONTAINER_HEIGHT }}
                >
                    <span
                        style={{
                            color: "brown",
                            fontWeight: 600,
                        }}
                    >
                        Điểm danh nhân viên ngày{" "}
                        {new Date().toLocaleDateString("en-GB")}
                    </span>
                    <div className="dashboard-charts-item-inner">
                        <MyPieChart
                            label="Bác sĩ"
                            data={doctorAbsenceData}
                            size={CHART_CONTAINER_HEIGHT - 40}
                        />
                        <MyPieChart
                            label="Y tá"
                            data={nurseAbsenceData}
                            size={CHART_CONTAINER_HEIGHT - 40}
                        />
                        <MyPieChart
                            label="Nhân viên hỗ trợ"
                            data={supStaffAbsenceData}
                            size={CHART_CONTAINER_HEIGHT - 40}
                        />
                    </div>
                </div>
                {/* <div
                    className="dashboard-charts-item"
                    style={{ height: CHART_CONTAINER_HEIGHT }}
                >
                    <span
                        style={{
                            color: "brown",
                            fontWeight: 600,
                        }}
                    >
                        Số bệnh nhân đang nằm viện
                    </span>
                    <div className="dashboard-charts-item-inner">
                        <MyBarChart
                            data={data3}
                            size={CHART_CONTAINER_HEIGHT - 40}
                            name="Số bệnh nhân"
                        />
                    </div>
                </div> */}
                <div
                    className="dashboard-charts-item"
                    style={{ height: CHART_CONTAINER_HEIGHT }}
                >
                    <span
                        style={{
                            color: "brown",
                            fontWeight: 600,
                        }}
                    >
                        Số lượt khám
                    </span>
                    <div className="dashboard-charts-item-inner">
                        <MyBarChart
                            data={appointmentData}
                            size={CHART_CONTAINER_HEIGHT - 40}
                            name="Số lượt khám hôm nay"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
