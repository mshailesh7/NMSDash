import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  Leaf,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Lightbulb,
  Palette,
  ShieldCheck,
  Wifi
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Input', icon: Globe, path: '/input' },
    { name: 'Monitor', icon: Leaf, path: '/monitor' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Permissions', icon: Users, path: '/permissions' },
  ];

  const accessLevels = [
    { name: 'Admin', icon: Lightbulb },
    { name: 'User', icon: Palette },
    { name: 'Security', icon: ShieldCheck },
    { name: 'Manage', icon: Wifi },
  ];

  const handleExit = () => {
    // Add any cleanup logic here if needed
    navigate('/');
  };

  return (
    <div className="h-screen w-64 flex flex-col" style={{ backgroundColor: '#cdf2cd' }}>
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">CarbonZero</h1>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                  isActive 
                    ? 'bg-white text-gray-800' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2 stroke-[2.5]" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Access Levels</h2>
          <div className="space-y-3">
            {accessLevels.map((level) => (
              <div key={level.name} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00c700] flex items-center justify-center rounded-lg">
                  <level.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-sm">{level.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fixed buttons */}
      <div className="p-4 border-t border-green-200">
        <div className="space-y-1">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/50 rounded-lg"
          >
            <Settings className="h-4 w-4 mr-2 stroke-[1.5]" />
            <span>Settings</span>
          </Link>

          <button
            className="w-full flex items-center px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={handleExit}
          >
            <LogOut className="h-4 w-4 mr-2 stroke-[1.5]" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
