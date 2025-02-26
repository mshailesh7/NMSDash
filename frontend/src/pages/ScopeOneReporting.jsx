import { useNavigate } from 'react-router-dom';
import { Search, Info } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

const ScopeOneReporting = () => {
  const navigate = useNavigate();

  const emissionTypes = [
    {
      id: 1,
      name: 'Wood for Boilers',
      bgColor: 'bg-green-500',
      info: 'Emissions from wood combustion in boilers for heat generation',
    },
    {
      id: 2,
      name: 'Company Vehicle Fuel Consumption',
      bgColor: 'bg-green-500',
      info: 'Direct emissions from fuel used in company-owned vehicles',
    },
    {
      id: 3,
      // name: 'Generator Fuel',
      bgColor: 'bg-blue-500',
      info: 'Emissions from fuel used in backup power generators',
    },
    {
      id: 4,
      // name: 'Refrigerant Leakage',
      bgColor: 'bg-red-400',
      info: 'Emissions from refrigerant gases leaking from cooling systems',
    },
    {
      id: 5,
      // name: 'Process Emissions',
      bgColor: 'bg-yellow-200',
      info: 'Direct emissions from manufacturing processes and chemical reactions',
    },
    {
      id: 6,
      // name: 'Other Direct Emissions',
      bgColor: 'bg-purple-200',
      info: 'Other direct emissions not covered in the above categories',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Scope I Reporting</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Scope 1 Emission</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {emissionTypes.map((type, index) => (
              <div
                key={type.id}
                className={`${type.bgColor} rounded-lg p-6 h-40 flex items-center justify-center relative`}
              >
                {index < 2 && (
                  <Tooltip title={type.info} arrow placement="top">
                    <Info className="absolute top-2 right-2 w-5 h-5 text-gray-700 cursor-help" />
                  </Tooltip>
                )}
                <span className={`text-center font-medium ${index < 3 ? "cursor-pointer" : ""}`}>
                  {type.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/scope-one/emissions')}
              className="px-4 py-2 bg-[#00c700] text-white rounded-lg hover:bg-green-600"
            >
              View Scope I Emissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeOneReporting;
