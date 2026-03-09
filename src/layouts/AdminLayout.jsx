import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiHome, HiNewspaper, HiBriefcase, HiLogout, HiPhotograph, HiUserGroup } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hmif_admin_authenticated');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <HiHome size={20} /> },
    { name: 'Manage News', path: '/admin/news', icon: <HiNewspaper size={20} /> },
    { name: 'Manage Programs', path: '/admin/programs', icon: <HiBriefcase size={20} /> },
    { name: 'Organization Staff', path: '/admin/members', icon: <HiUserGroup size={20} /> },
    { name: 'Activity Gallery', path: '/admin/gallery', icon: <HiPhotograph size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#111] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin" className="text-xl font-bold flex flex-col leading-none">
            <span>HMIF Admin</span>
            <span className="text-astravia text-xs font-semibold tracking-widest uppercase mt-1">Kabinet Astravia</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <HiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-astravia/10 text-astravia font-semibold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={location.pathname === item.path ? 'text-astravia' : ''}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <Link to="/" className="flex items-center justify-center w-full px-4 py-2 border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors">
            Back to Website
          </Link>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors">
            <HiLogout size={16} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#111] border-b border-white/10 flex items-center justify-between px-4 lg:hidden sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white">
              <HiMenu size={24} />
            </button>
            <span className="font-bold">HMIF Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-hidden w-full relative">
          <div className="max-w-6xl mx-auto w-full pb-20 h-full relative">
             <AnimatePresence mode="wait">
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                 transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute inset-x-0 w-full"
               >
                 <Outlet />
               </motion.div>
             </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
