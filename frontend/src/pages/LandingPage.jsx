import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="text-green-500">Carbon</span>Zero
          </h1>
          <p className="text-xl text-gray-600">Empowering Businesses to Achieve Net-Zero Emissions</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-[1.02] font-medium"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-500 mt-8"
        >
          <p>&copy; 2025 CarbonZero. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;
