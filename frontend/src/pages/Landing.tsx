import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, GraduationCap, Users, Briefcase, MonitorCheck, Building2, Target, Award, BookOpen, UserCheck } from 'lucide-react';
import { useAuth, getDashboardRoute } from '../context/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';

// Campus Illustration Component
function CampusIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        {/* Background Elements */}
        <defs>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#3730a3" stopOpacity="0.7"/>
          </linearGradient>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        
        {/* Sky Background */}
        <rect width="800" height="300" fill="url(#skyGradient)" rx="20"/>
        
        {/* Main Campus Building */}
        <rect x="150" y="150" width="200" height="300" fill="url(#buildingGradient)" rx="10"/>
        <rect x="170" y="180" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        <rect x="220" y="180" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        <rect x="270" y="180" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        <rect x="170" y="240" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        <rect x="220" y="240" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        <rect x="270" y="240" width="30" height="40" fill="#fff" fillOpacity="0.8" rx="3"/>
        
        {/* Side Buildings */}
        <rect x="50" y="200" width="80" height="250" fill="url(#buildingGradient)" fillOpacity="0.7" rx="8"/>
        <rect x="370" y="180" width="120" height="270" fill="url(#buildingGradient)" fillOpacity="0.9" rx="8"/>
        
        {/* Trees */}
        <circle cx="600" cy="380" r="40" fill="#16a34a" fillOpacity="0.7"/>
        <rect x="590" y="380" width="20" height="60" fill="#92400e" fillOpacity="0.8" rx="10"/>
        
        <circle cx="680" cy="370" r="35" fill="#16a34a" fillOpacity="0.7"/>
        <rect x="672" y="370" width="16" height="50" fill="#92400e" fillOpacity="0.8" rx="8"/>
        
        {/* Students (Simple Figures) */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <circle cx="520" cy="400" r="15" fill="#1e40af"/>
          <rect x="510" y="415" width="20" height="35" fill="#3730a3" rx="10"/>
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -5 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <circle cx="560" cy="410" r="15" fill="#059669"/>
          <rect x="550" y="425" width="20" height="35" fill="#047857" rx="10"/>
        </motion.g>
        
        {/* Floating Elements */}
        <motion.circle
          cx="100" cy="100" r="8" fill="#1e40af" fillOpacity="0.4"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="700" cy="120" r="6" fill="#059669" fillOpacity="0.4"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx="750" cy="80" r="10" fill="#3730a3" fillOpacity="0.4"
          animate={{ y: [-3, 7, -3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

export function Landing() {
  const navigate = useNavigate();
  const { session, role } = useAuth();

  useEffect(() => {
    if (session && role) {
      navigate(getDashboardRoute(role), { replace: true });
    }
  }, [session, role, navigate]);

  const features = [
    {
      icon: GraduationCap,
      title: "Student Portal",
      description: "Discover opportunities, track applications, and build your career profile"
    },
    {
      icon: Briefcase,
      title: "Employer Access",
      description: "Post jobs, review candidates, and streamline your hiring process"
    },
    {
      icon: Users,
      title: "Mentorship Hub",
      description: "Connect mentors with students for guidance and career development"
    },
    {
      icon: MonitorCheck,
      title: "Placement Analytics",
      description: "Track placement metrics and optimize recruitment strategies"
    }
  ];

  const stats = [
    { icon: Building2, value: "500+", label: "Partner Companies" },
    { icon: UserCheck, value: "10K+", label: "Students Placed" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Target, value: "15LPA", label: "Average Package" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 animated-gradient opacity-30"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text-animated">Campus</span><br />
                <span className="gradient-text">Placement</span><br />
                <span className="gradient-text">Portal</span>
              </h1>
              <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A unified platform connecting students, employers, mentors, and placement teams 
                to accelerate career opportunities and hiring success.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/login" className="btn-modern text-lg py-4 px-8 group">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/register" className="glass-card px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300 text-center">
                Create Account
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card text-center group hover:scale-105 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
                  <stat.icon className="mx-auto mb-2 text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity" size={32} />
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="floating">
              <CampusIllustration />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Empowering Every Role
            </h2>
            <p className="text-xl opacity-70 max-w-3xl mx-auto">
              Our comprehensive platform serves students, employers, mentors, and placement teams 
              with specialized tools and insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center group hover:scale-105 transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-2xl glass-card border-2 border-blue-900/20 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <feature.icon className="text-blue-700 dark:text-blue-300" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="opacity-70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-animated">
              Ready to Transform Your Career Journey?
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Join thousands of students, mentors, and companies already using our platform 
              to create meaningful career connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/login" className="btn-modern text-lg py-4 px-8 group">
                <BookOpen className="mr-2" size={20} />
                Login to Portal
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/register" className="glass-card px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300">
                <UserCheck className="mr-2" size={20} />
                Sign Up Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
