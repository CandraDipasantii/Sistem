import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const PengelolaMembership = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: 'Regular', price: 100000, duration: '1 Bulan', benefits: ['Akses Ruang Meeting'], status: 'AKTIF' },
    { id: 2, name: 'Premium', price: 250000, duration: '3 Bulan', benefits: ['Akses Ruang VIP', 'Diskon 20%'], status: 'AKTIF' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '', benefits: '', status: 'AKTIF' });

  const getStatusColor = (status) => status === 'AKTIF' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white';

  const openForm = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg.id);
      setFormData({
        name: pkg.name,
        price: pkg.price,
        duration: pkg.duration,
        benefits: pkg.benefits.join(', '),
        status: pkg.status
      });
    } else {
      setEditingPackage(null);
      setFormData({ name: '', price: '', duration: '', benefits: '', status: 'AKTIF' });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPackage(null);
  };

  const savePackage = () => {
    const newPkg = {
      id: editingPackage || packages.length + 1,
      name: formData.name,
      price: parseInt(formData.price),
      duration: formData.duration,
      benefits: formData.benefits.split(',').map(b => b.trim()),
      status: formData.status
    };

    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage ? newPkg : p));
    } else {
      setPackages([newPkg, ...packages]);
    }
    closeForm();
  };

  const deletePackage = (id) => {
    if (window.confirm('Yakin ingin menghapus paket ini?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">💎 Pengelolaan Paket Membership</h2>
          <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus size={16}/> Tambah Paket
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-6 py-3 text-left">Nama Paket</th>
                  <th className="px-6 py-3 text-left">Harga</th>
                  <th className="px-6 py-3 text-left">Durasi</th>
                  <th className="px-6 py-3 text-left">Fasilitas / Benefit</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">{pkg.id}</td>
                    <td className="px-6 py-4 text-gray-900">{pkg.name}</td>
                    <td className="px-6 py-4 text-gray-900">Rp {pkg.price.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-gray-500">{pkg.duration}</td>
                    <td className="px-6 py-4 text-gray-700">{pkg.benefits.join(', ')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      <button onClick={() => openForm(pkg)} className="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded flex items-center justify-center">
                        <Edit size={14}/>
                      </button>
                      <button onClick={() => deletePackage(pkg.id)} className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center">
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={closeForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><X size={20}/></button>
            <h2 className="text-xl font-semibold mb-4">{editingPackage ? "Edit Paket" : "Tambah Paket"}</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Nama Paket" className="w-full p-2 border rounded" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})}/>
              <input type="number" placeholder="Harga" className="w-full p-2 border rounded" value={formData.price} onChange={e=>setFormData({...formData, price:e.target.value})}/>
              <input type="text" placeholder="Durasi" className="w-full p-2 border rounded" value={formData.duration} onChange={e=>setFormData({...formData, duration:e.target.value})}/>
              <input type="text" placeholder="Fasilitas / Benefit (pisahkan dengan koma)" className="w-full p-2 border rounded" value={formData.benefits} onChange={e=>setFormData({...formData, benefits:e.target.value})}/>
              <select className="w-full p-2 border rounded" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}>
                <option value="AKTIF">AKTIF</option>
                <option value="NONAKTIF">NONAKTIF</option>
              </select>
              <button onClick={savePackage} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{editingPackage ? "Simpan Perubahan" : "Tambah Paket"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengelolaMembership;
