import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MonitorPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [includeSubsidiaries, setIncludeSubsidiaries] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const periods = ['Daily', 'Monthly', 'Yearly', 'Custom'];

  const handleBack = () => {
    navigate(-1);
  };

  // Helper function to format date as DD:MM:YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // Fetch data from the API endpoint on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/emissions/all');
        if (response.ok) {
          const json = await response.json();
          console.log(json); // Inspect the response structure
          setData(json.data); // Use the data array from the API response
        } else {
          console.error('Failed to fetch emissions data');
        }
      } catch (error) {
        console.error('Error fetching emissions data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Filter the data based on search query (checking multiple fields)
  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.user || '').toLowerCase().includes(query) ||
      (item.scope || '').toLowerCase().includes(query) ||
      ((item.activityType || item.activitytype || '')).toLowerCase().includes(query) ||
      (item.fuelType || '').toLowerCase().includes(query) ||
      (item.fuelSubType || '').toLowerCase().includes(query) ||
      (item.quantity ? item.quantity.toString().toLowerCase() : '').includes(query) ||
      (item.emissionFactor ? item.emissionFactor.toString().toLowerCase() : '').includes(query) ||
      (item.totalEmission ? item.totalEmission.toString().toLowerCase() : '').includes(query) ||
      (item.date ? formatDate(item.date).toLowerCase() : '').includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="flex items-center bg-white border-2 border-green-600 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Carbon Ledger Data lake for your carbon footprint. View, edit or add needs.
        </p>

        {/* Filters Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-md ${
                  selectedPeriod === period
                    ? 'bg-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
            <button className="px-4 py-2 bg-white border-2 border-green-600 text-gray-600">
              2025
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by"
                className="pl-9 pr-4 py-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 bg-white hover:bg-gray-100 rounded-md">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Add
            </button>
          </div>
        </div>

        {/* Consolidation Options */}
        <div className="flex justify-end mb-4 space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSubsidiaries}
              onChange={(e) => setIncludeSubsidiaries(e.target.checked)}
              className="form-checkbox bg-white"
            />
            <span className="text-gray-600">Include subsidiaries</span>
          </label>
          <div className="text-gray-600">
            Select consolidation
            <select className="ml-2 bg-white border rounded px-2 py-1">
              <option>Operational control</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-gray-600">Loading...</div>
          ) : filteredData.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Scope</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Activity Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Source</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Accounting period</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Emissions (tCO2e)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Data source</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.user || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.scope || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.activityType || item.activitytype || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.fuelSubType || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.date ? formatDate(item.date) : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.totalEmission !== undefined ? item.totalEmission : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">Manual Entry</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <button className="p-1 bg-white border-2 border-gray-200 hover:bg-gray-100 rounded">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 text-center text-gray-600">No data available</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border bg-white rounded px-2 py-1"
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-gray-600">
              1-{itemsPerPage} of {filteredData.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded-md disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-md disabled:opacity-50" disabled>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;
