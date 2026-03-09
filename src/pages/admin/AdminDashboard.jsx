import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiUserGroup, HiNewspaper, HiBriefcase } from 'react-icons/hi';
import { newsData as mockNewsData, programsData as mockProgramsData, membersData as mockMembersData } from '../../data/mockData';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white`}>
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    newsCount: 0,
    programsCount: 0,
    totalMembers: 0
  });

  useEffect(() => {
    // Calculate total members
    let total = mockMembersData.executiveBoard.length;
    mockMembersData.departments.forEach(dept => {
        total += 1; // Head
        total += dept.staff.length; // Staff
    });

    setStats({
      newsCount: mockNewsData.length,
      programsCount: mockProgramsData.length,
      totalMembers: total
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to the HMIF Administration Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Published News" 
          value={stats.newsCount} 
          icon={<HiNewspaper size={28} className="text-blue-400" />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Active Work Programs" 
          value={stats.programsCount} 
          icon={<HiBriefcase size={28} className="text-orange-400" />} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Total Organization Members" 
          value={stats.totalMembers} 
          icon={<HiUserGroup size={28} className="text-astravia" />} 
          color="bg-astravia"
        />
      </div>

      <div className="mt-12 bg-[#111] border border-white/5 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Getting Started</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
              Use the sidebar navigation to manage different aspects of the website. 
              Currently, you can manage the Latest News announcements and the active Work Programs (Proker) that will be displayed on the public landing page.
          </p>
          <div className="flex gap-4">
              <a href="#/admin/news" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">Go to News</a>
              <a href="#/admin/programs" className="px-6 py-2 bg-astravia/10 hover:bg-astravia/20 text-astravia border border-astravia/20 rounded-xl transition-colors">Go to Programs</a>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
