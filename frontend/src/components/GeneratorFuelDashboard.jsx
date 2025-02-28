import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area
} from 'recharts';

const GeneratorFuelDashboard = () => {
  // Data from the table
  const fuelData = [
    { month: "JAN", liters: 4486, kgsOfCO2: 13054.26, tonneCO2: 13.05426, fuelType: "DIESEL" },
    { month: "FEB", liters: 1408, kgsOfCO2: 4097.28, tonneCO2: 4.09728, fuelType: "DIESEL" },
    { month: "MARCH", liters: 1910, kgsOfCO2: 5558.1, tonneCO2: 5.5581, fuelType: "DIESEL" },
    { month: "APRIL", liters: 3135, kgsOfCO2: 9122.85, tonneCO2: 9.12285, fuelType: "DIESEL" },
    { month: "MAY", liters: 4316, kgsOfCO2: 12559.56, tonneCO2: 12.55956, fuelType: "DIESEL" },
    { month: "JUNE", liters: 678, kgsOfCO2: 1972.98, tonneCO2: 1.97298, fuelType: "DIESEL" },
    { month: "JULY", liters: 494, kgsOfCO2: 1437.54, tonneCO2: 1.43754, fuelType: "DIESEL" },
    { month: "AUG", liters: 133, kgsOfCO2: 387.03, tonneCO2: 0.38703, fuelType: "DIESEL" },
    { month: "SEP", liters: 6802, kgsOfCO2: 19793.82, tonneCO2: 19.79382, fuelType: "DIESEL" },
    { month: "OCT", liters: 1170, kgsOfCO2: 3404.7, tonneCO2: 3.4047, fuelType: "DIESEL" },
    { month: "NOV", liters: 5740, kgsOfCO2: 16703.4, tonneCO2: 16.7034, fuelType: "DIESEL" },
    { month: "DEC", liters: 3582, kgsOfCO2: 10423.62, tonneCO2: 10.42362, fuelType: "DIESEL" }
  ];

  // Calculate quarterly data
  const quarters = [
    { name: "Q1", months: ["JAN", "FEB", "MARCH"] },
    { name: "Q2", months: ["APRIL", "MAY", "JUNE"] },
    { name: "Q3", months: ["JULY", "AUG", "SEP"] },
    { name: "Q4", months: ["OCT", "NOV", "DEC"] }
  ];

  const quarterlyData = quarters.map(quarter => {
    const quarterMonths = fuelData.filter(item => quarter.months.includes(item.month));
    const liters = quarterMonths.reduce((sum, item) => sum + item.liters, 0);
    const tonneCO2 = quarterMonths.reduce((sum, item) => sum + item.tonneCO2, 0);
    
    return {
      quarter: quarter.name,
      liters,
      tonneCO2
    };
  });

  // Calculate totals and averages
  const totalLiters = fuelData.reduce((sum, item) => sum + item.liters, 0);
  const totalCO2Tonnes = fuelData.reduce((sum, item) => sum + item.tonneCO2, 0);
  const avgLitersPerMonth = (totalLiters / 12).toFixed(2);
  const avgCO2PerMonth = (totalCO2Tonnes / 12).toFixed(2);

  // Find high and low months
  const highestMonth = fuelData.reduce((max, item) => item.liters > max.liters ? item : max, fuelData[0]);
  const lowestMonth = fuelData.reduce((min, item) => item.liters < min.liters ? item : min, fuelData[0]);

  // Calculate CO2 intensity (tonnes per 1000 liters)
  const co2Intensity = (totalCO2Tonnes / totalLiters * 1000).toFixed(2);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const RED_TO_GREEN = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];

  // For monthly usage comparison - determine color based on fuel consumption
  const getBarColor = (value) => {
    const max = Math.max(...fuelData.map(d => d.liters));
    const normalizedValue = value / max;
    
    if (normalizedValue > 0.8) return '#d73027'; // High usage - red
    if (normalizedValue > 0.5) return '#fc8d59'; // Medium-high - orange
    if (normalizedValue > 0.3) return '#fee090'; // Medium - yellow
    if (normalizedValue > 0.1) return '#e0f3f8'; // Medium-low - light blue
    return '#4575b4'; // Low usage - blue
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Generator Fuel Usage Dashboard</h1>
        <p className="text-gray-600">Annual fuel consumption and emissions analysis</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">Total Diesel Used</h3>
          <p className="text-2xl font-bold">{totalLiters.toLocaleString()} Liters</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">Total CO₂ Emissions</h3>
          <p className="text-2xl font-bold">{totalCO2Tonnes.toLocaleString()} Tonnes</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">Avg. Monthly Consumption</h3>
          <p className="text-2xl font-bold">{avgLitersPerMonth} Liters</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-1">CO₂ Intensity</h3>
          <p className="text-2xl font-bold">{co2Intensity} kg/1000L</p>
        </div>
      </div>
      
      {/* Second Row - Monthly Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Fuel Consumption Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Fuel Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fuelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Liters', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} Liters`, 'Consumption']} />
              <Legend />
              <Bar dataKey="liters" name="Diesel (Liters)">
                {fuelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.liters)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* CO2 Emissions Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly CO₂ Emissions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fuelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Tonnes CO₂', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} Tonnes`, 'CO₂ Emissions']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tonneCO2" 
                name="CO₂ (Tonnes)" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Third Row - Quarterly Analysis & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quarterly Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quarterly Fuel Usage</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={quarterlyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="liters"
                label={({ quarter, liters }) => `${quarter}: ${(liters / totalLiters * 100).toFixed(1)}%`}
              >
                {quarterlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Liters`, 'Fuel Usage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* High/Low Consumption Info */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Consumption Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800">Highest Consumption</h3>
              <p className="text-red-600 text-xl font-bold">{highestMonth.month}: {highestMonth.liters.toLocaleString()} Liters</p>
              <p className="text-sm text-red-500">CO₂ Emissions: {highestMonth.tonneCO2.toFixed(2)} Tonnes</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800">Lowest Consumption</h3>
              <p className="text-green-600 text-xl font-bold">{lowestMonth.month}: {lowestMonth.liters.toLocaleString()} Liters</p>
              <p className="text-sm text-green-500">CO₂ Emissions: {lowestMonth.tonneCO2.toFixed(2)} Tonnes</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Monthly Variance Analysis</h3>
            <p className="text-sm text-gray-600">
              The generator fuel consumption shows significant monthly variation with 
              consumption peaking in September ({highestMonth.liters} liters) and
              reaching its lowest in August ({lowestMonth.liters} liters).
            </p>
            <p className="text-sm text-gray-600 mt-2">
              The facility used a total of {totalLiters.toLocaleString()} liters of diesel throughout the year,
              resulting in {totalCO2Tonnes.toLocaleString()} tonnes of CO₂ emissions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Fourth Row - Combined Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Fuel Consumption vs. CO₂ Emissions</h2>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={fuelData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" scale="band" />
            <YAxis yAxisId="left" label={{ value: 'Liters', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Tonnes CO₂', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="liters" name="Diesel (Liters)" barSize={20} fill="#413ea0" />
            <Line yAxisId="right" type="monotone" dataKey="tonneCO2" name="CO₂ (Tonnes)" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Footer with additional information */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Key Observations</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li className="mb-1">Q4 had the highest overall consumption at {quarterlyData[3].liters.toLocaleString()} liters ({(quarterlyData[3].liters / totalLiters * 100).toFixed(1)}% of annual usage)</li>
          <li className="mb-1">The emissions factor remains constant at 2.91 kg CO₂ per liter of diesel throughout the year</li>
          <li className="mb-1">The generator showed extremely low usage during summer months (June-August)</li>
          <li className="mb-1">September had an unusually high spike in consumption, {(highestMonth.liters / lowestMonth.liters).toFixed(0)}× higher than the lowest month</li>
          <li className="mb-1">Average monthly consumption was {avgLitersPerMonth} liters, with 7 months below this average</li>
        </ul>
      </div>
    </div>
  );
};

export default GeneratorFuelDashboard;
