import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BoilerDashboard = () => {
  const data = [
    { month: "JAN", woodType: "Firewood", kgs: 1757800, tCO2: 3149.9776 },
    { month: "FEB", woodType: "Firewood", kgs: 1141300, tCO2: 2045.2096 },
    { month: "MARCH", woodType: "Firewood", kgs: 1007119, tCO2: 1804.757248 },
    { month: "APRIL", woodType: "Firewood", kgs: 1260152, tCO2: 2258.192384 },
    { month: "MAY", woodType: "Firewood", kgs: 911000, tCO2: 1632.512 },
    { month: "JUNE", woodType: "Firewood", kgs: 44900, tCO2: 80.4608 },
    { month: "JULY", woodType: "Firewood", kgs: 85100, tCO2: 152.4992 },
    { month: "AUG", woodType: "Firewood", kgs: 748400, tCO2: 1341.1328 },
    { month: "SEP", woodType: "Firewood", kgs: 2733500, tCO2: 4898.432 },
    { month: "OCT", woodType: "Firewood", kgs: 3431200, tCO2: 6148.7104 },
    { month: "NOV", woodType: "Firewood", kgs: 2776400, tCO2: 4975.3088 },
    { month: "DEC", woodType: "Firewood", kgs: 2239100, tCO2: 4012.4672 }
  ];

  const totalWood = data.reduce((sum, item) => sum + item.kgs, 0);
  const totalCO2 = data.reduce((sum, item) => sum + item.tCO2, 0);
  
  const quarterlyData = [
    { quarter: "Q1 (Jan-Mar)", kgs: 3906219, tCO2: 6999.94 },
    { quarter: "Q2 (Apr-Jun)", kgs: 2216052, tCO2: 3971.17 },
    { quarter: "Q3 (Jul-Sep)", kgs: 3567000, tCO2: 6392.06 },
    { quarter: "Q4 (Oct-Dec)", kgs: 8446700, tCO2: 15136.49 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed', '#8884d8'];

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Wood Boiler Usage & CO2 Emissions Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Total Wood Used</p>
              <p className="text-xl font-bold">{formatNumber(totalWood)} kg</p>
            </div>
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Total CO₂ Emissions</p>
              <p className="text-xl font-bold">{totalCO2.toFixed(2)} tCO₂</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Highest Month</p>
              <p className="text-xl font-bold">OCT</p>
              <p className="text-sm text-gray-600">{formatNumber(3431200)} kg</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Lowest Month</p>
              <p className="text-xl font-bold">JUNE</p>
              <p className="text-sm text-gray-600">{formatNumber(44900)} kg</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quarterly Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="kgs" name="Wood (kg)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Wood Usage & CO₂ Emissions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="kgs" name="Wood (kg)" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="tCO2" name="CO₂ (tCO₂)" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Wood Usage Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={data} 
                dataKey="kgs" 
                nameKey="month" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label={({name, percent}) => `${name} (${(percent * 100).toFixed(1)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatNumber(value) + " kg"} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Seasonal Pattern Analysis</h2>
          <div className="space-y-3">
            <p className="font-medium">Key Observations:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Q4 (Oct-Dec) has the highest wood consumption at 46.6% of annual total</li>
              <li>Summer months (June-July) show minimal usage (less than 1% of annual total)</li>
              <li>October is the peak month with 18.9% of total annual consumption</li>
              <li>The emission factor is consistent at 0.001792 tCO₂/kg throughout the year</li>
              <li>Strong seasonal pattern with winter/autumn showing higher usage than summer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoilerDashboard;
