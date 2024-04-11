import { memo } from "react";

const Dashboard = memo(() => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>Hi</div>
        </div>
    );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
