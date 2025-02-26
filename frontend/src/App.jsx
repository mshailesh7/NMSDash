import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ScopeOneReporting from './pages/ScopeOneReporting';
import ScopeTwoReporting from './pages/ScopeTwoReporting';
import ScopeThreeReporting from './pages/ScopeThreeReporting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scope-one/reporting" element={<ScopeOneReporting />} />
        <Route path="/scope-two/reporting" element={<ScopeTwoReporting />} />
        <Route path="/scope-three/reporting" element={<ScopeThreeReporting />} />
      </Routes>
    </Router>
  );
}

export default App;
