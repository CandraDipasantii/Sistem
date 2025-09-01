import React, { useMemo, useState } from "react";
import { Search, RotateCcw, Eye, Pencil, Trash2, CalendarDays, ChevronDown, Plus, X } from "lucide-react";

const STATUS_STYLES = {
  WAITING: { bg: "bg-yellow-100", text: "text-yellow-700", ring: "ring-yellow-200", label: "WAITING" },
  SUCCESS: { bg: "bg-green-100", text: "text-green-700", ring: "ring-green-200", label: "SUCCESS" },
};

const dataSeed = [
  { id: "#001", customer: { name: "Xes", email: "xes@email.com" }, workspace: { name: "Meeting Room A", meta: "Kapasitas 8 orang" }, date: "1 Sep 2025", time: "09:00 - 12:00", durasi: "3 jam", status: "WAITING", total: 57000 },
  { id: "#002", customer: { name: "Meca", email: "meca@email.com" }, workspace: { name: "Co-working Space 1", meta: "Kapasitas 20 orang" }, date: "1 Sep 2025", time: "13:00 - 15:00", durasi: "2 jam", status: "SUCCESS", total: 15000 },
  { id: "#003", customer: { name: "Jonathan", email: "jonathan@email.com" }, workspace: { name: "Private Office", meta: "" }, date: "31 Agu 2025", time: "10:00 - 18:00", durasi: "8 jam", status: "SUCCESS", total: 28000 },
  { id: "#004", customer: { name: "24st7", email: "24st7@email.com" }, workspace: { name: "Meeting Room B", meta: "Kapasitas 6 orang" }, date: "31 Agu 2025", time: "14:00 - 16:00", durasi: "2 jam", status: "WAITING", total: 15000 },
  { id: "#005", customer: { name: "Diah", email: "diah@email.com" }, workspace: { name: "Co-working Space 1", meta: "Kapasitas 30 orang" }, date: "30 Agu 2025", time: "08:00 - 17:00", durasi: "9 jam", status: "SUCCESS", total: 30000 },
];

const Select = ({ label, value, onChange, options }) => (
  <label className="w-full md:w-auto flex-1">
    <span className="block text-sm font-medium text-slate-600 mb-1">{label}</span>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-indigo-200">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
    </div>
  </label>
);

const DateField = ({ label, value, onChange }) => (
  <label className="w-full md:w-auto flex-1">
    <span className="block text-sm font-medium text-slate-600 mb-1">{label}</span>
    <div className="relative">
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-indigo-200" />
      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
    </div>
  </label>
);

const Badge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.SUCCESS;
  return <span className={`inline-flex items-center rounded-full ${s.bg} ${s.text} ${s.ring} ring-1 px-2.5 py-1 text-[11px] sm:text-[12px] font-semibold`}>{s.label}</span>;
};

const Avatar = ({ name }) => {
  const initial = (name || "?").substring(0, 1).toUpperCase();
  return <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-indigo-600 text-white grid place-items-center text-xs sm:text-sm font-semibold shadow-sm">{initial}</div>;
};

