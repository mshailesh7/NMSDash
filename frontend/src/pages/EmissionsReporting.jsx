import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Info } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

const EmissionsReporting = () => {
  const navigate = useNavigate();
  const [selectedScope, setSelectedScope] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('scope') || 'scope1';
  });

  const scopeOneEmissions = {
    combustion: [
      {
        id: 1,
        name: 'Blast Furnace Operations',
        info: 'Primary reduction of iron ore using coke in blast furnaces. Combustion of coke and supplementary fuels (e.g., natural gas, oil) is required to achieve the high temperatures needed.',
      },
      {
        id: 2,
        name: 'Direct Reduction Processes',
        info: 'Processes that use reducing gases (derived from natural gas or hydrogen) to convert iron ore to sponge iron.',
      },
      {
        id: 3,
        name: 'On-Site Vehicle/Equipment Fuel Use',
        info: 'Diesel, gasoline, or other fuels used in on-site vehicles (forklifts, yard trucks, etc.)',
      },
    ],
    process: [
      {
        id: 4,
        name: 'DEMO',
        // info: 'The decomposition of limestone (CaCO₃ → CaO + CO₂) releases CO₂ as part of the chemical process, independent of fuel combustion.',
      },
      {
        id: 5,
        name: 'DEMO',
        // info: 'Emissions from the thermal treatment (coking) of coal to produce coke, which include volatile organic compounds, tar, and CO₂.',
      },
      {
        id: 6,
        name: 'DEMO',
        // info: 'Iron ore is reduced to iron using coke. Primarily CO₂ from the reaction of carbon (coke) with iron ore, plus potential CO emissions that eventually convert to CO₂ when combusted.',
      },
      {
        id: 7,
        name: 'DEMO',
        // info: 'Oxygen blown into molten iron to reduce carbon content. CO₂ from oxidation of dissolved carbon, plus partial CO that typically gets combusted to CO₂.',
      },
      {
        id: 8,
        name: 'DEMO',
        // info: 'Mostly uses scrap steel, sometimes DRI, or pig iron. CO₂ from lime addition, electrodes consumption (carbon), and any natural gas usage for heating or burners.',
      },
    ],
  };

  const scopeTwoEmissions = [
    {
      id: 1,
      name: 'Purchased Electricity',
      info: 'Electricity is used for running motors, control systems, auxiliary equipment, and sometimes for process heating. Emission of Electricity = electricity consumed x EF (0.716 tCO2 /MWh). Note: Please use a conversion factor if the input data is in kWh to MWh',
    },
  ];

  const scopeThreeEmissions = [
    {
      id: 1,
      name: 'Raw Material Extraction and Processing',
      info: 'Emissions generated during the mining, beneficiation, and processing of raw materials (iron ore, coal, limestone, etc.) used in steel production.',
    },
    {
      id: 2,
      name: 'Scrap Metal Collection and Processing',
      info: 'Emissions associated with collecting, sorting, and pre-processing scrap metal, if recycled steel is part of the production mix.',
    },
    {
      id: 3,
      name: 'Inbound Transportation',
      info: 'Emissions from transporting raw materials from their source to the manufacturing facility using various modes of transportation (trucks, rail, ships).',
    },
    {
      id: 4,
      name: 'Capital Goods and Infrastructure',
      info: 'Emissions embedded in the manufacturing, installation, and maintenance of machinery, equipment, and plant infrastructure.',
    },
    {
      id: 5,
      name: 'Employee Commuting and Business Travel',
      info: 'Emissions related to the daily transportation of employees and travel for business purposes (e.g., site visits, meetings).',
    },
    {
      id: 6,
      name: 'Outbound Transportation',
      info: 'Emissions from the distribution and delivery of finished steel products to customers, including both domestic and international shipping.',
    },
    {
      id: 7,
      name: 'Waste Management',
      info: 'Emissions resulting from the treatment, recycling, and disposal of process wastes, by-products, and residuals generated during production.',
    },
    {
      id: 8,
      name: 'Product Use and End-of-Life',
      info: 'Emissions associated with the use phase of steel products (if applicable) and the eventual recycling or disposal at the end of their life cycle.',
    },
  ];

  const handleEmissionClick = (type, category) => {
    switch (type) {
      case 'combustion':
        if (category === 'Blast Furnace Operations') {
          navigate('/emissions/combustion/blast-furnace');
        } else if (category === 'Direct Reduction Processes') {
          navigate('/emissions/direct-reduction');
        } else if (category === 'On-Site Vehicle/Equipment Fuel Use') {
          navigate('/emissions/vehicle');
        }
        break;
      case 'process':
        if (category === 'Limestone Calcination in Blast Furnaces') {
          navigate('/emissions/limestone');
        } else if (category === 'Coke Oven Emissions') {
          navigate('/emissions/coke-oven');
        } else if (category === 'Blast Furnace (BF) Reduction') {
          navigate('/emissions/blast-furnace');
        } else if (category === 'Basic Oxygen Furnace (BOF) Decarburization') {
          navigate('/emissions/bof');
        } else if (category === 'Electric Arc Furnace (EAF) Operations') {
          navigate('/emissions/eaf');
        }
        break;
      case 'scope2':
        if (category === 'Purchased Electricity') {
          navigate('/emissions/purchased-electricity');
        }
        break;
      default:
        break;
    }
  };

  // Render grid items with conditional colors.
  // Green is used by default (for combustion), while process, scope2 and scope3 use a demo gray color.
  const renderEmissionsGrid = (emissions, title, type) => {
    let gridColor = 'bg-green-500';
    let hoverColor = 'hover:bg-green-600';
    if (type === 'process' || type === 'scope2' || type === 'scope3') {
      gridColor = 'bg-gray-500';
      hoverColor = 'hover:bg-gray-600';
    }
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emissions.map((emission) => (
            <div
              key={emission.id}
              className={`${gridColor} rounded-lg p-6 h-40 flex items-center justify-center relative cursor-pointer ${hoverColor} transition-colors`}
              onClick={() => handleEmissionClick(type, emission.name)}
            >
              <Tooltip title={emission.info || 'Demo item'} arrow placement="top">
                <Info className="absolute top-2 right-2 w-5 h-5 text-white cursor-help" />
              </Tooltip>
              <span className="text-center font-medium text-white">
                {emission.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScopeContent = () => {
    if (selectedScope === 'scope1') {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 1 Emission</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          {renderEmissionsGrid(scopeOneEmissions.combustion, 'Combustion Emissions', 'combustion')}
          {renderEmissionsGrid(scopeOneEmissions.process, 'Process Emissions', 'process')}
        </>
      );
    }
    if (selectedScope === 'scope2') {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 2 Emission</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          {renderEmissionsGrid(scopeTwoEmissions, 'Scope 2 Emissions', 'scope2')}
        </>
      );
    }
    if (selectedScope === 'scope3') {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 3 Emission</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="text-center text-gray-500 mt-4">
            {renderEmissionsGrid(scopeThreeEmissions, 'Scope 3 Emissions', 'scope3')}
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Emissions Data</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="px-4 py-2 bg-[#00c700] text-white rounded-lg hover:bg-green-600"
            >
              Monitor Emissions Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedScope('scope1')}
              className={`px-4 py-2 rounded-lg ${
                selectedScope === 'scope1'
                  ? 'bg-[#00c700] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scope 1
            </button>
            <button
              onClick={() => setSelectedScope('scope2')}
              className={`px-4 py-2 rounded-lg ${
                selectedScope === 'scope2'
                  ? 'bg-[#00c700] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scope 2
            </button>
            <button
              onClick={() => setSelectedScope('scope3')}
              className={`px-4 py-2 rounded-lg ${
                selectedScope === 'scope3'
                  ? 'bg-[#00c700] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scope 3
            </button>
          </div>

          {renderScopeContent()}
        </div>
      </div>
    </div>
  );
};

export default EmissionsReporting;
