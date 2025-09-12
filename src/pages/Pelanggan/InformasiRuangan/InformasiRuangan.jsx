// File: InformasiRuangan.jsx
import React, { useContext, useEffect, useState } from "react";
import { SearchOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Card, Button, Input, Row, Col, Typography, Space, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const { Title, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

// --------------------- Data ---------------------
const meetingRooms = [
  {
    id: 1,
    name: "Ruangan Meeting 01",
    price: "Rp50.000/jam",
    description: "Privasi terjaga, fokus maksimal. Ruang meeting yang ideal untuk tim maksimal 9 orang. Dilengkapi dengan fasilitas lengkap seperti TV, dan akses WIFI unlimited. Cocok untuk rapat tim kecil atau brainstorming.",
    facilities: ["AC", "TV", "WIFI", "Stop Kontak"],
    mainImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Ruangan Meeting 02",
    price: "Rp75.000/jam",
    description: "Cocok untuk rapat kecil atau brainstorming dengan tim hingga 4 orang. Nyaman dengan AC dan TV untuk presentasi.",
    facilities: ["AC", "TV"],
    mainImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Ruangan Meeting 03",
    price: "Rp100.000/jam",
    description: "Ruang meeting luas dengan kapasitas hingga 8 orang, cocok untuk tim besar. Dilengkapi dengan fasilitas lengkap.",
    facilities: ["AC", "Stop Kontak"],
    mainImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

const spaceMonitors = [
  {
    id: 4,
    name: "Space Monitor 1",
    price: "Rp10.000/jam",
    description: "Monitor standar 24 inch untuk kebutuhan kerja ringan.",
    features: ["Resolusi Full HD", "HDMI Port", "Layar Anti Glare"],
    mainImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Space Monitor 2",
    price: "Rp15.000/jam",
    description: "Monitor 27 inch dengan kualitas gambar jernih, cocok untuk desain.",
    features: ["Resolusi 2K", "Wide Color Gamut", "Adjustable Stand"],
    mainImage: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Space Monitor 3",
    price: "Rp20.000/jam",
    description: "Monitor 32 inch untuk pengalaman visual lebih luas.",
    features: ["Resolusi 4K", "HDR Support", "Dual HDMI"],
    mainImage: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Space Monitor 4",
    price: "Rp25.000/jam",
    description: "Monitor gaming dengan refresh rate tinggi, cocok juga untuk multitasking.",
    features: ["Resolusi 2K", "165Hz Refresh Rate", "Adaptive Sync"],
    mainImage: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Space Monitor 5",
    price: "Rp30.000/jam",
    description: "Monitor ultra-wide untuk produktivitas dan pengalaman sinematik.",
    features: ["UltraWide 34 inch", "WQHD", "Curved Display"],
    mainImage: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80",
  },
];

// --------------------- Component ---------------------
const InformasiRuangan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTabKey, setActiveTabKey] = useState('2'); // default Space Monitor
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (userProfile?.roles === "admin") {
      navigate("/dashboardadmin");
    } else if (userProfile?.roles === "kasir") {
      navigate("/mengelola-orderan_fb");
    }
  }, [userProfile, navigate]);

  // Filter function
  const filterData = (data) =>
    data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredRooms = filterData(meetingRooms);
  const filteredMonitors = filterData(spaceMonitors);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>Welcome to Dago</Title>
        <Text type="secondary">
          Coworking Space in North, Creative Hub & F&B untuk Skena Anak Muda di Singaraja
        </Text>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Search
          placeholder={`Cari di ${activeTabKey === '2' ? 'Space Monitor' : 'Meeting Room'}...`}
          allowClear
          prefix={<SearchOutlined />}
          onSearch={value => setSearchTerm(value)}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <Tabs defaultActiveKey="2" onChange={key => { setActiveTabKey(key); setSearchTerm(''); }}>
        <TabPane tab="Space Monitor" key="2">
          <Row gutter={[16, 16]}>
            {filteredMonitors.map(monitor => (
              <Col xs={24} sm={12} lg={8} key={monitor.id}>
                <Card
                  hoverable
                  cover={<img alt={monitor.name} src={monitor.mainImage} style={{ height: 180, objectFit: 'cover' }} />}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => navigate(`/roomdetail/${monitor.id}`, { state: monitor })}
                    >
                      Pilih Monitor
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={monitor.name}
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong style={{ color: '#1890ff' }}>{monitor.price}</Text>
                        <Text>{monitor.description}</Text>
                        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                          {monitor.features?.map((f, i) => (
                            <li key={i}>
                              <CheckCircleFilled style={{ color: '#1890ff', marginRight: '8px' }} />
                              <Text>{f}</Text>
                            </li>
                          ))}
                        </ul>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Meeting Room" key="3">
          <Row gutter={[16, 16]}>
            {filteredRooms.map(room => (
              <Col xs={24} sm={12} lg={8} key={room.id}>
                <Card
                  hoverable
                  cover={<img alt={room.name} src={room.mainImage} style={{ height: 180, objectFit: 'cover' }} />}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => navigate(`/roomdetail/${room.id}`, { state: room })}
                    >
                      Pilih Ruangan
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={room.name}
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong style={{ color: '#1890ff' }}>{room.price}</Text>
                        <Text>{room.description}</Text>
                        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                          {room.facilities.map((f, i) => (
                            <li key={i}>
                              <CheckCircleFilled style={{ color: '#1890ff', marginRight: '8px' }} />
                              <Text>{f}</Text>
                            </li>
                          ))}
                        </ul>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InformasiRuangan;
