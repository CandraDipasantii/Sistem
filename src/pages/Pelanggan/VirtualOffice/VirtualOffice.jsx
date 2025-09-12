import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { Card, Button, Row, Col, Typography, Tag, Space, List } from "antd";
import { CheckCircleFilled, StarFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

// Data Membership
const memberships = [
  {
    id: 6,
    name: "Paket 6 Bulan",
    price: "Rp1.750.000",
    description: "Akses ruang kerja reguler 20 jam/bulan.",
    benefits: ["Diskon 10%", "Free WIFI", "1x Meeting Room"],
    mainImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Paket 12 Bulan",
    price: "Rp2.950.000",
    description: "Akses ruang kerja reguler 50 jam/bulan.",
    benefits: ["Diskon 15%", "Free WIFI", "2x Meeting Room"],
    mainImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const VirtualOffice = () => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (userProfile?.roles === "admin") {
      navigate("/dashboardadmin");
    } else if (userProfile?.roles === "kasir") {
      navigate("/mengelola-orderan_fb");
    }
  }, [userProfile, navigate]);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>Pilih Paket Virtual Office</Title>
      <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '40px' }}>
        Temukan paket membership yang sesuai dengan kebutuhan dan anggaran Anda.
      </Text>

      <Row gutter={[24, 24]} justify="center">
        {memberships.map((member, index) => (
          <Col xs={24} sm={16} md={12} lg={10} xl={8} key={member.id}>
            <Card
              hoverable
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              cover={
                <div style={{ position: 'relative' }}>
                  <img
                    alt={member.name}
                    src={member.mainImage}
                    style={{ height: 200, objectFit: 'cover', width: '100%' }}
                  />
                  {index === 1 && (
                    <div style={{ position: 'absolute', top: 16, right: 16 }}>
                      <Tag icon={<StarFilled />} color="gold" style={{ padding: '4px 12px', fontSize: '14px' }}>
                        Best Seller
                      </Tag>
                    </div>
                  )}
                </div>
              }
            >
              <Card.Meta
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4} style={{ marginBottom: '4px' }}>{member.name}</Title>
                    <Title level={2} style={{ color: '#1890ff', margin: '0' }}>{member.price}</Title>
                  </div>
                }
                description={
                  <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                    <Text type="secondary" style={{ marginTop: '8px' }}>{member.description}</Text>
                    <List
                      size="small"
                      dataSource={member.benefits}
                      renderItem={item => (
                        <List.Item>
                          <CheckCircleFilled style={{ color: '#52c41a', marginRight: '8px' }} />
                          <Text>{item}</Text>
                        </List.Item>
                      )}
                      style={{ marginTop: '16px', border: 'none' }}
                    />
                  </Space>
                }
              />
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    navigate(`/detail-paket/${member.id}`, {
                      state: { paketName: member.name },
                    })
                  }
                  style={{
                    borderRadius: '50px',
                    width: '100%',
                    background: 'linear-gradient(to right, #40a9ff, #69c0ff)',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Pilih Paket
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VirtualOffice;