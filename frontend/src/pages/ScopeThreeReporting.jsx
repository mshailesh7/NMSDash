import { useNavigate } from 'react-router-dom';
import { Search, Info } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

const ScopeThreeReporting = () => {
  const navigate = useNavigate();

  const emissionTypes = [
    {
      id: 1,
      name: 'Third Party Transport',
      bgColor: 'bg-indigo-400',
      info: 'Emissions from third-party transportation and distribution services (tracked by GPS kilometers)',
    },
    {
      id: 2,
      name: 'Materials Purchased',
      bgColor: 'bg-pink-400',
      info: 'Emissions from production of purchased materials (calculated by weight)',
    },
    {
      id: 3,
      name: 'Export of Goods',
      bgColor: 'bg-amber-400',
      info: 'Emissions from transportation of finished products (tracked by GPS kilometers)',
    },
    {
      id: 4,
      name: 'Business Travel',
      bgColor: 'bg-emerald-400',
      info: 'Emissions from employee business travel and accommodations',
    },
    {
      id: 5,
      name: 'Employee Commuting',
      bgColor: 'bg-cyan-400',
      info: 'Emissions from employee travel between home and work',
    },
    {
      id: 6,
      name: 'Waste Disposal',
      bgColor: 'bg-rose-400',
      info: 'Emissions from disposal and treatment of waste generated in operations',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Scope III Reporting</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Scope 3 Emission</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {emissionTypes.map((type) => (
              <div
                key={type.id}
                className={`${type.bgColor} rounded-lg p-6 h-32 flex items-center justify-center relative`}
              >
                <Tooltip title={type.info} arrow placement="top">
                  <Info className="absolute top-2 right-2 w-5 h-5 text-gray-700 cursor-help" />
                </Tooltip>
                <span className="text-center font-medium cursor-pointer">
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
              onClick={() => navigate('/scope-three/emissions')}
              className="px-4 py-2 bg-[#00c700] text-white rounded-lg hover:bg-green-600"
            >
              View Scope III Emissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeThreeReporting;
