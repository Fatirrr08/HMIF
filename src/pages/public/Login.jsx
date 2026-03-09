import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials for simple protection before backend is ready
    if (username === 'admin' && password === 'hmif2026') {
      localStorage.setItem('hmif_admin_authenticated', 'true');
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-4 relative overflow-hidden bg-pattern-grid">
      <div className="absolute inset-0 bg-black/80 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-astravia/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 sm:p-10 relative z-10 shadow-2xl shadow-astravia/5"
      >
        <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
                <img src={`${import.meta.env.BASE_URL}logos/telkom.png`} alt="Telkom" className="h-10 w-10 object-contain" />
                <img src={`${import.meta.env.BASE_URL}logos/hmif.png`} alt="HMIF" className="h-10 w-10 object-contain" />
                <img src={`${import.meta.env.BASE_URL}logos/kabinet.png`} alt="Kabinet" className="h-10 w-10 object-contain" />
            </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Login</h2>
          <p className="text-gray-400 text-sm mt-1">Kabinet Astravia Dashboard</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-astravia/50 focus:ring-1 focus:ring-astravia/50 transition-all placeholder:text-gray-600"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-astravia/50 focus:ring-1 focus:ring-astravia/50 transition-all placeholder:text-gray-600"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-astravia to-amber-500 text-black rounded-xl px-4 py-3.5 font-bold hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(255,214,0,0.2)] mt-6 flex justify-center items-center gap-2"
          >
            Sign In
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </form>

        <div className="mt-8 text-center">
            <a href="#/" className="text-gray-500 hover:text-white text-sm transition-colors decoration-white/30 underline-offset-4 hover:underline">
                &larr; Back to Public Website
            </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
