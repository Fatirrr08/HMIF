import React, { useState, useEffect } from 'react';
import { HiPlus, HiPencilAlt, HiTrash, HiUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { membersData as initialMembersData } from '../../data/mockData';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [activeGroup, setActiveGroup] = useState('executiveBoard'); // 'executiveBoard' or dept id
  const [showModal, setShowModal] = useState(false);
  const [useUrl, setUseUrl] = useState(true);
  const [formData, setFormData] = useState({ name: '', position: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadMembersData(activeGroup);
  }, [activeGroup]);

  const loadMembersData = (group) => {
      if (group === 'executiveBoard') {
          setMembers(initialMembersData.executiveBoard);
      } else {
          const dept = initialMembersData.departments.find(d => d.id === group);
          if (dept) {
              setMembers([{...dept.head, isHead: true}, ...dept.staff]);
          } else {
              setMembers([]);
          }
      }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({ 
          name: '', 
          position: activeGroup === 'executiveBoard' ? 'Secretary' : 'Staff', 
          image: 'https://placehold.co/400x400/1a1a1a/FFD600?text=Staff+Photo' 
      });
      setIsEditing(false);
    }
    setUseUrl(true); // Reset to URL by default
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMembers(members.map(m => m.name === formData.name ? formData : m)); // Using name as temp ID
    } else {
      setMembers([...members, formData]);
    }
    setShowModal(false);
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      setMembers(members.filter(m => m.name !== name));
    }
  };

  const groupOptions = [
      { id: 'executiveBoard', title: 'Executive Board' },
      ...initialMembersData.departments.map(d => ({ id: d.id, title: d.title }))
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Organization</h1>
          <p className="text-gray-400">Add, edit, or remove staff members and executive board roles.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-astravia text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors whitespace-nowrap"
        >
          <HiPlus size={20} /> Add Member
        </button>
      </div>

      {/* Group Selector */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-gray-400 mb-2">Select Department or Board to Manage:</label>
          <div className="flex flex-wrap gap-2">
              {groupOptions.map(group => (
                  <button
                      key={group.id}
                      onClick={() => setActiveGroup(group.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          activeGroup === group.id 
                          ? 'bg-astravia text-black' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                  >
                      {group.title}
                  </button>
              ))}
          </div>
      </div>

      {/* Grid of Members */}
      <motion.div 
        key={activeGroup} // To re-trigger animation on group change
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full"
      >
          {members.map((member, index) => (
              <motion.div 
                 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                 key={index} 
                 className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center p-6 relative group"
              >
                  
                  {member.isHead && (
                      <span className="absolute top-2 left-2 bg-astravia text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Head of Dept
                      </span>
                  )}

                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4 bg-white/5 flex-shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="text-center w-full">
                      <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest truncate w-full" title={groupOptions.find(g => g.id === activeGroup)?.title}>
                        {groupOptions.find(g => g.id === activeGroup)?.title}
                      </div>
                      <h3 className="text-md font-bold text-white truncate max-w-full" title={member.name}>{member.name}</h3>
                      <p className="text-xs text-astravia mt-1 truncate max-w-full" title={member.position}>{member.position}</p>
                  </div>

                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(member)} className="p-2 bg-black/60 backdrop-blur text-white hover:text-blue-400 rounded-lg transition-colors border border-white/10">
                        <HiPencilAlt size={16} />
                      </button>
                      <button onClick={() => handleDelete(member.name)} className="p-2 bg-black/60 backdrop-blur text-white hover:text-red-400 rounded-lg transition-colors border border-white/10">
                        <HiTrash size={16} />
                      </button>
                  </div>
              </motion.div>
          ))}
          {members.length === 0 && (
             <motion.div 
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="col-span-full py-10 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center"
             >
                 <HiUserGroup size={48} className="text-white/20 mb-3" />
                 <p>No members found in this group.</p>
             </motion.div>
          )}
      </motion.div>

      {/* Basic Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm text-gray-400">Staff Photo</label>
                  <button 
                    type="button" 
                    onClick={() => setUseUrl(!useUrl)}
                    className="text-xs text-astravia hover:text-white transition-colors"
                  >
                    {useUrl ? 'Upload File Instead' : 'Use URL Instead'}
                  </button>
                </div>
                
                {useUrl ? (
                  <input 
                    type="url" 
                    required={useUrl}
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                    placeholder="https://..."
                  />
                ) : (
                  <div className="relative w-full h-10">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      required={!isEditing && !useUrl} // Only require if new and using upload
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-center text-sm text-gray-400 hover:bg-white/10 transition-colors">
                        Click to select an image file...
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Department Category</label>
                <div className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-astravia/70 font-semibold cursor-not-allowed">
                  {groupOptions.find(g => g.id === activeGroup)?.title}
                </div>
              </div>
              
              <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input 
                    type="text" 
                    required
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                    placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Position / Role</label>
                    <input 
                    type="text" 
                    required
                    value={formData.position} 
                    onChange={e => setFormData({...formData, position: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                    placeholder="e.g., Vice Chairman"
                    />
                  </div>
              </div>

              {/* Preview */}
              {formData.image && (
                  <div className="mt-4 flex flex-col justify-center items-center py-4 border-t border-white/5">
                      <p className="text-xs text-gray-500 mb-3 text-center">Preview (Photos are automatically cropped to a 1:1 circle)</p>
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 relative bg-black/50">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                      </div>
                  </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
