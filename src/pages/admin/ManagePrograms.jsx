import React, { useState, useEffect } from 'react';
import { HiPlus, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { programsData as initialProgramsData, membersData } from '../../data/mockData';

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', department: '', description: '', date: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load initial mock data
    setPrograms(initialProgramsData);
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({ 
          name: '', 
          department: 'Talent Development & Innovation (TDI)', 
          description: '', 
          date: '', 
          image: 'https://placehold.co/600x400/1a1a1a/FFD600?text=Logo' 
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPrograms(programs.map(p => p.id === formData.id ? formData : p));
    } else {
      setPrograms([...programs, { ...formData, id: Date.now() }]);
    }
    // Note: since this is just mock data, changes won't reflect outside this component
    // until we hook it up to global context or real backend
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Programs</h1>
          <p className="text-gray-400">Add, edit, or delete work programs (Proker).</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-astravia text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <HiPlus size={20} /> Add Program
        </button>
      </div>

      {/* Grid of Programs */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
      >
          {programs.map(program => (
              <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  key={program.id} 
                  className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col min-w-0"
              >
                  <div className="h-40 bg-white/5 relative border-b border-white/5">
                      <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 flex gap-2">
                         <button onClick={() => handleOpenModal(program)} className="p-2 bg-black/50 backdrop-blur text-white hover:text-blue-400 rounded-lg transition-colors border border-white/10">
                            <HiPencilAlt size={16} />
                         </button>
                         <button onClick={() => handleDelete(program.id)} className="p-2 bg-black/50 backdrop-blur text-white hover:text-red-400 rounded-lg transition-colors border border-white/10">
                            <HiTrash size={16} />
                         </button>
                      </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col min-w-0">
                      <div className="text-xs font-semibold text-astravia mb-2 truncate uppercase tracking-wider block">{program.department}</div>
                      <h3 className="text-lg font-bold text-white mb-1 truncate block">{program.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{program.date}</p>
                      <p className="text-gray-400 text-sm flex-1 leading-relaxed line-clamp-3 block">{program.description}</p>
                  </div>
              </motion.div>
          ))}
      </motion.div>

      {/* Basic Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh] relative">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Program' : 'Add New Program'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Program Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Department (Dept)</label>
                <select 
                  required
                  value={formData.department} 
                  onChange={e => setFormData({...formData, department: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors [&>option]:bg-[#111]"
                >
                    <option value="" disabled>Select Department</option>
                    {membersData.departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.id} - {dept.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Execution Date</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. October 2026"
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors resize-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-[#111] border-t border-white/5 py-4 mt-auto">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-astravia text-black rounded-xl font-bold hover:bg-white transition-colors"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePrograms;
