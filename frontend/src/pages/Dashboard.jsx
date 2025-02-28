import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ScopeCard from '../components/ScopeCard';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const scopeData = [
    {
      title: 'Scope I',
      description: 'Scope I emissions are direct emissions from owned or controlled sources. This includes fuel combustion on-site such as gas boilers, fleet vehicles, and air-conditioning leaks.',
      data: [
        { name: 'Emissions', value: 70 },
        { name: 'Remaining', value: 30 },
      ],
    },
    {
      title: 'Scope II',
      description: 'Scope II emissions are indirect emissions from the generation of purchased energy. This includes emissions from the consumption of purchased electricity, steam, heating, and cooling.',
      data: [
        { name: 'Emissions', value: 60 },
        { name: 'Remaining', value: 40 },
      ],
    },
    {
      title: 'Scope III',
      description: 'Scope III emissions are all indirect emissions that occur in the value chain of the reporting company, including both upstream and downstream.',
      data: [
        { name: 'Emissions', value: 80 },
        { name: 'Remaining', value: 20 },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {scopeData.map((scope, index) => (
              <ScopeCard
                key={index}
                title={scope.title}
                description={scope.description}
                data={scope.data}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-700">Manage Emission</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/emissions/reporting')}
                    className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                  >
                    Add Emissions
                  </button>
                  <button onClick={() => navigate('/analytics')} className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                    Monitor Emissions
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Manage User Access</span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                      Assign Roles
                    </button>
                    <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                      Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-sm">
              Generate full Report with AI Insight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