const currency = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function RiwayatPesananPage() {
  const [rows, setRows] = useState(dataSeed);
  const [q, setQ] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("Semua Status");
  const [room, setRoom] = useState("Semua Workspace");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    id: "", customerName: "", customerEmail: "", workspaceName: "", workspaceMeta: "", date: "", time: "", durasi: "", status: "WAITING", total: ""
  });

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return rows.filter((r) => {
      const inSearch = !ql || r.id.toLowerCase().includes(ql) || r.customer.name.toLowerCase().includes(ql) || r.customer.email.toLowerCase().includes(ql) || r.workspace.name.toLowerCase().includes(ql);
      const statusOk = status === "Semua Status" || r.status === status;
      const roomOk = room === "Semua Workspace" || r.workspace.name === room;
      return inSearch && statusOk && roomOk;
    });
  }, [rows, q, status, room]);

  const resetFilters = () => { setStart(""); setEnd(""); setStatus("Semua Status"); setRoom("Semua Workspace"); setQ(""); };

  const openForm = (row = null) => {
    if (row) {
      setEditing(row.id);
      setFormData({
        id: row.id,
        customerName: row.customer.name,
        customerEmail: row.customer.email,
        workspaceName: row.workspace.name,
        workspaceMeta: row.workspace.meta,
        date: row.date,
        time: row.time,
        durasi: row.durasi,
        status: row.status,
        total: row.total
      });
    } else {
      setEditing(null);
      setFormData({ id: "", customerName: "", customerEmail: "", workspaceName: "", workspaceMeta: "", date: "", time: "", durasi: "", status: "WAITING", total: "" });
    }
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const saveRow = () => {
    const newRow = {
      id: editing || `#${(Math.max(0, ...rows.map(r => parseInt(r.id.replace("#","")))) + 1).toString().padStart(3,"0")}`,
      customer: { name: formData.customerName, email: formData.customerEmail },
      workspace: { name: formData.workspaceName, meta: formData.workspaceMeta },
      date: formData.date,
      time: formData.time,
      durasi: formData.durasi,
      status: formData.status,
      total: parseInt(formData.total),
    };
    if (editing) {
      setRows(rows.map(r => r.id === editing ? newRow : r));
    } else {
      setRows([newRow, ...rows]);
    }
    closeForm();
  };

  const deleteRow = (id) => { if (window.confirm("Yakin ingin menghapus pesanan ini?")) { setRows(rows.filter(r => r.id !== id)); } };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 sm:p-6">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DateField label="Tanggal Mulai" value={start} onChange={setStart} />
            <DateField label="Tanggal Akhir" value={end} onChange={setEnd} />
            <Select label="Status" value={status} onChange={setStatus} options={[
              { value: "Semua Status", label: "Semua Status" },
              { value: "WAITING", label: "Waiting" },
              { value: "SUCCESS", label: "Success" },
            ]}/>
            <Select label="Workspace" value={room} onChange={setRoom} options={[
              { value: "Semua Workspace", label: "Semua Workspace" },
              { value: "Meeting Room A", label: "Meeting Room A" },
              { value: "Co-working Space 1", label: "Co-working Space 1" },
              { value: "Private Office", label: "Private Office" },
              { value: "Meeting Room B", label: "Meeting Room B" },
            ]}/>
          </div>

          {/* Search + Export + Tambah */}
          <div className="mt-4 flex items-center justify-between">
            <div className="relative w-full sm:w-72 lg:w-96">
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cari pesanan..." className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm sm:text-base text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-indigo-200"/>
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"/>
            </div>
            <div className="flex gap-2">
              <button className="ml-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
                Export
              </button>
              <button onClick={()=>openForm()} className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600">
                <Plus className="h-4 w-4"/> Tambah
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {["ID PESANAN","CUSTOMER","WORKSPACE","TANGGAL & WAKTU","DURASI","STATUS","TOTAL","AKSI"].map(h=>(
                      <th key={h} className="px-4 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filtered.map(r=>(
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-indigo-600">{r.id}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.customer.name} />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-900">{r.customer.name}</div>
                            <div className="text-[10px] sm:text-xs text-slate-500">{r.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">{r.workspace.name}</div>
                        {r.workspace.meta && <div className="text-[10px] sm:text-xs text-slate-500">{r.workspace.meta}</div>}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">{r.date}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500">{r.time}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-800">{r.durasi}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap"><Badge status={r.status} /></td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-slate-900">{currency(r.total)}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button title="Edit" onClick={()=>openForm(r)} className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg ring-1 ring-slate-200 bg-amber-100 text-amber-700 hover:bg-amber-200">
                            <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                          </button>
                          <button title="Hapus" onClick={()=>deleteRow(r.id)} className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg ring-1 ring-slate-200 bg-rose-100 text-rose-700 hover:bg-rose-200">
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={closeForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><X size={20}/></button>
            <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Pesanan" : "Tambah Pesanan"}</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Nama Customer" className="w-full p-2 border rounded" value={formData.customerName} onChange={e=>setFormData({...formData, customerName:e.target.value})}/>
              <input type="email" placeholder="Email Customer" className="w-full p-2 border rounded" value={formData.customerEmail} onChange={e=>setFormData({...formData, customerEmail:e.target.value})}/>
              <input type="text" placeholder="Workspace" className="w-full p-2 border rounded" value={formData.workspaceName} onChange={e=>setFormData({...formData, workspaceName:e.target.value})}/>
              <input type="text" placeholder="Keterangan Workspace" className="w-full p-2 border rounded" value={formData.workspaceMeta} onChange={e=>setFormData({...formData, workspaceMeta:e.target.value})}/>
              <input type="date" placeholder="Tanggal" className="w-full p-2 border rounded" value={formData.date} onChange={e=>setFormData({...formData, date:e.target.value})}/>
              <input type="text" placeholder="Waktu" className="w-full p-2 border rounded" value={formData.time} onChange={e=>setFormData({...formData, time:e.target.value})}/>
              <input type="text" placeholder="Durasi" className="w-full p-2 border rounded" value={formData.durasi} onChange={e=>setFormData({...formData, durasi:e.target.value})}/>
              <select className="w-full p-2 border rounded" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}>
                <option value="WAITING">Waiting</option>
                <option value="SUCCESS">Success</option>
              </select>
              <input type="number" placeholder="Total" className="w-full p-2 border rounded" value={formData.total} onChange={e=>setFormData({...formData, total:e.target.value})}/>
              <button onClick={saveRow} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{editing ? "Simpan Perubahan" : "Tambah Pesanan"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
