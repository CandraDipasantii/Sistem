import React, { useState } from "react";
import {
  Card,
  Progress,
  Button,
  Typography,
  Row,
  Col,
  Space,
  List,
  Tag,
  Alert,
  Empty,
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  SendOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Dummy data untuk Virtual Office Paket 6 Bulan
const virtualOfficeData = {
  status: "aktif", // bisa: "aktif", "expired", "notfound"
  paket: "Paket 6 Bulan",
  harga: 1750000,
  tanggalMulai: "2024-09-01",
  tanggalBerakhir: "2025-03-01",
  benefits: [
    {
      nama: "Alamat bisnis untuk legalitas usaha",
      included: true,
      used: true,
      description: "Alamat resmi untuk keperluan bisnis dan legalitas",
    },
    {
      nama: "Penerimaan surat & paket",
      included: true,
      used: true,
      description: "Layanan terima dan kelola surat bisnis Anda",
    },
    {
      nama: "Free meeting room",
      included: true,
      quota: 4,
      used: 2,
      unit: "jam/bulan",
      description: "Ruang meeting gratis untuk kebutuhan bisnis",
    },
    {
      nama: "Free working space",
      included: true,
      quota: 8,
      used: 5,
      unit: "jam/bulan",
      description: "Akses ruang kerja bersama yang nyaman",
    },
    {
      nama: "Nama/logo perusahaan di website",
      included: true,
      used: true,
      description: "Promosi perusahaan di website Dago Creative Hub",
    },
    {
      nama: "Free wifi member",
      included: true,
      used: true,
      description: "Akses internet gratis saat menggunakan fasilitas",
    },
  ],
  riwayatPenggunaan: [
    {
      id: 1,
      tanggal: "2024-09-15",
      aktivitas: "Menggunakan meeting room",
      durasi: "2 jam",
      type: "meeting",
    },
    {
      id: 2,
      tanggal: "2024-09-20",
      aktivitas: "Menerima paket dari supplier",
      type: "mail",
    },
    {
      id: 3,
      tanggal: "2024-09-25",
      aktivitas: "Bekerja di working space",
      durasi: "3 jam",
      type: "workspace",
    },
    {
      id: 4,
      tanggal: "2024-10-01",
      aktivitas: "Menggunakan working space",
      durasi: "2 jam",
      type: "workspace",
    },
    {
      id: 5,
      tanggal: "2024-10-05",
      aktivitas: "Menerima surat resmi",
      type: "mail",
    },
  ],
};

const CekMasaVO = () => {
  const [data] = useState(virtualOfficeData);

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(data.tanggalBerakhir);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateProgress = (used, total) => {
    if (total === 0) return 0;
    return Math.round((used / total) * 100);
  };

  const getProgressStatus = (percentage) => {
    if (percentage <= 50) return "success";
    if (percentage <= 80) return "exception";
    return "exception"; // Merah
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return <UserOutlined />;
      case "workspace":
        return <DashboardOutlined />;
      case "mail":
        return <SendOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const renderContent = () => {
    const sharedButtonProps = {
      size: "large",
      style: {
        borderRadius: "50px",
        fontWeight: "bold",
        height: "auto",
        padding: "12px 24px",
        width: "100%",
      },
    };

    if (data.status === "expired") {
      return (
        <Alert
          type="error"
          showIcon
          icon={<ClockCircleOutlined />}
          message={
            <Title level={4} style={{ margin: 0, color: "#a00" }}>
              Langganan Virtual Office Berakhir
            </Title>
          }
          description={
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>
                Langganan Anda berakhir pada {formatDate(data.tanggalBerakhir)}.
                Perpanjang sekarang untuk melanjutkan layanan.
              </Text>
              <Button
                type="primary"
                danger
                {...sharedButtonProps}
                onClick={() => console.log("Perpanjang Langganan")}
              >
                Perpanjang Langganan
              </Button>
            </Space>
          }
          style={{ borderRadius: "8px" }}
        />
      );
    }

    if (data.status === "notfound") {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Data Langganan Tidak Ditemukan</Text>
              <Text type="secondary">
                Kami tidak dapat menemukan data langganan Virtual Office Anda.
              </Text>
              <Button
                type="primary"
                {...sharedButtonProps}
                onClick={() => console.log("Hubungi Customer Service")}
              >
                Hubungi Customer Service
              </Button>
            </Space>
          }
        />
      );
    }

    if (data.status === "aktif") {
      const daysRemaining = calculateDaysRemaining();
      const totalDays = Math.ceil(
        (new Date(data.tanggalBerakhir) - new Date(data.tanggalMulai)) /
          (1000 * 60 * 60 * 24)
      );
      const subscriptionProgress = calculateProgress(
        totalDays - daysRemaining,
        totalDays
      );

      return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Main Info Card */}
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              background: "linear-gradient(135deg, #1890ff, #722ed1)",
              color: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ position: "relative" }}>
              <Tag
                color="blue"
                style={{
                  position: "absolute",
                  top: -8,
                  right: 0,
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "12px",
                }}
              >
                {data.paket}
              </Tag>
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                  <Title level={3} style={{ margin: 0, color: "white" }}>
                    Virtual Office Aktif
                  </Title>
                  <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    Berlaku sampai {formatDate(data.tanggalBerakhir)}
                  </Text>
                </Col>
                <Col>
                  <Title level={3} style={{ margin: 0, color: "white" }}>
                    {daysRemaining} Hari
                  </Title>
                  <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    Sisa Waktu
                  </Text>
                </Col>
              </Row>
              <div style={{ marginTop: "24px" }}>
                <Progress
                  percent={subscriptionProgress}
                  strokeColor={{ "0%": "#fff", "100%": "#fff" }}
                  trailColor="rgba(255,255,255,0.3)"
                  showInfo={true}
                  strokeWidth={8}
                  style={{ marginBottom: "4px" }}
                />
                <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {subscriptionProgress}% dari masa langganan sudah digunakan
                </Text>
              </div>
            </div>
          </Card>

          {/* Benefits Overview */}
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Benefit Paket Anda
              </Title>
            }
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Row gutter={[24, 24]}>
              {data.benefits.map((benefit, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card
                    size="small"
                    style={{ borderRadius: "8px", backgroundColor: "#fafafa" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text strong>{benefit.nama}</Text>
                      {benefit.included ? (
                        <CheckCircleOutlined
                          style={{ color: "#52c41a", fontSize: "18px" }}
                        />
                      ) : (
                        <ExclamationCircleOutlined
                          style={{ color: "#faad14", fontSize: "18px" }}
                        />
                      )}
                    </div>
                    <Text type="secondary">{benefit.description}</Text>
                    {benefit.quota && (
                      <div style={{ marginTop: "12px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>Penggunaan</Text>
                          <Text strong>
                            {benefit.used} / {benefit.quota} {benefit.unit}
                          </Text>
                        </div>
                        <Progress
                          percent={calculateProgress(
                            benefit.used,
                            benefit.quota
                          )}
                          status={getProgressStatus(
                            calculateProgress(benefit.used, benefit.quota)
                          )}
                          showInfo={false}
                          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                        />
                      </div>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Usage History */}
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Riwayat Penggunaan
              </Title>
            }
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data.riwayatPenggunaan}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          backgroundColor: "#f0f2f5",
                          padding: "8px",
                          borderRadius: "50%",
                        }}
                      >
                        {getTypeIcon(item.type)}
                      </div>
                    }
                    title={item.aktivitas}
                    description={
                      <Space direction="vertical" size={4}>
                        <Text type="secondary">
                          <CalendarOutlined style={{ marginRight: "4px" }} />
                          {formatDate(item.tanggal)}
                        </Text>
                        {item.durasi && (
                          <Text type="secondary">
                            <ClockCircleOutlined style={{ marginRight: "4px" }} />
                            Durasi: {item.durasi}
                          </Text>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Space>
      );
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFF', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '8px' }}>
          Virtual Office Subscription
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '24px' }}>
          Pantau status dan penggunaan layanan Virtual Office Anda
        </Text>
        {renderContent()}
      </div>
    </div>
  );
};

export default CekMasaVO;