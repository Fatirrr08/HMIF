import React, { useState, useEffect } from 'react';
import { HiPlus, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { galleryData as initialGalleryData } from '../../data/mockData';

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load initial mock data
    setGallery(initialGalleryData);
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({ title: '', url: 'https://placehold.co/800x600/1a1a1a/FFD600?text=Activity+Photo' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setGallery(gallery.map(img => img.id === formData.id ? formData : img));
    } else {
      setGallery([...gallery, { ...formData, id: Date.now() }]);
    }
    // Note: Local state only until backend connects
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      setGallery(gallery.filter(img => img.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Gallery</h1>
          <p className="text-gray-400">Add, edit, or delete activity documentation photos.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-astravia text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <HiPlus size={20} /> Add Photo
        </button>
      </div>

      {/* Grid of Gallery Photos */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
      >
          {gallery.map(image => (
              <motion.div 
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                  key={image.id} 
                  className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col group relative"
              >
                  <div className="h-48 bg-white/5 relative border-b border-white/5">
                      <img src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-95 group-hover:scale-100">
                         <button onClick={() => handleOpenModal(image)} className="p-3 bg-blue-500/80 backdrop-blur text-white hover:bg-blue-500 rounded-xl transition-colors shadow-lg">
                            <HiPencilAlt size={20} />
                         </button>
                         <button onClick={() => handleDelete(image.id)} className="p-3 bg-red-500/80 backdrop-blur text-white hover:bg-red-500 rounded-xl transition-colors shadow-lg">
                            <HiTrash size={20} />
                         </button>
                      </div>
                  </div>
                  <div className="p-4 bg-[#111] relative z-20">
                      <h3 className="text-sm font-semibold text-white truncate block">{image.title}</h3>
                  </div>
              </motion.div>
          ))}
          
          {/* Add New Placeholder Card */}
          <motion.button 
             variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
             onClick={() => handleOpenModal()}
             className="h-full min-h-[250px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all group"
          >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 mb-3 transition-colors">
                  <HiPlus size={24} />
              </div>
              <span className="font-medium text-sm">Upload New Photo</span>
          </motion.button>
      </motion.div>

      {/* Basic Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Photo' : 'Add New Photo'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.url} 
                  onChange={e => setFormData({...formData, url: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-500 mt-2">Provides the direct link to the image (e.g., from Imgur, Google Drive, etc.).</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title / Event Description</label>
                <input 
                  type="text" 
                  required
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-astravia/50 transition-colors"
                  placeholder="e.g., Tech Fest Day 1"
                />
              </div>

              {/* Preview */}
              {formData.url && (
                  <div className="mt-4 border border-white/10 rounded-xl overflow-hidden h-40 bg-black/50">
                      <img src={formData.url} alt="Preview" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                  </div>
              )}

              <div className="pt-6 flex justify-end gap-3">
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
