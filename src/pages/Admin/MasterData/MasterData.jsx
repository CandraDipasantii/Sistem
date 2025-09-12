import React, { useState } from "react";
import {
  Table,
  Tabs,
  Button,
  Input,
  Select,
  Modal,
  Checkbox,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Pagination
} from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const MasterData = () => {
  const [activeTab, setActiveTab] = useState("User");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSources, setDataSources] = useState({
    User: [
      { id: 1, No: 1, Name: "pemilikwarung", Email: "pemilikwarung@gmail.com", Username: "pemilikwarung", Password: "••••••••", CreatedAt: "1 year ago", UpdatedAt: "1 year ago" },
      { id: 2, No: 2, Name: "Admin", Email: "daring.kecil@gmail.com", Username: "admin", Password: "••••••••", CreatedAt: "1 year ago", UpdatedAt: "1 year ago" }
    ],
    Merchant: [
      { id: 1, No: 1, Merchant: "Dago Creative Space", KitchenName: "", PrinterName: "", TypeOfMerchant: "", CreatedAt: "8 months ago", UpdatedAt: "5 months ago" },
      { id: 2, No: 2, Merchant: "HomeBro", Owner: "Ani", KitchenName: "", PrinterName: "", TypeOfMerchant: "", CreatedAt: "8 months ago", UpdatedAt: "5 months ago" },
      { id: 3, No: 3, Merchant: "Dapoer M.S", Owner: "Ani", KitchenName: "", PrinterName: "", TypeOfMerchant: "", CreatedAt: "8 months ago", UpdatedAt: "5 months ago" }
    ],
    "Product Category": [
      { id: 1, No: 1, Category: "Space Monitor", AllMerchant: "Dago creative Space", COA: "4-11 Pendapatan Sewa", TotalProduk: "4", CreatedAt: "8 months ago", UpdatedAt: "7 months ago" },
      { id: 2, No: 2, Category: "Salads & Sides", AllMerchant: "HomeBro", COA: "4-12 Pendapatan Sewa", TotalProduk: "5", CreatedAt: "8 months ago", UpdatedAt: "7 months ago" },
      { id: 3, No: 3, Category: "Hearty Bites", AllMerchant: "HomeBro", COA: "4-12 Pendapatan Sewa", TotalProduk: "6", CreatedAt: "8 months ago", UpdatedAt: "7 months ago" }
    ],
    Product: [
      { id: 1, No: 1, Product: "Coffee Frappe", AllCategory: "Non-Coffee Beverages", Hpp: "25.000,00", Price: "25.000,00", AllMerchant: "HomeBro", AllStatus: "Available" },
      { id: 2, No: 2, Product: "Space Monitor (3jam)", AllCategory: "Space Monitor", Hpp: "40.000,00", Price: "40.000,00", AllMerchant: "Dago Creative Space", AllStatus: "Available" },
      { id: 3, No: 3, Product: "Space Monitor (6jam)", AllCategory: "Space Monitor", Hpp: "60.000,00", Price: "60.000,00", AllMerchant: "Dago Creative Space", AllStatus: "Available" },
      { id: 4, No: 4, Product: "Space Monitor (8jam)", AllCategory: "Space Monitor", Hpp: "80.000,00", Price: "80.000,00", AllMerchant: "Dago Creative Space", AllStatus: "Available" },
      { id: 5, No: 5, Product: "Space Lesehan", AllCategory: "Space Lesehan", Hpp: "25.000,00", Price: "25.000,00", AllMerchant: "Dago Creative Space", AllStatus: "Available" },
    ],
    "Space Unit": [
      { id: 1, No: 1, SpaceName: "OS7", AllCategory: "Open Space", Desc: "Open Space 7", CreatedAt: "1 year ago", UpdatedAt: "10 months ago" },
      { id: 2, No: 2, SpaceName: "OS8", AllCategory: "Open Space", Desc: "Open Space 8", CreatedAt: "1 year ago", UpdatedAt: "10 months ago" },
      { id: 3, No: 3, SpaceName: "OS9", AllCategory: "Open Space", Desc: "Open Space 9", CreatedAt: "1 year ago", UpdatedAt: "10 months ago" },
    ],
    COA: [
      { id: 1, No: 1, Code: "1-1", Name: "Aset Lancar", Desc: "Aset Lancar", CreatedAt: "2 years ago", UpdatedAt: "1 year ago" },
      { id: 2, No: 2, Code: "1-11", Name: "Kas", Desc: "Kas", CreatedAt: "2 years ago", UpdatedAt: "1 year ago" },
      { id: 3, No: 3, Code: "1-1101", Name: "Kas Kecil", Desc: "Kas Kecil", CreatedAt: "2 years ago", UpdatedAt: "1 year ago" },
      { id: 4, No: 4, Code: "1-1102", Name: "Kas Besar", Desc: "Kas Besar", CreatedAt: "2 years ago", UpdatedAt: "1 year ago" },
    ],
     "Client Virtual Office": [
    { id: 1, No: 1, NamaPerusahaan: "PT Maju Jaya", BidangUsaha: "Konsultan IT", EmailPerusahaan: "admin@majujaya.com", NamaPendaftar: "Andi", Jabatan: "Direktur", AlamatDomisili: "Jl.Gatot Subroto N0.5", NomorTelepon: "081234567890" },
    { id: 2, No: 2, NamaPerusahaan: "PT Chana Manufacture", BidangUsaha: "Farmasi", EmailPerusahaan: "admin@mxxxxx.com", NamaPendaftar: "Cazle", Jabatan: "Dokter Umum", AlamatDomisili: "Jl.Gatot Subroto N0.5", NomorTelepon: "081234567890" }
    ],
    "Virtual Office": [
      { id: 1, No: 1, PaketVO: "Paket Virtual 6 Bulan", Desc: "Virtual Office adalah solusi cerdas untuk anda yang akan mulai merintis bisnis dan belum memiliki kantor...", Fasilitas: "Alamat BIsnis, free 3 jam meeting room, max 2x...", Harga: "1.750.000", CreatedAt: "1 year ago", UpdatedAt: "6 months ago" }
    ],
    "Paket Membership": [
      { id: 1, No: 1, Ruangan: "Open Space", Paket: "Basic", Harga: "250.000", Kuota: "25 Credit" },
      { id: 2, No: 2, Ruangan: "Open Space", Paket: "Standard", Harga: "400.000", Kuota: "45 Credit" },
      { id: 3, No: 3, Ruangan: "Open Space", Paket: "Premium", Harga: "400.000", Kuota: "75 Credit" },
      { id: 4, No: 4, Ruangan: "Space Monitor", Paket: "Basic", Harga: "350.000", Kuota: "30 Credit" },
      { id: 5, No: 5, Ruangan: "Space Monitor", Paket: "Standard", Harga: "550.000", Kuota: "50 Credit" },
    ],
    Promo: [
      { id: 1, No: 1, KodePromo: "FLASH50", Desc: "Flash diskon besar besaran", NilaiDiskon: "50%", EndDate: "2025-01-31", TanggalMulai: "50%", TanggalSelesai: "2025-01-31" }
    ]
  });

  const tabs = [
  { key: "User", label: "User" },
  { key: "Merchant", label: "Merchant" },
  { key: "Product Category", label: "Product Category" },
  { key: "Product", label: "Product" },
  { key: "Space Unit", label: "Space Unit" },
  { key: "COA", label: "COA" },
  { key: "Client Virtual Office", label: "Client Virtual Office" },
  { key: "Virtual Office", label: "Virtual Office" },
  { key: "Paket Membership", label: "Paket Membership" },
  { key: "Promo", label: "Promo" }
];

  const currentData = dataSources[activeTab] || [];

  // Modal state
  const [modalType, setModalType] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});

  // Open modal
  const openModal = (type, row = null) => {
    setModalType(type);
    setSelectedRow(row);
    setFormData(row || {});
  };

  // Close modal
  const closeModal = () => {
    setModalType(null);
    setSelectedRow(null);
    setFormData({});
  };

  // Handle form change
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Save Add/Edit
  const handleSave = () => {
    if (modalType === "add") {
      const newItem = {
        ...formData,
        id: Date.now(),
        No: currentData.length + 1,
        CreatedAt: "just now",
        UpdatedAt: "just now"
      };
      setDataSources({
        ...dataSources,
        [activeTab]: [...currentData, newItem]
      });
    } else if (modalType === "edit") {
      setDataSources({
        ...dataSources,
        [activeTab]: currentData.map((item) =>
          item.id === selectedRow.id ? { ...item, ...formData, UpdatedAt: "just now" } : item
        )
      });
    }
    closeModal();
  };

  // Delete
  const handleDelete = () => {
    setDataSources({
      ...dataSources,
      [activeTab]: currentData.filter((item) => item.id !== selectedRow.id)
    });
    closeModal();
  };

  // Generate columns dynamically
  const getColumns = () => {
    if (currentData.length === 0) return [];
    
    const dataColumns = Object.keys(currentData[0])
      .filter(key => key !== "id")
      .map(key => ({
        title: key,
        dataIndex: key,
        key: key,
        className: "text-sm"
      }));

    const actionColumn = {
      title: "",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space size={4}>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openModal("view", record)}
            style={{ padding: "2px 4px", height: "24px", width: "24px" }}
          />
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openModal("edit", record)}
            style={{ 
              backgroundColor: "#faad14", 
              borderColor: "#faad14",
              padding: "2px 4px", 
              height: "24px", 
              width: "24px" 
            }}
          />
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => openModal("delete", record)}
            style={{ padding: "2px 4px", height: "24px", width: "24px" }}
          />
        </Space>
      )
    };

    return [...dataColumns, actionColumn];
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: "white", 
        borderBottom: "1px solid #f0f0f0", 
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        padding: "16px 24px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Title level={4} style={{ margin: 0, color: "#1f2937" }}>Master Data POS</Title>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#6b7280" }}>Month Period</Text>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "4px",
              border: "1px solid #f3f4f6",
              borderRadius: "6px",
              padding: "4px 8px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              backgroundColor: "#f9fafb"
            }}>
              <CalendarOutlined style={{ fontSize: "14px", color: "#6b7280" }} />
              <Text style={{ color: "#374151", fontSize: "14px" }}>2025-09-01 to 2025-09-03</Text>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#9ca3af" }}>Dashboard</Text>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "24px", overflow: "hidden" }}>
        <Card 
          style={{ 
            borderRadius: "12px", 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #f3f4f6",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
          bodyStyle={{ padding: 0, flex: 1, display: "flex", flexDirection: "column" }}
        >
          {/* Tabs */}
          <div style={{ borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "12px" }}>
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  type="text"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    fontSize: "14px",
                    fontWeight: activeTab === tab.key ? 600 : 500,
                    color: activeTab === tab.key ? "#2563eb" : "#374151",
                    textDecoration: activeTab === tab.key ? "underline" : "none",
                    textUnderlineOffset: "16px",
                    border: "none",
                    background: "none",
                    padding: "8px 12px"
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, padding: "24px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Action Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Text style={{ fontSize: "14px", color: "#6b7280" }}>Tampilkan</Text>
                <Select
                  value={pageSize}
                  onChange={(value) => setPageSize(value)}
                  size="small"
                  style={{ width: 80 }}
                >
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Select>
                <Text style={{ fontSize: "14px", color: "#6b7280" }}>data</Text>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => openModal("add")}
                  style={{ fontSize: "14px" }}
                >
                  Add
                </Button>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  size="small"
                  style={{ width: 192 }}
                />
              </div>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflow: "auto" }}>
              <Table
                columns={getColumns()}
                dataSource={currentData}
                pagination={false}
                size="small"
                bordered
                rowKey="id"
                style={{ fontSize: "14px" }}
                rowClassName={(_, index) => index % 2 === 0 ? "bg-gray-50/50" : ""}
              />
            </div>

            {/* Pagination */}
            <div style={{ 
              marginTop: "16px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              borderTop: "1px solid #f3f4f6",
              paddingTop: "16px"
            }}>
              <Text style={{ fontSize: "14px", color: "#6b7280" }}>
                Menampilkan 1 - {Math.min(pageSize, currentData.length)} dari {currentData.length} data
              </Text>

              <Pagination
                current={currentPage}
                total={currentData.length}
                pageSize={pageSize}
                size="small"
                showSizeChanger={false}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>

            {/* Footer info */}
            <div style={{ marginTop: "16px" }}>
              <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
                Tidak ada data yang ditampilkan - load
              </Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        title={
          modalType === "add" ? "Create New User" :
          modalType === "edit" ? "Edit User" :
          modalType === "view" ? "Detail Data" :
          "Konfirmasi Hapus"
        }
        open={modalType !== null}
        onCancel={closeModal}
        width={700}
        footer={null}
        style={{ top: 20 }}
        maskStyle={{ backgroundColor: "rgba(209, 213, 219, 0.7)" }}
      >
{/* Add / Edit Form */}
{(modalType === "add" || modalType === "edit") && (
  <div>
    <Text type="danger" style={{ fontSize: "14px", display: "block", marginBottom: "20px" }}>
      * Required
    </Text>

    <Row gutter={24} style={{ marginBottom: "20px" }}>
      {activeTab === "User" && (
        <>
          <Col span={12}>
            <Text strong>Email <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Email" value={formData.Email || ""} onChange={(e) => handleChange("Email", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Name" value={formData.Name || ""} onChange={(e) => handleChange("Name", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Username <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Username" value={formData.Username || ""} onChange={(e) => handleChange("Username", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Password <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input.Password placeholder="Password" value={formData.Password || ""} onChange={(e) => handleChange("Password", e.target.value)} />
          </Col>
        </>
      )}

      {activeTab === "Merchant" && (
        <>
          <Col span={12}>
            <Text strong>Merchant Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Merchant Name" value={formData.MerchantName || ""} onChange={(e) => handleChange("MerchantName", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>User <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="User" value={formData.User || ""} onChange={(e) => handleChange("User", e.target.value)} />
          </Col>
        </>
      )}

      {activeTab === "Product Category" && (
        <>
          <Col span={12}>
            <Text strong>Category Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Category Name" value={formData.CategoryName || ""} onChange={(e) => handleChange("CategoryName", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Merchant <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Merchant" value={formData.Merchant || ""} onChange={(e) => handleChange("Merchant", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>COA <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="COA" value={formData.COA || ""} onChange={(e) => handleChange("COA", e.target.value)} />
          </Col>
        </>
      )}

      {activeTab === "Product" && (
        <>
          <Col span={12}>
            <Text strong>Product Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Product Name" value={formData.ProductName || ""} onChange={(e) => handleChange("ProductName", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Description</Text>
            <Input placeholder="Description" value={formData.Desc || ""} onChange={(e) => handleChange("Desc", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>HPP</Text>
            <Input placeholder="HPP" value={formData.Hpp || ""} onChange={(e) => handleChange("Hpp", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Price (IDR)</Text>
            <Input placeholder="Price" value={formData.Price || ""} onChange={(e) => handleChange("Price", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Merchant</Text>
            <Input placeholder="Merchant" value={formData.Merchant || ""} onChange={(e) => handleChange("Merchant", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Category</Text>
            <Input placeholder="Category" value={formData.Category || ""} onChange={(e) => handleChange("Category", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>COA</Text>
            <Input placeholder="COA" value={formData.COA || ""} onChange={(e) => handleChange("COA", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Product Type</Text>
            <Input placeholder="Product Type" value={formData.ProductType || ""} onChange={(e) => handleChange("ProductType", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Upload File</Text>
            <Input type="file" onChange={(e) => handleChange("File", e.target.files[0])} />
          </Col>
        </>
      )}

      {activeTab === "Space Unit" && (
        <>
          <Col span={12}>
            <Text strong>Space Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Space Name" value={formData.SpaceName || ""} onChange={(e) => handleChange("SpaceName", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Category <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Category" value={formData.Category || ""} onChange={(e) => handleChange("Category", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Description</Text>
            <Input placeholder="Description" value={formData.Desc || ""} onChange={(e) => handleChange("Desc", e.target.value)} />
          </Col>
        </>
      )}

      {activeTab === "COA" && (
        <>
          <Col span={12}>
            <Text strong>Code <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Code" value={formData.Code || ""} onChange={(e) => handleChange("Code", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Name <span style={{ color: "#ef4444" }}>*</span></Text>
            <Input placeholder="Name" value={formData.Name || ""} onChange={(e) => handleChange("Name", e.target.value)} />
          </Col>
          <Col span={12}>
            <Text strong>Description</Text>
            <Input placeholder="Description" value={formData.Desc || ""} onChange={(e) => handleChange("Desc", e.target.value)} />
          </Col>
        </>
      )}

      {activeTab === "Client Virtual Office" && (
        <>
          <Col span={12}><Text strong>Nama Perusahaan *</Text><Input value={formData.NamaPerusahaan || ""} onChange={(e) => handleChange("NamaPerusahaan", e.target.value)} /></Col>
          <Col span={12}><Text strong>Bidang Usaha *</Text><Input value={formData.BidangUsaha || ""} onChange={(e) => handleChange("BidangUsaha", e.target.value)} /></Col>
          <Col span={12}><Text strong>Email Perusahaan *</Text><Input value={formData.EmailPerusahaan || ""} onChange={(e) => handleChange("EmailPerusahaan", e.target.value)} /></Col>
          <Col span={12}><Text strong>Paket *</Text><Input value={formData.Paket || ""} onChange={(e) => handleChange("Paket", e.target.value)} /></Col>
          <Col span={12}><Text strong>Nama Pendaftar *</Text><Input value={formData.NamaPendaftar || ""} onChange={(e) => handleChange("NamaPendaftar", e.target.value)} /></Col>
          <Col span={12}><Text strong>Jabatan *</Text><Input value={formData.Jabatan || ""} onChange={(e) => handleChange("Jabatan", e.target.value)} /></Col>
          <Col span={12}><Text strong>Alamat Domisili *</Text><Input value={formData.AlamatDomisili || ""} onChange={(e) => handleChange("AlamatDomisili", e.target.value)} /></Col>
          <Col span={12}><Text strong>Nomor Telepon *</Text><Input value={formData.NomorTelepon || ""} onChange={(e) => handleChange("NomorTelepon", e.target.value)} /></Col>
        </>
      )}

      {activeTab === "Virtual Office" && (
        <>
          <Col span={12}><Text strong>Paket VO *</Text><Input value={formData.PaketVO || ""} onChange={(e) => handleChange("PaketVO", e.target.value)} /></Col>
          <Col span={12}><Text strong>Description</Text><Input value={formData.Desc || ""} onChange={(e) => handleChange("Desc", e.target.value)} /></Col>
          <Col span={12}><Text strong>Fasilitas</Text><Input value={formData.Fasilitas || ""} onChange={(e) => handleChange("Fasilitas", e.target.value)} /></Col>
          <Col span={12}><Text strong>Harga</Text><Input value={formData.Harga || ""} onChange={(e) => handleChange("Harga", e.target.value)} /></Col>
        </>
      )}

      {activeTab === "Paket Membership" && (
        <>
          <Col span={12}><Text strong>Nama Ruangan *</Text><Input value={formData.Ruangan || ""} onChange={(e) => handleChange("Ruangan", e.target.value)} /></Col>
          <Col span={12}><Text strong>Nama Paket *</Text><Input value={formData.Paket || ""} onChange={(e) => handleChange("Paket", e.target.value)} /></Col>
          <Col span={12}><Text strong>Harga</Text><Input value={formData.Harga || ""} onChange={(e) => handleChange("Harga", e.target.value)} /></Col>
          <Col span={12}><Text strong>Kuota</Text><Input value={formData.Kuota || ""} onChange={(e) => handleChange("Kuota", e.target.value)} /></Col>
        </>
      )}

      {activeTab === "Promo" && (
        <>
          <Col span={12}><Text strong>Kode Promo *</Text><Input value={formData.KodePromo || ""} onChange={(e) => handleChange("KodePromo", e.target.value)} /></Col>
          <Col span={12}><Text strong>Description</Text><Input value={formData.Desc || ""} onChange={(e) => handleChange("Desc", e.target.value)} /></Col>
          <Col span={12}><Text strong>Tanggal Mulai</Text><Input type="date" value={formData.TanggalMulai || ""} onChange={(e) => handleChange("TanggalMulai", e.target.value)} /></Col>
          <Col span={12}><Text strong>Tanggal Selesai</Text><Input type="date" value={formData.TanggalSelesai || ""} onChange={(e) => handleChange("TanggalSelesai", e.target.value)} /></Col>
          <Col span={12}><Text strong>Nilai Diskon</Text><Input value={formData.NilaiDiskon || ""} onChange={(e) => handleChange("NilaiDiskon", e.target.value)} /></Col>
          <Col span={12}><Text strong>Kuota</Text><Input value={formData.Kuota || ""} onChange={(e) => handleChange("Kuota", e.target.value)} /></Col>
        </>
      )}
    </Row>

    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
      <Button type="primary" onClick={handleSave} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        Save Data
      </Button>
      <Button onClick={closeModal} style={{ paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#d1d5db", color: "#374151", borderColor: "#d1d5db" }}>
        Close
      </Button>
    </div>
  </div>
)}


        {/* View Detail */}
        {modalType === "view" && selectedRow && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
              {Object.entries(selectedRow).map(([key, value]) =>
                key !== "id" ? (
                  <Col span={12} key={key}>
                    <div>
                      <Text type="secondary" style={{ fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "4px" }}>
                        {key}
                      </Text>
                      <Text style={{ fontSize: "14px", color: "#1f2937" }}>
                        {value}
                      </Text>
                    </div>
                  </Col>
                ) : null
              )}
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={closeModal}
                style={{ 
                  paddingLeft: "20px", 
                  paddingRight: "20px",
                  backgroundColor: "#d1d5db",
                  color: "#374151",
                  borderColor: "#d1d5db"
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {modalType === "delete" && selectedRow && (
          <div>
            <Text style={{ fontSize: "16px", color: "#374151", display: "block", marginBottom: "32px" }}>
              Apakah kamu yakin ingin menghapus data{" "}
              <span style={{ fontWeight: 600, color: "#111827" }}>
                {selectedRow.Name ||
                  selectedRow.MerchantName ||
                  selectedRow.CategoryName ||
                  selectedRow.ProductName ||
                  selectedRow.SpaceName ||
                  selectedRow.Code}
              </span>
              ?
            </Text>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button
                type="primary"
                danger
                onClick={handleDelete}
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                Hapus
              </Button>
              <Button
                onClick={closeModal}
                style={{ 
                  paddingLeft: "20px", 
                  paddingRight: "20px",
                  backgroundColor: "#d1d5db",
                  color: "#374151",
                  borderColor: "#d1d5db"
                }}
              >
                Batal
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MasterData;