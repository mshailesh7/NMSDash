import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleEmissionForm = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('fuel');
  const [formData, setFormData] = useState({
    date: '',
    fuelType: '',
    vehicleType: '',
    purpose: '',
    units: '',
    quantity: '',
    size: '',
    weightLaden: '',
    fuel: '',
    kmsTravel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to save data
    alert('Data saved successfully!');
    setFormData({
      date: '',
      fuelType: '',
      vehicleType: '',
      purpose: '',
      units: '',
      quantity: '',
      size: '',
      weightLaden: '',
      fuel: '',
      kmsTravel: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vehicle/Equipment Fuel Use</h1>
          <button
            onClick={() => navigate('/emissions/reporting')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Method</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setMethod('fuel')}
                className={`px-4 py-2 rounded-lg ${
                  method === 'fuel' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fuel Based
              </button>
              <button
                type="button"
                onClick={() => setMethod('kms')}
                className={`px-4 py-2 rounded-lg ${
                  method === 'kms' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                KMs Based
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                required
              />
            </div>

            {method === 'fuel' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="liquid">Liquid</option>
                    <option value="solid">Solid</option>
                    <option value="gas">Gas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                  <select
                    name="units"
                    value={formData.units}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">% Weight Laden</label>
                  <input
                    type="number"
                    name="weightLaden"
                    value={formData.weightLaden}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                    required
                  />
                </div>
              </>
            )}
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

export default VehicleEmissionForm;