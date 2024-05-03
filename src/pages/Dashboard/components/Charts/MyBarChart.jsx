import { memo } from "react";
import PropTypes from "prop-types";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import "./Charts.css";

const MyBarChart = memo(({ size, label, data, name }) => {
    return (
        <div className="bar-chart-wrapper">
            {/* <MyBarChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar
                    dataKey="PatientByDep"
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
            <ResponsiveContainer height="85%">
                <BarChart
                    width={size}
                    height={size}
                    data={data}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis />
                    <Legend fontSize={14} />

                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        barSize={Math.max(16, size / data.length)}
                        name={name}

                        // innerRadius={90}
                        // outerRadius={120}
                    >
                        <LabelList
                            dataKey="value"
                            position="top"
                            fontSize={14}
                            // fill="white"
                        />
                    </Bar>
                    {/* <Tooltip /> */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

MyBarChart.propTypes = {
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    size: PropTypes.number,
    name: PropTypes.string,
};

// MyBarChart.defaultProps = {
//     size: 320,
// };
// Display name for fast refresh using memo
MyBarChart.displayName = "MyBarChart";

export default MyBarChart;
