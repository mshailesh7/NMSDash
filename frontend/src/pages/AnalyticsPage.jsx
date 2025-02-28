import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoilerDashboard from '../components/BoilerDashboard';
import VehicleCo2Dashboard from '../components/VehicleCo2Dashboard';
import EmissionsDashboard from '../components/EmissionsDashboard';
import GeneratorFuelDashboard from '../components/GeneratorFuelDashboard';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [activeDashboard, setActiveDashboard] = useState('boiler');

  const renderDashboard = () => {
    switch(activeDashboard) {
      case 'boiler':
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <BoilerDashboard />
          </div>
        );
      case 'vehicle':
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <VehicleCo2Dashboard />
          </div>
        );
      case 'emissions':
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <EmissionsDashboard />
          </div>
        );
      case 'generator':
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <GeneratorFuelDashboard />
          </div>
        );
      default:
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <BoilerDashboard />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Navbar with back button on the left */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center px-4 py-2 rounded bg-gray-200 hover:border-2"
        >
          <span className="mr-2">←</span> Back
        </button>
        <div className="flex space-x-4 ml-auto">
        <button
  onClick={() => setActiveDashboard('boiler')}
  className={`px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105 ${
    activeDashboard === 'boiler'
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      : 'bg-green-50 text-green-600 hover:bg-green-100'
  }`}
>
  Boiler
</button>
<button
  onClick={() => setActiveDashboard('vehicle')}
  className={`px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105 ${
    activeDashboard === 'vehicle'
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      : 'bg-green-50 text-green-600 hover:bg-green-100'
  }`}
>
  Vehicle CO₂
</button>
<button
  onClick={() => setActiveDashboard('emissions')}
  className={`px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105 ${
    activeDashboard === 'emissions'
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      : 'bg-green-50 text-green-600 hover:bg-green-100'
  }`}
>
  Emissions
</button>
<button
  onClick={() => setActiveDashboard('generator')}
  className={`px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105 ${
    activeDashboard === 'generator'
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      : 'bg-green-50 text-green-600 hover:bg-green-100'
  }`}
>
  Generator Fuel
</button>
        </div>
      </div>

      {/* Dashboard content */}
      {renderDashboard()}
    </div>
  );
};

export default AnalyticsPage;