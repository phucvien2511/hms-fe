import { memo } from "react";
import PropTypes from "prop-types";
import "./DashboardCard.css";

const DashboardCard = memo(({ title, value }) => {
    return (
        <div className="dashboard-card-wrapper">
            <div className="dashboard-card__title">{title}</div>
            <div className="dashboard-card__value">{value}</div>
        </div>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
DashboardCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
};

// Display name for fast refresh using memo
DashboardCard.displayName = "DashboardCard";

export default DashboardCard;
