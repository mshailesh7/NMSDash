import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmissionsReporting from './pages/EmissionsReporting';
import CombustionEmissionForm from './components/forms/BlastFurnaceOperations';
import VehicleEmissionForm from './components/forms/VehicleEmissionForm';
import LimestoneCalcinationForm from './components/forms/LimestoneCalcinationForm';
import CokeOvenForm from './components/forms/CokeOvenForm';
import BlastFurnaceForm from './components/forms/BlastFurnaceForm';
import BOFForm from './components/forms/BOFForm';
import EAFForm from './components/forms/EAFForm';
import PurchasedElectricityForm from './components/forms/PurchasedElectricityForm';
import DirectReductionProcess from './components/forms/DirectReductionProcess';
import MonitorPage from './pages/MonitorPage';
import Analytics from './pages/AnalyticsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emissions/reporting" element={<EmissionsReporting />} />
        <Route path="/emissions/combustion/:type" element={<CombustionEmissionForm />} />
        <Route path="/emissions/vehicle" element={<VehicleEmissionForm />} />
        <Route path="/emissions/limestone" element={<LimestoneCalcinationForm />} />
        <Route path="/emissions/coke-oven" element={<CokeOvenForm />} />
        <Route path="/emissions/blast-furnace" element={<BlastFurnaceForm />} />
        <Route path="/emissions/bof" element={<BOFForm />} />
        <Route path="/emissions/eaf" element={<EAFForm />} />
        <Route path="/emissions/purchased-electricity" element={<PurchasedElectricityForm />} />
        <Route path="/emissions/direct-reduction" element={<DirectReductionProcess />} />
        <Route path="/monitor" element={<MonitorPage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
