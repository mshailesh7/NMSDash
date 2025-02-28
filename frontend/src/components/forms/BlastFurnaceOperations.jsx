import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BlastFurnaceOperations = () => {
  const navigate = useNavigate();
  const initialFormState = {
    date: new Date().toISOString().split('T')[0],
    fuelType: '',
    fuelSubType: '',
    unit: '',
    quantity: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Helper function to format date as DD/MM/YYYY
  const formatDate = (dateStr) => {
    const parts = dateStr.split('-'); // parts: [YYYY, MM, DD]
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/emissions/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'Saif',
          scope: 'Scope-1',
          activitytype: 'Blast Furnace Operations',
          date: formatDate(formData.date), // using formatted date
          fuelType: formData.fuelType,
          fuelSubType: formData.fuelSubType,
          unit: formData.unit,
          quantity: Number(formData.quantity)
        })
      });
      if (response.ok) {
        toast.success('Data saved successfully!');
        setFormData(initialFormState); // Reset form fields after success
        // Optionally navigate:
        // navigate('/emissions/combustion/blast-furnace');
      } else {
        toast.error('Failed to save data');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blast Furnace Operations</h1>
          <button
            onClick={() => navigate('/emissions/reporting')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  lang='en-GB'
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => {
                    const dateInput = document.querySelector('input[type="date"][name="date"]');
                    if (dateInput) {
                      dateInput.showPicker();
                    }
                  }}
                >
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
                <option value="gas">Gas</option>
              </select>
            </div>

            {/* Fuel Sub-Type (dependent on Fuel Type selection) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Sub-Type
              </label>
              {formData.fuelType === 'liquid' ? (
                <select
                  name="fuelSubType"
                  value={formData.fuelSubType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                >
                  <option value="">Select Fuel Sub-Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                </select>
              ) : formData.fuelType === 'solid' ? (
                <select
                  name="fuelSubType"
                  value={formData.fuelSubType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  required
                >
                  <option value="">Select Fuel Sub-Type</option>
                  <option value="Coal">Coal</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="fuelSubType"
                  value={formData.fuelSubType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                  placeholder="Enter fuel sub-type"
                  required
                />
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                required
              >
                <option value="">Select Unit</option>
                <option value="energy-joules">Energy (Joules)</option>
                <option value="mass-tonne">Mass (Tonne)</option>
                <option value="liquid-liters">Liquid (Liters)</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-black"
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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

export default BlastFurnaceOperations;
