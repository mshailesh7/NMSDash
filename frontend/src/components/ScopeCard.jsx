import { PieChart, Pie, Cell } from 'recharts';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScopeCard = ({ title, description, data }) => {
  const navigate = useNavigate();
  // Updated colors to match the design
  const COLORS = ['#2A3541', '#4B5563', '#D1D5DB'];
  
  // Sample data with three segments matching the design
  const pieData = [
    { name: 'Segment 1', value: 45 },
    { name: 'Segment 2', value: 35 },
    { name: 'Segment 3', value: 10 },
  ];

  const handleAddClick = () => {
    switch (title) {
      case 'Scope I':
        navigate('/scope-one/reporting');
        break;
      case 'Scope II':
        navigate('/scope-two/reporting');
        break;
      case 'Scope III':
        navigate('/scope-three/reporting');
        break;
      default:
        break;
    }
  };

  const handleMonitorClick = () => {
    switch (title) {
      case 'Scope I':
        navigate('/scope-one/emissions');
        break;
      case 'Scope II':
        navigate('/scope-two/emissions');
        break;
      case 'Scope III':
        navigate('/scope-three/emissions');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <div className="flex gap-2">
            <button 
              className="px-4 py-1.5 text-sm bg-white text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors"
              onClick={handleAddClick}
            >
              + Add
            </button>
            <button 
              className="px-4 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              onClick={handleMonitorClick}
            >
              Monitor
            </button>
          </div>
        </div>

        <div className="flex items-start gap-10">
          <div className="w-32 h-32 flex-shrink-0 relative">
            <PieChart width={128} height={128}>
              <Pie
                data={pieData}
                cx={64}
                cy={64}
                innerRadius={42}
                outerRadius={58}
                startAngle={0}
                endAngle={360}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-2">Overview</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-green-500 bg-white border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors group"
      >
        <span>Generate Insights</span>
        <Zap className="w-4 h-4 group-hover:animate-pulse" />
      </button>
    </div>
  );
};

export default ScopeCard;
