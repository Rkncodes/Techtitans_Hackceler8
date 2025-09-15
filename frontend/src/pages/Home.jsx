import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Utensils, 
  Package, 
  Trophy,
  ArrowRight,
  Users,
  BarChart3,
  Shield,
  Heart,
  Globe,
  Target,
  Zap,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl inline-block mb-6 shadow-xl animate-float">
            <Leaf className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back! 🌱
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg">
            You're already logged in. Let's continue your sustainable journey!
          </p>
          
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center transform hover:scale-105"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Smart Food Management</h1>
                <p className="text-sm text-emerald-600 font-medium">SRM Institute</p>
              </div>
            </div>
            
            <Link
              to="/login"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mr-4 shadow-lg animate-pulse-green">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-700">SRM Institute</h2>
                  <p className="text-emerald-600 font-semibold flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Smart Food Management
                  </p>
                </div>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Reduce Food Waste,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  {' '}Save Our Planet
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join SRM's revolutionary food waste management system. Book meals smartly, 
                track surplus food, and contribute to a sustainable future while earning rewards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-emerald-500 text-emerald-700 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-md"
                >
                  Watch Demo
                </motion.button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-6 bg-white/70 rounded-2xl border border-emerald-200 shadow-lg backdrop-blur-sm"
                >
                  <div className="text-4xl font-bold text-emerald-600 mb-2">2,847kg</div>
                  <div className="text-gray-600 font-semibold">Food Saved</div>
                  <div className="text-emerald-500 text-sm mt-1">↗️ +15% this month</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-6 bg-white/70 rounded-2xl border border-teal-200 shadow-lg backdrop-blur-sm"
                >
                  <div className="text-4xl font-bold text-teal-600 mb-2">1,240</div>
                  <div className="text-gray-600 font-semibold">Students Active</div>
                  <div className="text-teal-500 text-sm mt-1">🎯 Growing daily</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&q=80"
                  alt="Sustainable Food Management"
                  className="rounded-3xl shadow-2xl w-full"
                />
                
                {/* Floating Achievement Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-emerald-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Target className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">95%</div>
                      <div className="text-gray-600 text-sm">Waste Reduced</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-teal-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Users className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">28</div>
                      <div className="text-gray-600 text-sm">NGO Partners</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl transform rotate-3 scale-105 -z-10 opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Powerful Features for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to manage 
              food efficiently and reduce waste in your hostel community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Utensils,
                title: 'Smart Meal Booking',
                description: 'Pre-book meals to reduce food waste and ensure accurate meal planning',
                color: 'from-emerald-400 to-teal-500',
                bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100',
                borderColor: 'border-emerald-200'
              },
              {
                icon: Package,
                title: 'Surplus Food Tracking',
                description: 'Track and redistribute surplus food to NGOs and communities in need',
                color: 'from-amber-400 to-orange-500',
                bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
                borderColor: 'border-amber-200'
              },
              {
                icon: Trophy,
                title: 'Gamification & Rewards',
                description: 'Earn green credits and compete with peers for sustainable food habits',
                color: 'from-violet-400 to-purple-500',
                bgColor: 'bg-gradient-to-br from-violet-50 to-purple-100',
                borderColor: 'border-violet-200'
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Monitor waste reduction metrics and environmental impact in real-time',
                color: 'from-blue-400 to-indigo-500',
                bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
                borderColor: 'border-blue-200'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${feature.bgColor} rounded-2xl p-8 border-2 ${feature.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl text-white inline-block mb-6 shadow-md`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're making a real difference for our planet. 
              See the positive impact of our community's sustainable choices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'CO₂ Emissions Saved', value: '7.2 tons', icon: Globe, color: 'from-green-400 to-emerald-500' },
              { label: 'Water Conserved', value: '12,450L', icon: Shield, color: 'from-blue-400 to-cyan-500' },
              { label: 'Energy Saved', value: '890 kWh', icon: Zap, color: 'from-yellow-400 to-amber-500' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 text-center hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl text-white inline-block mb-6 shadow-lg`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  
                  <div className="text-5xl font-bold text-gray-800 mb-3">
                    {stat.value}
                  </div>
                  
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Food Waste Reduced', value: '2,847kg', icon: Leaf, color: 'text-emerald-600' },
                { label: 'Meals Served', value: '15,632', icon: Utensils, color: 'text-teal-600' },
                { label: 'Active Users', value: '1,240', icon: Users, color: 'text-blue-600' },
                { label: 'NGO Partners', value: '28', icon: Heart, color: 'text-rose-600' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Join thousands of students at SRM Institute who are already reducing food waste 
              and contributing to a more sustainable future. Start your journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-emerald-700 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center text-lg shadow-xl transform hover:scale-105"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Start Your Journey
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-emerald-700 transition-all duration-200 flex items-center justify-center text-lg"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mr-4 shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">Smart Food Management</h3>
                <p className="text-gray-400 text-lg">SRM Institute of Science & Technology</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Building a sustainable future, one meal at a time.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <Award className="w-8 h-8 text-emerald-400 animate-bounce" />
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              <Heart className="w-8 h-8 text-rose-400 animate-bounce" />
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2024 Smart Food Management System. Built with ❤️ for sustainability.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

