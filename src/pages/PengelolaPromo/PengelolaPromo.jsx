import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';

const PengelolaPromo = () => {
  const [promos, setPromos] = useState([
    { id: 1, name: 'Diskon 20%', description: 'Potongan 20% untuk semua ruangan', period: '1 Sep 2025 - 30 Sep 2025', status: 'AKTIF' },
    { id: 2, name: 'Promo VIP', description: 'Diskon 50% untuk ruang VIP', period: '1 Okt 2025 - 31 Okt 2025', status: 'NONAKTIF' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromoId, setCurrentPromoId] = useState(null);
  const [newPromo, setNewPromo] = useState({
    name: '',
    description: '',
    period: '',
    status: 'AKTIF'
  });

  const getStatusColor = (status) => status === 'AKTIF' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromo({ ...newPromo, [name]: value });
  };

  const handleTambahPromo = () => {
    if (isEditing) {
      setPromos(promos.map(p => p.id === currentPromoId ? { ...p, ...newPromo } : p));
    } else {
      const promoToAdd = {
        id: promos.length + 1,
        ...newPromo
      };
      setPromos([promoToAdd, ...promos]);
    }
    setShowForm(false);
    setIsEditing(false);
    setCurrentPromoId(null);
    setNewPromo({ name: '', description: '', period: '', status: 'AKTIF' });
  };

  const handleEdit = (promo) => {
    setNewPromo({
      name: promo.name,
      description: promo.description,
      period: promo.period,
      status: promo.status
    });
    setIsEditing(true);
    setCurrentPromoId(promo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus promo ini?")) {
      setPromos(promos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📢 Mengelola Promo</h2>
          <button 
            onClick={() => { setShowForm(true); setIsEditing(false); setNewPromo({ name: '', description: '', period: '', status: 'AKTIF' }) }} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16}/> Tambah Promo
          </button>
        </div>

        {/* Tabel Promo */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-6 py-3 text-left">Nama Promo</th>
                  <th className="px-6 py-3 text-left">Deskripsi</th>
                  <th className="px-6 py-3 text-left">Periode</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promos.map(promo => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">{promo.id}</td>
                    <td className="px-6 py-4 text-gray-900">{promo.name}</td>
                    <td className="px-6 py-4 text-gray-500">{promo.description}</td>
                    <td className="px-6 py-4 text-gray-500">{promo.period}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(promo.status)}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      <button className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded flex items-center justify-center">
                        <Eye size={14}/>
                      </button>
                      <button 
                        className="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded flex items-center justify-center"
                        onClick={() => handleEdit(promo)}
                      >
                        <Edit size={14}/>
                      </button>
                      <button 
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center"
                        onClick={() => handleDelete(promo.id)}
                      >
                        <Trash2 size={14}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup Modal Tambah/Edit Promo */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Promo' : 'Tambah Promo Baru'}</h3>
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text"
                name="name"
                value={newPromo.name}
                onChange={handleInputChange}
                placeholder="Nama Promo"
                className="border p-2 rounded w-full"
              />
              <input 
                type="text"
                name="description"
                value={newPromo.description}
                onChange={handleInputChange}
                placeholder="Deskripsi Promo"
                className="border p-2 rounded w-full"
              />
              <input 
                type="text"
                name="period"
                value={newPromo.period}
                onChange={handleInputChange}
                placeholder="Periode (contoh: 1 Sep 2025 - 30 Sep 2025)"
                className="border p-2 rounded w-full"
              />
              <select 
                name="status" 
                value={newPromo.status} 
                onChange={handleInputChange} 
                className="border p-2 rounded w-full"
              >
                <option value="AKTIF">AKTIF</option>
                <option value="NONAKTIF">NONAKTIF</option>
              </select>
              <button 
                onClick={handleTambahPromo} 
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
              >
                {isEditing ? 'Simpan Perubahan' : 'Simpan Promo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengelolaPromo;
