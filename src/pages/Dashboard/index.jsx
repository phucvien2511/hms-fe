import { memo } from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import "./index.css";
import { NumberCard } from "../../assets/data/dashboard/NumberCard";
import MyPieChart from "./components/Charts/MyPieChart";
import MyBarChart from "./components/Charts/MyBarChart";
import {
    data1,
    data2,
    data3,
    data4,
} from "../../assets/data/dashboard/ChartData";

const Dashboard = memo(() => {
    const CHART_CONTAINER_HEIGHT = 360;
    return (
        <div className="dashboard-wrapper">
            <ul className="dashboard-stat-cards">
                {/* Test data */}
                {NumberCard.map((card, index) => (
                    <DashboardCard
                        key={index}
                        title={card.title}
                        value={card.value}
                    />
                ))}
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
                            data={data1}
                            size={CHART_CONTAINER_HEIGHT - 40}
                        />
                        <MyPieChart
                            label="Y tá"
                            data={data2}
                            size={CHART_CONTAINER_HEIGHT - 40}
                        />
                    </div>
                </div>
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
                        Số bệnh nhân đang nằm viện
                    </span>
                    <div className="dashboard-charts-item-inner">
                        <MyBarChart
                            data={data3}
                            size={CHART_CONTAINER_HEIGHT - 40}
                            name="Số bệnh nhân"
                        />
                    </div>
                </div>
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
                            data={data4}
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
