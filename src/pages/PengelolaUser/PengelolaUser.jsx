import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Filter, Eye, Edit, Trash2, Phone, MapPin } from 'lucide-react';

const PengelolaUser = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Ahmad Rizki Pratama',
      email: 'ahmad.rizki@gmail.com',
      phone: '+62 812-3456-7890',
      location: 'Singaraja, Bali',
      role: 'ADMIN',
      status: 'AKTIF',
      membership: 'Premium',
      membershipExp: '15 Des 2025',
      lastActivity: '1 Sep 2025',
      lastActivityTime: '14:30 WIB (Online)',
      totalBooking: 47,
      totalSpending: 'Rp 2.850.000',
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Sari Dewi Lestari',
      email: 'sari.dewi@gmail.com',
      phone: '+62 813-4567-8901',
      location: 'Denpasar, Bali',
      role: 'PREMIUM',
      status: 'AKTIF',
      membership: 'Premium',
      membershipExp: '8 Mar 2026',
      lastActivity: '31 Agu 2025',
      lastActivityTime: '16:45 WIB',
      totalBooking: 23,
      totalSpending: 'Rp 1.450.000',
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      phone: '+62 814-5678-9012',
      location: 'Ubud, Bali',
      role: 'USER',
      status: 'AKTIF',
      membership: 'Regular',
      membershipExp: '15 Mar 2024',
      lastActivity: '30 Agu 2025',
      lastActivityTime: '09:15 WIB',
      totalBooking: 12,
      totalSpending: 'Rp 680.000',
      avatar: 'B'
    },
    {
      id: 4,
      name: 'Nina Kusuma',
      email: 'nina.kusuma@gmail.com',
      phone: '+62 815-6789-0123',
      location: 'Sanur, Bali',
      role: 'USER',
      status: 'SUSPENDED',
      membership: 'Regular',
      membershipExp: '22 Jun 2024',
      lastActivity: '25 Agu 2025',
      lastActivityTime: '11:20 WIB',
      totalBooking: 8,
      totalSpending: 'Rp 320.000',
      avatar: 'N'
    },
    {
      id: 5,
      name: 'Dedi Kurniawan',
      email: 'dedi.kurniawan@gmail.com',
      phone: '+62 816-7890-1234',
      location: 'Singaraja, Bali',
      role: 'PREMIUM',
      status: 'AKTIF',
      membership: 'Premium',
      membershipExp: '10 Nov 2025',
      lastActivity: '1 Sep 2025',
      lastActivityTime: '08:45 WIB (Online)',
      totalBooking: 35,
      totalSpending: 'Rp 1.980.000',
      avatar: 'D'
    },
    {
      id: 6,
      name: 'Luh Kadek Ayu',
      email: 'kadek.ayu@gmail.com',
      phone: '+62 817-8901-2345',
      location: 'Ubud, Bali',
      role: 'USER',
      status: 'TIDAK AKTIF',
      membership: 'Regular',
      membershipExp: '3 Jul 2024',
      lastActivity: '18 Agu 2025',
      lastActivityTime: '13:22 WIB',
      totalBooking: 6,
      totalSpending: 'Rp 240.000',
      avatar: 'L'
    }
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filters, setFilters] = useState({
    statusUser: '',
    role: '',
    tanggalDaftar: '',
    lokasi: '',
    loginTerakhir: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    if (filters.statusUser) {
      filtered = filtered.filter(user => user.status === filters.statusUser);
    }
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    if (filters.lokasi) {
      filtered = filtered.filter(user => user.location.includes(filters.lokasi));
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      statusUser: '',
      role: '',
      tanggalDaftar: '',
      lokasi: '',
      loginTerakhir: ''
    });
    setSearchTerm('');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-500 text-white';
      case 'PREMIUM': return 'bg-yellow-500 text-white';
      case 'USER': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AKTIF': return 'bg-green-500 text-white';
      case 'SUSPENDED': return 'bg-red-500 text-white';
      case 'TIDAK AKTIF': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAvatarColor = (letter) => {
    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Filter Section */}
        {/* ... (filter UI tetap sama) ... */}

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama, email, ID user..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">INFORMASI USER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROLE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MEMBERSHIP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AKTIVITAS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TOTAL BOOKING</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TOTAL SPENDING</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AKSI</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarColor(user.avatar)} flex items-center justify-center text-white font-semibold mr-4`}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Phone size={12} className="mr-1" />
                            {user.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={12} className="mr-1" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.membership}</div>
                      <div className="text-xs text-gray-500">Exp: {user.membershipExp}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.lastActivity}</div>
                      <div className="text-xs text-gray-500">{user.lastActivityTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-semibold text-gray-900">{user.totalBooking}</div>
                      <div className="text-xs text-gray-500">TOTAL BOOKING</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{user.totalSpending}</div>
                      <div className="text-xs text-gray-500">Total Spending</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded flex items-center justify-center transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="w-8 h-8 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded flex items-center justify-center transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (static example) */}
        <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="text-sm text-gray-700">
              Menampilkan 1-6 dari 1.247 user
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">&lt;</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">208</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengelolaUser;
