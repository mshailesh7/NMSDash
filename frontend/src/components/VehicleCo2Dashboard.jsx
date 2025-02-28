import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area
} from 'recharts';

const VehicleCo2Dashboard = () => {
  // Monthly CO2 data
  const monthlyData = [
    { month: "JAN", tCO2: 3.93, diesel: 1.65, petrol: 2.27 },
    { month: "FEB", tCO2: 5.41, diesel: 3.56, petrol: 1.85 },
    { month: "MAR", tCO2: 3.26, diesel: 1.73, petrol: 1.52 },
    { month: "APR", tCO2: 4.01, diesel: 2.33, petrol: 1.68 },
    { month: "MAY", tCO2: 3.07, diesel: 1.35, petrol: 1.71 },
    { month: "JUN", tCO2: 3.77, diesel: 1.17, petrol: 2.60 },
    { month: "JUL", tCO2: 4.60, diesel: 2.33, petrol: 2.27 },
    { month: "AUG", tCO2: 4.14, diesel: 1.20, petrol: 2.94 },
    { month: "SEP", tCO2: 4.97, diesel: 2.63, petrol: 2.34 },
    { month: "OCT", tCO2: 4.05, diesel: 1.93, petrol: 2.12 },
    { month: "NOV", tCO2: 4.85, diesel: 2.88, petrol: 1.97 },
    { month: "DEC", tCO2: 5.58, diesel: 3.73, petrol: 1.85 }
  ];

  // Quarterly CO2 data
  const quarterlyData = [
    { name: "Q1 (Jan-Mar)", value: 12.60 },
    { name: "Q2 (Apr-Jun)", value: 10.84 },
    { name: "Q3 (Jul-Sep)", value: 13.71 },
    { name: "Q4 (Oct-Dec)", value: 14.48 }
  ];

  // Fuel type breakdown
  const fuelData = [
    { name: "Diesel", value: 26.48, color: "#0088FE" },
    { name: "Petrol", value: 25.14, color: "#FF8042" }
  ];

  // Model CO2 data
  const modelData = [
    { model: "M.PICK UP", tCO2: 10.22, percentage: 19.8 },
    { model: "INNOVA", tCO2: 6.65, percentage: 12.9 },
    { model: "INNOVA CRY", tCO2: 5.40, percentage: 10.5 },
    { model: "ECO", tCO2: 5.16, percentage: 10.0 },
    { model: "BALENO", tCO2: 4.89, percentage: 9.5 },
    { model: "I20", tCO2: 3.61, percentage: 7.0 },
    { model: "INN HIBRIDE", tCO2: 3.33, percentage: 6.4 },
    { model: "JUPITER", tCO2: 3.25, percentage: 6.3 },
    { model: "TT", tCO2: 2.91, percentage: 5.6 },
    { model: "OMNI", tCO2: 2.76, percentage: 5.3 },
    { model: "BADA DOSTH", tCO2: 2.64, percentage: 5.1 },
    { model: "INTRA", tCO2: 1.53, percentage: 3.0 },
    { model: "PASSION", tCO2: 0.13, percentage: 0.2 }
  ];

  // Calculate the monthly fuel type percentages
  const monthlyFuelPercentage = monthlyData.map(month => {
    const total = month.diesel + month.petrol;
    return {
      month: month.month,
      diesel: ((month.diesel / total) * 100).toFixed(1),
      petrol: ((month.petrol / total) * 100).toFixed(1)
    };
  });

  // Sort models by CO2 emissions for visualization
  const sortedModelData = [...modelData].sort((a, b) => b.tCO2 - a.tCO2).slice(0, 8);

  // Calculate YTD emission trends (cumulative)
  const cumulativeData = [];
  let dieselTotal = 0;
  let petrolTotal = 0;
  
  monthlyData.forEach(month => {
    dieselTotal += month.diesel;
    petrolTotal += month.petrol;
    cumulativeData.push({
      month: month.month,
      diesel: dieselTotal,
      petrol: petrolTotal,
      total: dieselTotal + petrolTotal
    });
  });

  return (
    <div className="p-4 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vehicle CO2 Emissions Dashboard</h1>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg text-gray-500">Total Annual CO2</h3>
              <p className="text-3xl font-bold">51.62 tCO2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg text-gray-500">Monthly Average</h3>
              <p className="text-3xl font-bold">4.30 tCO2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg text-gray-500">Highest Month</h3>
              <p className="text-3xl font-bold">DEC (5.58)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg text-gray-500">Lowest Month</h3>
              <p className="text-3xl font-bold">MAY (3.07)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Monthly Emissions Trend */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Emissions Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="diesel" stackId="a" name="Diesel" fill="#0088FE" />
              <Bar dataKey="petrol" stackId="a" name="Petrol" fill="#FF8042" />
              <Line type="monotone" dataKey="tCO2" name="Total CO2" stroke="#8884d8" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Quarterly Emissions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quarterly Emissions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="CO2 Emissions" fill="#8884d8">
                {quarterlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? '#ff0000' : '#8884d8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Fuel Type Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Fuel Type Breakdown</h2>
          <div className="grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fuelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {fuelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Diesel</h3>
                <p className="text-2xl font-bold text-blue-600">26.48 tCO2</p>
                <p className="text-gray-500">51.3% of total emissions</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Petrol</h3>
                <p className="text-2xl font-bold text-orange-500">25.14 tCO2</p>
                <p className="text-gray-500">48.7% of total emissions</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monthly Fuel Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Fuel Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyFuelPercentage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="month" type="category" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="diesel" name="Diesel %" stackId="a" fill="#0088FE" />
              <Bar dataKey="petrol" name="Petrol %" stackId="a" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Vehicle Models */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Top Vehicle Models by CO2 Emissions</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={sortedModelData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="model" />
            <Tooltip formatter={(value) => `${value} tCO2`} />
            <Legend />
            <Bar 
              dataKey="tCO2" 
              name="CO2 Emissions (tCO2)" 
              fill="#8884d8"
              label={{ position: 'right', formatter: (value) => `${value} tCO2` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* YTD Cumulative Emissions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">YTD Cumulative Emissions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="diesel" name="Diesel" stroke="#0088FE" strokeWidth={2} />
              <Line type="monotone" dataKey="petrol" name="Petrol" stroke="#FF8042" strokeWidth={2} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model Percentage Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Vehicle Model % Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modelData.filter(model => model.percentage > 5)}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="model"
                label={({ model, percentage }) => `${model}: ${percentage}%`}
              >
                {modelData.filter(model => model.percentage > 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 30}, 70%, 60%)`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary & Insights */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Emissions Insights</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Quarterly Trends</h3>
            <p className="text-gray-700">Q4 has the highest emissions (14.48 tCO2), followed by Q3 (13.71 tCO2). The winter months show increased emissions.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Model Impact</h3>
            <p className="text-gray-700">M.PICK UP contributes 19.8% of all emissions. The top 3 models account for 43.2% of total vehicle emissions.</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Fuel Distribution</h3>
            <p className="text-gray-700">Diesel and petrol contribute almost equally to total emissions, with diesel slightly higher at 51.3%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCo2Dashboard;