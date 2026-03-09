import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageNews from './pages/admin/ManageNews';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageGallery from './pages/admin/ManageGallery';
import ManageMembers from './pages/admin/ManageMembers';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || '/'}>
        {/* Public Routes */}
        <Route path="/" element={
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
             <Home />
           </motion.div>
        } />
        <Route path="/login" element={
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
             <Login />
           </motion.div>
        } />
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={
             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full h-full">
               <AdminLayout />
             </motion.div>
          }>
             <Route index element={<AdminDashboard />} />
             <Route path="news" element={<ManageNews />} />
             <Route path="programs" element={<ManagePrograms />} />
             <Route path="gallery" element={<ManageGallery />} />
             <Route path="members" element={<ManageMembers />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-astravia selection:text-black font-sans overflow-x-hidden">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
