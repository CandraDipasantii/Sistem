import React, { useState } from "react";
import { SearchOutlined, CheckCircleFilled, StarFilled, CoffeeOutlined, SafetyOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Button, Input, Row, Col, Typography, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;

// --------------------- Data Membership ---------------------

const memberships = [
  {
    title: "Open Space Membership",
    subtitle: "Ruang kerja fleksibel untuk produktivitas maksimal",
    icon: <CoffeeOutlined />,
    data: [
      {
        name: "Basic",
        price: "Rp 250.000",
        period: "/ bulan",
        quota: "25 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
        features: ["Akses 24/7", "High-Speed WiFi", "Area Lounge", "Basic Support", "Coffee & Tea"],
      },
      {
        name: "Standard",
        price: "Rp 400.000",
        period: "/ bulan",
        quota: "45 credit",
        popular: true,
        image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=600&q=80",
        features: ["Akses 24/7", "Premium WiFi", "Area Lounge", "Priority Support", "Coffee & Tea", "Meeting Room 2 jam/bulan"],
      },
      {
        name: "Premium",
        price: "Rp 550.000",
        period: "/ bulan",
        quota: "70 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
        features: ["Akses 24/7", "Premium WiFi", "Area Lounge", "Priority Support", "Coffee & Tea", "Meeting Room 5 jam/bulan", "Dedicated Desk"],
      },
    ],
  },
  {
    title: "Space Monitor Membership",
    subtitle: "Workstation lengkap dengan monitor dan peralatan kerja",
    icon: <SafetyOutlined />,
    data: [
      {
        name: "Basic",
        price: "Rp 350.000",
        period: "/ bulan",
        quota: "30 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
        features: ["Monitor 24 inch", "Keyboard & Mouse", "Premium WiFi", "Storage Locker", "Coffee & Tea"],
      },
      {
        name: "Standard",
        price: "Rp 550.000",
        period: "/ bulan",
        quota: "50 credit",
        popular: true,
        image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=600&q=80",
        features: ["Monitor 27 inch", "Mechanical Keyboard & Mouse", "Premium WiFi", "Storage Locker", "Coffee & Tea", "Webcam HD"],
      },
      {
        name: "Premium",
        price: "Rp 750.000",
        period: "/ bulan",
        quota: "75 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=600&q=80",
        features: ["Dual Monitor 27 inch", "Gaming Keyboard & Mouse", "Premium WiFi", "Storage Locker", "Coffee & Tea", "Webcam 4K", "Premium Headset"],
      },
    ],
  },
  {
    title: "Meeting Room Kecil Membership",
    subtitle: "Ruang meeting intim untuk diskusi produktif",
    icon: <UserOutlined />,
    data: [
      {
        name: "Basic",
        price: "Rp 500.000",
        period: "/ bulan",
        quota: "40 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1604014237744-df0a0d1fb0fd?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 4 orang", "TV 43 inch", "Whiteboard", "AC & WiFi", "Coffee Service"],
      },
      {
        name: "Standard",
        price: "Rp 750.000",
        period: "/ bulan",
        quota: "60 credit",
        popular: true,
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 4 orang", "TV 50 inch", "Smart Whiteboard", "AC & WiFi", "Coffee Service", "Conference Camera"],
      },
      {
        name: "Premium",
        price: "Rp 1.000.000",
        period: "/ bulan",
        quota: "90 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 4 orang", "TV 55 inch", "Smart Whiteboard", "AC & WiFi", "Premium Coffee", "Conference System", "Catering Service"],
      },
    ],
  },
  {
    title: "Meeting Room Besar Membership",
    subtitle: "Ruang meeting luas untuk presentasi dan workshop",
    icon: <ClockCircleOutlined />,
    data: [
      {
        name: "Basic",
        price: "Rp 700.000",
        period: "/ bulan",
        quota: "45 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 8 orang", "Projector HD", "Sound System", "AC & WiFi", "Refreshment"],
      },
      {
        name: "Standard",
        price: "Rp 1.000.000",
        period: "/ bulan",
        quota: "70 credit",
        popular: true,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 8 orang", "Projector 4K", "Premium Sound", "AC & WiFi", "Refreshment", "Video Conference"],
      },
      {
        name: "Premium",
        price: "Rp 1.300.000",
        period: "/ bulan",
        quota: "100 credit",
        popular: false,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
        features: ["Kapasitas 8 orang", "Projector 4K", "Premium Sound", "AC & WiFi", "Premium Catering", "Video Conference Pro", "Dedicated Support"],
      },
    ],
  },
];

// --------------------- Component ---------------------

const Membership = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredMemberships = memberships.map(section => ({
    ...section,
    data: section.data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.data.length > 0);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>Pilih Paket Membership Anda</Title>
        <Text type="secondary">
          Dapatkan akses eksklusif dan fasilitas lengkap untuk produktivitas maksimal di Dago.
        </Text>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Search
          placeholder="Cari paket membership..."
          allowClear
          prefix={<SearchOutlined />}
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {filteredMemberships.map((section, idx) => (
          <div key={idx}>
            <div style={{ marginBottom: "24px" }}>
              <Title level={5} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '24px' }}>{section.icon}</span>
                {section.title}
              </Title>
              <Text type="secondary">{section.subtitle}</Text>
            </div>
            <Row gutter={[24, 24]}>
              {section.data.map((item, i) => (
                <Col xs={24} md={8} key={i}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ position: 'relative' }}>
                        <img alt={item.name} src={item.image} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                        {item.popular && (
                          <div style={{ position: 'absolute', top: 16, left: 16 }}>
                            <Tag icon={<StarFilled />} color="gold">Paling Populer</Tag>
                          </div>
                        )}
                      </div>
                    }
                  >
                    <Card.Meta
                      title={<div style={{ textAlign: 'center' }}>{item.name}</div>}
                      description={
                        <div style={{ textAlign: 'center' }}>
                          <Title level={3} style={{ margin: '0 0 8px 0' }}>
                            {item.price}<Text style={{ fontSize: '16px' }} type="secondary">{item.period}</Text>
                          </Title>
                          <Tag color="green">{item.quota}</Tag>
                          <ul style={{ padding: '0 0 0 20px', margin: '16px 0 0 0', textAlign: 'left', listStyle: 'none' }}>
                            {item.features.map((feature, idx) => (
                              <li key={idx} style={{ marginBottom: '8px' }}>
                                <CheckCircleFilled style={{ color: '#1890ff', marginRight: '8px' }} />
                                <Text>{feature}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                    <div style={{ marginTop: '24px' }}>
                      <Button
                        type={item.popular ? "primary" : "default"}
                        onClick={() => navigate("/daftar-member")}
                        style={{ width: "100%" }}
                      >
                        {item.popular ? "Pilih Plan Terbaik" : "Pilih Plan"}
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default Membership;
