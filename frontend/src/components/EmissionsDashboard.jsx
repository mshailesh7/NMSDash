import React, { useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    ComposedChart
} from 'recharts';

const EmissionsDashboard = () => {
    const [activeTab, setActiveTab] = useState('monthly');

    // Monthly data
    const monthlyData = [
        { month: "JAN", consumption: 382740, emissions: 274.04, intensity: 0.72 },
        { month: "FEB", consumption: 266940, emissions: 191.13, intensity: 0.72 },
        { month: "MARCH", consumption: 276480, emissions: 197.96, intensity: 0.72 },
        { month: "APRIL", consumption: 326760, emissions: 233.96, intensity: 0.72 },
        { month: "MAY", consumption: 268260, emissions: 192.07, intensity: 0.72 },
        { month: "JUNE", consumption: 67500, emissions: 48.33, intensity: 0.72 },
        { month: "JULY", consumption: 39660, emissions: 28.40, intensity: 0.72 },
        { month: "AUG", consumption: 212940, emissions: 152.47, intensity: 0.72 },
        { month: "SEP", consumption: 652080, emissions: 466.89, intensity: 0.72 },
        { month: "OCT", consumption: 827940, emissions: 592.81, intensity: 0.72 },
        { month: "NOV", consumption: 686820, emissions: 491.76, intensity: 0.72 },
        { month: "DEC", consumption: 563280, emissions: 403.31, intensity: 0.72 }
    ];

    // Quarterly data
    const quarterlyData = [
        { quarter: "Q1", consumption: 926160, emissions: 663.13, intensity: 0.72 },
        { quarter: "Q2", consumption: 662520, emissions: 474.36, intensity: 0.72 },
        { quarter: "Q3", consumption: 904680, emissions: 647.75, intensity: 0.72 },
        { quarter: "Q4", consumption: 2078040, emissions: 1487.88, intensity: 0.72 }
    ];

    // Cumulative emissions data
    const cumulativeData = [
        { month: "JAN", emissions: 274.04, cumulativeEmissions: 274.04 },
        { month: "FEB", emissions: 191.13, cumulativeEmissions: 465.17 },
        { month: "MARCH", emissions: 197.96, cumulativeEmissions: 663.13 },
        { month: "APRIL", emissions: 233.96, cumulativeEmissions: 897.09 },
        { month: "MAY", emissions: 192.07, cumulativeEmissions: 1089.16 },
        { month: "JUNE", emissions: 48.33, cumulativeEmissions: 1137.49 },
        { month: "JULY", emissions: 28.40, cumulativeEmissions: 1165.89 },
        { month: "AUG", emissions: 152.47, cumulativeEmissions: 1318.36 },
        { month: "SEP", emissions: 466.89, cumulativeEmissions: 1785.25 },
        { month: "OCT", emissions: 592.81, cumulativeEmissions: 2378.05 },
        { month: "NOV", emissions: 491.76, cumulativeEmissions: 2869.81 },
        { month: "DEC", emissions: 403.31, cumulativeEmissions: 3273.12 }
    ];

    // Source breakdown data
    const sourceData = [
        { name: "NON RENEWABLE", value: 3273.12, fill: "#FF8042" }
    ];

    // Colors
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Summary stats
    const summaryStats = {
        totalConsumption: 4571400,
        totalEmissions: 3273.12,
        avgMonthlyConsumption: 380950,
        avgMonthlyEmissions: 272.76,
        intensity: 0.72,  // kg CO2 per unit
        highestMonth: {
            name: "OCT",
            consumption: 827940,
            emissions: 592.81
        },
        lowestMonth: {
            name: "JULY",
            consumption: 39660,
            emissions: 28.40
        }
    };

    // Month-to-month changes
    const monthlyChanges = [
        { fromMonth: "JAN", toMonth: "FEB", change: -30.26 },
        { fromMonth: "FEB", toMonth: "MARCH", change: 3.57 },
        { fromMonth: "MARCH", toMonth: "APRIL", change: 18.19 },
        { fromMonth: "APRIL", toMonth: "MAY", change: -17.90 },
        { fromMonth: "MAY", toMonth: "JUNE", change: -74.84 },
        { fromMonth: "JUNE", toMonth: "JULY", change: -41.24 },
        { fromMonth: "JULY", toMonth: "AUG", change: 436.91 },
        { fromMonth: "AUG", toMonth: "SEP", change: 206.23 },
        { fromMonth: "SEP", toMonth: "OCT", change: 26.97 },
        { fromMonth: "OCT", toMonth: "NOV", change: -17.04 },
        { fromMonth: "NOV", toMonth: "DEC", change: -17.99 }
    ];

    const getChangeColor = (change) => {
        if (change > 0) return "#f44336";
        if (change < 0) return "#4caf50";
        return "#808080";
    };

    // Custom tooltip for the charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded shadow-md">
                    <p className="font-bold">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value.toLocaleString()} ${entry.unit || ''}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-gray-50 p-6 rounded-lg">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Scope 2 Emissions Dashboard</h1>
                <p className="text-gray-600">Analysis of purchased electricity emissions data</p>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Total Emissions</p>
                    <p className="text-2xl font-bold">{summaryStats.totalEmissions.toLocaleString()} tCO2</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm">Total Consumption</p>
                    <p className="text-2xl font-bold">{summaryStats.totalConsumption.toLocaleString()} units</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <p className="text-gray-500 text-sm">Emissions Intensity</p>
                    <p className="text-2xl font-bold">{summaryStats.intensity} kg CO2/unit</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                    <p className="text-gray-500 text-sm">Monthly Avg Emissions</p>
                    <p className="text-2xl font-bold">{summaryStats.avgMonthlyEmissions.toLocaleString()} tCO2</p>
                </div>
            </div>

            {/* Tabs for different views */}
            <div className="mb-6 pb-6 border-b">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('monthly')}
                        className={`py-2 px-4 font-medium ${activeTab === 'monthly'
                                ? 'bg-blue-600 text-white border-b-2 border-blue-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Monthly Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('quarterly')}
                        className={`py-2 px-4 font-medium ${activeTab === 'quarterly'
                                ? 'bg-blue-600 text-white border-b-2 border-blue-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Quarterly Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('cumulative')}
                        className={`py-2 px-4 font-medium ${activeTab === 'cumulative'
                                ? 'bg-blue-600 text-white border-b-2 border-blue-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Cumulative Emissions
                    </button>
                    <button
                        onClick={() => setActiveTab('insights')}
                        className={`py-2 px-4 font-medium ${activeTab === 'insights'
                                ? 'bg-blue-600 text-white border-b-2 border-blue-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Key Insights
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            <div className="mb-8">
                {activeTab === 'monthly' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Monthly Emissions and Consumption</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <ComposedChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis yAxisId="left" orientation="left" label={{ value: 'Consumption', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Emissions (tCO2)', angle: 90, position: 'insideRight' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="consumption" name="Consumption (units)" fill="#8884d8" />
                                    <Line yAxisId="right" type="monotone" dataKey="emissions" name="Emissions (tCO2)" stroke="#ff7300" strokeWidth={2} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <h2 className="text-xl font-bold mb-4">Month-to-Month Emissions Changes</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyChanges}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="fromMonth" tickFormatter={(value, index) => `${value} → ${monthlyChanges[index].toMonth}`} />
                                    <YAxis label={{ value: 'Change (%)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Change']} />
                                    <Bar dataKey="change" name="Change (%)" radius={[4, 4, 0, 0]}>
                                        {monthlyChanges.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getChangeColor(entry.change)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'quarterly' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quarterly Emissions Analysis</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={quarterlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="quarter" />
                                    <YAxis label={{ value: 'Emissions (tCO2)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="emissions" name="Emissions (tCO2)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-3">Quarterly Consumption</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={quarterlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="quarter" />
                                        <YAxis label={{ value: 'Consumption', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="consumption" name="Consumption (units)" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-3">Quarterly Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={quarterlyData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="emissions"
                                        >
                                            {quarterlyData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [value.toFixed(2), 'Emissions (tCO2)']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'cumulative' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Cumulative Emissions Over Time</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={cumulativeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis label={{ value: 'Cumulative Emissions (tCO2)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Area type="monotone" dataKey="cumulativeEmissions" name="Cumulative Emissions (tCO2)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                                    <Area type="monotone" dataKey="emissions" name="Monthly Emissions (tCO2)" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'insights' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Key Insights & Observations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-blue-600 mb-3">Emissions Highlights</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Highest emissions in <strong>October</strong> ({summaryStats.highestMonth.emissions.toLocaleString()} tCO2)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Lowest emissions in <strong>July</strong> ({summaryStats.lowestMonth.emissions.toLocaleString()} tCO2)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span>Q4 accounts for <strong>{(1487.88 / 3273.12 * 100).toFixed(1)}%</strong> of annual emissions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>Significant <strong>{monthlyChanges[6].change.toFixed(1)}%</strong> increase from July to August</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-purple-600 mb-3">Seasonal Patterns</h3>
                                <p className="mb-3">The data shows a clear seasonal pattern in emissions:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Higher emissions in <strong>Fall/Winter</strong> (Sep-Dec)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Lower emissions during <strong>Summer</strong> (Jun-Aug)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>Monthly average is <strong>{summaryStats.avgMonthlyEmissions.toLocaleString()}</strong> tCO2</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-green-600 mb-3">Reduction Opportunities</h3>
                                <p className="mb-2">Based on the data, consider focusing reduction efforts on:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">•</span>
                                        <span>High-consumption months (Q4) where small % reductions yield large absolute savings</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">•</span>
                                        <span>Explore renewable energy options to reduce the 100% non-renewable mix</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>Implement energy efficiency measures to decrease overall consumption</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-red-600 mb-3">Source Breakdown</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={sourceData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#FF8042"
                                            dataKey="value"
                                        >
                                            {sourceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [value.toFixed(2), 'Emissions (tCO2)']} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <p className="text-center text-gray-600 mt-2">All emissions currently from non-renewable sources</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmissionsDashboard;
