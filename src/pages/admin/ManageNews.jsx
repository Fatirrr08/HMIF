import React, { useState, useEffect } from 'react';
import { HiPlus, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { newsData as initialNewsData } from '../../data/mockData';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', summary: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load initial mock data
    setNews(initialNewsData);
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({ title: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), summary: '', link: '#' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setNews(news.map(n => n.id === formData.id ? formData : n));
    } else {
      setNews([...news, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news post?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage News</h1>
          <p className="text-gray-400">Add, edit, or delete news posts displayed on the homepage.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-astravia text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <HiPlus size={20} /> Add News
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-semibold whitespace-nowrap">Title</th>
                <th className="p-4 font-semibold whitespace-nowrap hidden sm:table-cell">Date</th>
                <th className="p-4 font-semibold whitespace-nowrap hidden lg:table-cell">Summary</th>
                <th className="p-4 font-semibold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody
               variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
               }}
               initial="hidden"
               animate="show"
            >
              {news.map((item) => (
                <motion.tr 
                   variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                   key={item.id} 
                   className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 align-top">
                    <p className="font-semibold text-white truncate max-w-[200px] sm:max-w-[300px] block">{item.title}</p>
                    <p className="text-xs text-gray-500 sm:hidden mt-1">{item.date}</p>
                  </td>
                  <td className="p-4 align-top text-gray-400 hidden sm:table-cell whitespace-nowrap">{item.date}</td>
                  <td className="p-4 align-top text-gray-400 hidden lg:table-cell">
                     <p className="truncate max-w-[300px] xl:max-w-[400px] block">{item.summary}</p>
                  </td>
                  <td className="p-4 align-top whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                        <HiPencilAlt size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <HiTrash size={18} />
                        </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {news.length === 0 && (
                  <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-400">No news posts found.</td>
                  </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Basic Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg mb-20 relative">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit News' : 'Add New Post'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input 
                  type="text" 
                  required
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Summary</label>
                <textarea 
                  required
                  rows="3"
                  value={formData.summary} 
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors resize-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
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
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
