import { memo } from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import "./index.css";
import { NumberCard } from "../../assets/data/dashboard/NumberCard";

const Dashboard = memo(() => {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-stat-cards">
                {/* Test data */}
                {NumberCard.map((card, index) => (
                    <DashboardCard
                        key={index}
                        title={card.title}
                        value={card.value}
                    />
                ))}
            </div>
        </div>
    );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
