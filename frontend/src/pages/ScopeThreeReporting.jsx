import React, { useState } from 'react';

const ScopeThreeReporting = () => {
  // State for form data
  const [emissionType, setEmissionType] = useState('');
  const [scope, setScope] = useState('');
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  // Different form fields based on emission type
  const formFields = {
    'stationary-combustion': [
      { name: 'fuelType', label: 'Fuel Type', type: 'select', options: ['Natural Gas', 'Diesel', 'Propane', 'Coal', 'Biomass'] },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['liters', 'gallons', 'cubic meters', 'kg', 'tonnes'] },
      { name: 'location', label: 'Facility Location', type: 'text' }
    ],
    'mobile-combustion': [
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', options: ['Passenger Car', 'Light Duty Truck', 'Heavy Duty Truck', 'Aircraft', 'Ship'] },
      { name: 'fuelType', label: 'Fuel Type', type: 'select', options: ['Gasoline', 'Diesel', 'Jet Fuel', 'CNG', 'Electric'] },
      { name: 'distance', label: 'Distance Traveled', type: 'number' },
      { name: 'distanceUnit', label: 'Distance Unit', type: 'select', options: ['km', 'miles'] },
      { name: 'fuelConsumption', label: 'Fuel Consumed', type: 'number' },
      { name: 'fuelUnit', label: 'Fuel Unit', type: 'select', options: ['liters', 'gallons', 'kWh'] }
    ],
    'process-emissions': [
      { name: 'processType', label: 'Process Type', type: 'select', options: ['Cement Production', 'Chemical Process', 'Metallurgical Process', 'Agricultural Process'] },
      { name: 'gasType', label: 'Gas Type', type: 'select', options: ['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6'] },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['kg', 'tonnes'] }
    ],
    'fugitive-emissions': [
      { name: 'sourceType', label: 'Source Type', type: 'select', options: ['Refrigeration', 'Air Conditioning', 'Fire Suppression', 'Electrical Equipment'] },
      { name: 'gasType', label: 'Gas Type', type: 'select', options: ['HFCs', 'PFCs', 'SF6', 'NF3'] },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['kg', 'tonnes'] }
    ],
    'purchased-electricity': [
      { name: 'gridRegion', label: 'Grid Region', type: 'text' },
      { name: 'electricitySource', label: 'Electricity Source', type: 'select', options: ['Grid Mix', 'Renewable Energy', 'Specific Provider'] },
      { name: 'consumption', label: 'Consumption', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['kWh', 'MWh'] }
    ],
    'purchased-heat-steam': [
      { name: 'sourceType', label: 'Source Type', type: 'select', options: ['District Heating', 'Steam', 'Hot Water', 'Cooling'] },
      { name: 'consumption', label: 'Consumption', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['GJ', 'kWh', 'MWh'] }
    ],
    'business-travel': [
      { name: 'transportMode', label: 'Transport Mode', type: 'select', options: ['Air', 'Rail', 'Car', 'Bus', 'Taxi'] },
      { name: 'travelClass', label: 'Travel Class', type: 'select', options: ['Economy', 'Business', 'First', 'Not Applicable'] },
      { name: 'distance', label: 'Distance', type: 'number' },
      { name: 'distanceUnit', label: 'Distance Unit', type: 'select', options: ['km', 'miles'] },
      { name: 'numberOfPassengers', label: 'Number of Passengers', type: 'number' }
    ],
    'employee-commuting': [
      { name: 'transportMode', label: 'Transport Mode', type: 'select', options: ['Car', 'Bus', 'Rail', 'Bicycle', 'Walking', 'Motorcycle'] },
      { name: 'fuelType', label: 'Fuel Type (if applicable)', type: 'select', options: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Not Applicable'] },
      { name: 'distance', label: 'Distance (one way)', type: 'number' },
      { name: 'distanceUnit', label: 'Distance Unit', type: 'select', options: ['km', 'miles'] },
      { name: 'frequency', label: 'Frequency', type: 'select', options: ['Daily', 'Weekly', 'Monthly'] },
      { name: 'numberOfEmployees', label: 'Number of Employees', type: 'number' }
    ],
    'waste-disposal': [
      { name: 'wasteType', label: 'Waste Type', type: 'select', options: ['Landfill', 'Incineration', 'Recycling', 'Composting'] },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['kg', 'tonnes'] }
    ],
    'purchased-goods-services': [
      { name: 'category', label: 'Category', type: 'select', options: ['Raw Materials', 'Processed Materials', 'Services', 'Capital Goods'] },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'purchasedAmount', label: 'Purchased Amount', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: ['kg', 'tonnes', 'units', 'USD', 'EUR'] }
    ]
  };

  // Map emission types to scopes
  const emissionScopes = {
    'stationary-combustion': '1',
    'mobile-combustion': '1',
    'process-emissions': '1',
    'fugitive-emissions': '1',
    'purchased-electricity': '2',
    'purchased-heat-steam': '2',
    'business-travel': '3',
    'employee-commuting': '3',
    'waste-disposal': '3',
    'purchased-goods-services': '3'
  };

  // Emission type display names
  const emissionTypeNames = {
    'stationary-combustion': 'Stationary Combustion',
    'mobile-combustion': 'Mobile Combustion',
    'process-emissions': 'Process Emissions',
    'fugitive-emissions': 'Fugitive Emissions',
    'purchased-electricity': 'Purchased Electricity',
    'purchased-heat-steam': 'Purchased Heat & Steam',
    'business-travel': 'Business Travel',
    'employee-commuting': 'Employee Commuting',
    'waste-disposal': 'Waste Disposal',
    'purchased-goods-services': 'Purchased Goods & Services'
  };

  // Handle emission type change
  const handleEmissionTypeChange = (e) => {
    const type = e.target.value;
    setEmissionType(type);
    setScope(emissionScopes[type] || '');
    setFormData({});
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new entry with timestamp, emission type, scope, and form data
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      emissionType,
      emissionTypeName: emissionTypeNames[emissionType],
      scope,
      ...formData
    };
    
    setSubmittedData(prev => [...prev, newEntry]);
    
    // Reset form
    setFormData({});
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Greenhouse Gas Emissions Calculator
      </h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Input Emission Data</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Emission Source Type
            </label>
            <select 
              className="w-full p-2 border rounded bg-white"
              value={emissionType} 
              onChange={handleEmissionTypeChange}
              required
            >
              <option value="">Select Emission Source</option>
              {Object.keys(emissionTypeNames).map(type => (
                <option key={type} value={type}>
                  {emissionTypeNames[type]}
                </option>
              ))}
            </select>
          </div>
          
          {emissionType && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Scope
              </label>
              <div className="p-2 bg-gray-100 rounded">
                Scope {scope} Emissions
              </div>
            </div>
          )}
          
          {emissionType && formFields[emissionType]?.map(field => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white"
                  required
                >
                  <option value="">
                    Select {field.label}
                  </option>
                  {field.options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-white"
                  required
                />
              )}
            </div>
          ))}
          
          {emissionType && (
            <div className="mt-6">
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Data
              </button>
            </div>
          )}
        </form>
      </div>
      
      {submittedData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Submitted Emissions Data
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emission Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submittedData.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.emissionTypeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Scope {entry.scope}
                    </td>
                    <td className="px-6 py-4">
                      <ul className="list-disc pl-5">
                        {Object.keys(entry).filter(key => 
                          !['id', 'timestamp', 'emissionType', 'emissionTypeName', 'scope'].includes(key)
                        ).map(key => (
                          <li key={key} className="text-sm">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {entry[key]}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScopeThreeReporting;
