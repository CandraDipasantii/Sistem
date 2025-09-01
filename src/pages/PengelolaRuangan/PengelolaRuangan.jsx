import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Eye, Edit, Trash2, Plus, X } from 'lucide-react';
import Logo from '../../assets/images/logo.png';

const PengelolaRuangan = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Ruang VIP A', description: 'Ruang eksklusif dengan AC dan proyektor', location: 'Singaraja, Bali', price: 500000, facilities: ['AC', 'Proyektor', 'WiFi'], status: 'TERSEDIA', avatar: 'V', image: null },
    { id: 2, name: 'Ruang Meeting B', description: 'Cocok untuk rapat kecil', location: 'Denpasar, Bali', price: 250000, facilities: ['WiFi', 'Whiteboard'], status: 'TERSEDIA', avatar: 'M', image: null }
  ]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [filters, setFilters] = useState({ status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', location: '', price: '', facilities: '', status: 'TERSEDIA', imageFile: null, imagePreview: null
  });

  useEffect(() => {
    let filtered = rooms;
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter(room => room.status === filters.status);
    }
    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({ status: '' });
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TERSEDIA': return 'bg-green-500 text-white';
      case 'TERSEWA': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleOpenForm = (room = null) => {
    if (room) {
      setEditingRoom(room.id);
      setFormData({
        name: room.name,
        description: room.description,
        location: room.location,
        price: room.price,
        facilities: room.facilities.join(', '),
        status: room.status,
        imageFile: null,
        imagePreview: room.image || null
      });
    } else {
      setEditingRoom(null);
      setFormData({
        name: '', description: '', location: '', price: '', facilities: '', status: 'TERSEDIA', imageFile: null, imagePreview: null
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRoom(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const handleSaveRoom = () => {
    const newRoom = {
      id: editingRoom ? editingRoom : Math.max(0, ...rooms.map(r => r.id)) + 1,
      name: formData.name,
      description: formData.description,
      location: formData.location,
      price: parseInt(formData.price),
      facilities: formData.facilities.split(',').map(f => f.trim()),
      status: formData.status,
      avatar: formData.name[0]?.toUpperCase() || 'R',
      image: formData.imagePreview || null
    };
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom ? newRoom : r));
    } else {
      setRooms([newRoom, ...rooms]);
    }
    handleCloseForm();
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus ruangan ini?')) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Filter & Search + Tambah */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6 flex flex-wrap items-end gap-4">
          <input type="text" placeholder="Cari nama, deskripsi, lokasi..." className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="p-2 border border-gray-300 rounded-md" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">Semua Status</option>
            <option value="TERSEDIA">TERSEDIA</option>
            <option value="TERSEWA">TERSEWA</option>
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <RotateCcw size={16} /> Reset
            </button>
            <button onClick={() => handleOpenForm()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus size={16} /> Tambah Ruangan
            </button>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Informasi Ruangan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fasilitas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">{room.id}</td>
                    <td className="px-6 py-4 flex items-center">
                      {room.image ? (
                        <img src={room.image} alt={room.name} className="w-14 h-14 object-cover rounded-lg mr-4" />
                      ) : (
                        <img src={Logo} alt="Logo" className="w-14 h-14 object-cover rounded-lg mr-4" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{room.name}</div>
                        <div className="text-xs text-gray-500">{room.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{room.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Rp {room.price.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(room.status)}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{room.facilities.join(', ')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded flex items-center justify-center"><Eye size={14} /></button>
                        <button onClick={() => handleOpenForm(room)} className="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded flex items-center justify-center"><Edit size={14} /></button>
                        <button onClick={() => handleDeleteRoom(room.id)} className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={handleCloseForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-6">{editingRoom ? 'Edit Ruangan' : 'Tambah Ruangan'}</h2>
            <div className="flex gap-6">
              {/* Bagian kiri: Upload gambar */}
              <div className="flex flex-col items-center gap-3 w-1/3">
                {formData.imagePreview ? (
                  <div className="relative w-full h-48">
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <button
                      onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: null })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200">
                    <Plus size={32} className="text-gray-400 mb-2" />
                    <span className="text-gray-400 text-sm">Klik untuk upload gambar</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Bagian kanan: Form input */}
              <div className="flex flex-col gap-3 w-2/3">
                <input type="text" placeholder="Nama Ruangan" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input type="text" placeholder="Deskripsi" className="w-full p-2 border rounded" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                <input type="text" placeholder="Lokasi" className="w-full p-2 border rounded" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                <input type="number" placeholder="Harga" className="w-full p-2 border rounded" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                <input type="text" placeholder="Fasilitas (pisahkan dengan koma)" className="w-full p-2 border rounded" value={formData.facilities} onChange={e => setFormData({ ...formData, facilities: e.target.value })} />
                <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                  <option value="TERSEDIA">TERSEDIA</option>
                  <option value="TERSEWA">TERSEWA</option>
                </select>
                <button onClick={handleSaveRoom} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editingRoom ? 'Simpan Perubahan' : 'Tambah Ruangan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengelolaRuangan;
