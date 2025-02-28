import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EAFForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carbonElectrode: '',
    carbonElectrodeUnit: '',
    carbonFlux: '',
    carbonFluxUnit: '',
    carbonDRI: '',
    carbonDRIUnit: '',
    fuelCO2: '',
    fuelCO2Unit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to save data
    alert('Data saved successfully!');
    setFormData({
      carbonElectrode: '',
      carbonElectrodeUnit: '',
      carbonFlux: '',
      carbonFluxUnit: '',
      carbonDRI: '',
      carbonDRIUnit: '',
      fuelCO2: '',
      fuelCO2Unit: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Electric Arc Furnace (EAF) Operations</h1>
          <button
            onClick={() => navigate('/emissions/reporting')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbon in Electrode
                </label>
                <input
                  type="number"
                  name="carbonElectrode"
                  value={formData.carbonElectrode}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="carbonElectrodeUnit"
                  value={formData.carbonElectrodeUnit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                >
                  <option value="">Select Units</option>
                  <option value="energy-joules">Energy (Joules)</option>
                  <option value="liquid-liters">Liquid (Liters)</option>
                  <option value="mass-tonne">Mass (Tonne)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbon in Flux Calcination
                </label>
                <input
                  type="number"
                  name="carbonFlux"
                  value={formData.carbonFlux}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="carbonFluxUnit"
                  value={formData.carbonFluxUnit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbon in DRI
                </label>
                <input
                  type="number"
                  name="carbonDRI"
                  value={formData.carbonDRI}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="carbonDRIUnit"
                  value={formData.carbonDRIUnit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Combustion CO2
                </label>
                <input
                  type="number"
                  name="fuelCO2"
                  value={formData.fuelCO2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="fuelCO2Unit"
                  value={formData.fuelCO2Unit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EAFForm;
