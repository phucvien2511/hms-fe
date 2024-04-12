import { memo } from "react";
import PropTypes from "prop-types";
import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./Charts.css";

const MyPieChart = memo(({ size, label, data }) => {
    const renderLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        value,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {value}
            </text>
        );
    };
    return (
        <div className="pie-chart-wrapper">
            {/* <MyBarChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar
                    dataKey="attendance"
                    fill="#8884d8"
                    name="Có mặt"
                    barSize={24}
                />
                <Bar
                    dataKey="absence"
                    fill="#82ca9d"
                    name="Nghỉ phép"
                    barSize={24}
                />
            </MyBarChart> */}
            <div style={{ fontWeight: 600 }}>{label}</div>
            <ResponsiveContainer height="75%">
                <PieChart
                    width={size}
                    height={size}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        labelLine={false}
                        label={renderLabel}
                        // innerRadius={90}
                        // outerRadius={120}
                    />
                    <Legend />
                    {/* <Tooltip /> */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
});

MyPieChart.propTypes = {
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    size: PropTypes.number,
};

// MyPieChart.defaultProps = {
//     size: 320,
// };
// Display name for fast refresh using memo
MyPieChart.displayName = "MyPieChart";

export default MyPieChart;
