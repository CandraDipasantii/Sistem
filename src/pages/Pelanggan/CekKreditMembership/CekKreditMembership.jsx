import React from "react";
import { Card, Progress, Button, Typography, Row, Col, Space, List } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const CekKreditMembership = () => {
  // Data dummy member
  const member = {
    name: "Andi",
    membershipType: "Meeting Room Besar (Standard)",
    startDate: "1 Mei 2024",
    endDate: "1 Mei 2025",
    creditsUsed: 28,
    totalCredits: 70,
    riwayat: [
      {
        tanggal: "25 Agustus 2025",
        deskripsi: "Menggunakan 3 jam Meeting Room Besar",
      },
      {
        tanggal: "15 Agustus 2025",
        deskripsi: "Menggunakan 2 jam Meeting Room Besar",
      },
      {
        tanggal: "5 Agustus 2025",
        deskripsi: "Menggunakan 1 jam Meeting Room Besar",
      },
    ],
  };

  const sisaKredit = member.totalCredits - member.creditsUsed;
  const persentase = Math.round((member.creditsUsed / member.totalCredits) * 100);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Member Info */}
        <Card
          bordered={false}
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                {member.membershipType}
              </Title>
              <Text type="secondary">Member sejak {member.startDate}</Text>
            </Col>
            <Col>
              <Button type="primary" shape="round">
                Perpanjang Membership
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Quick Info Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '16px',
                backgroundColor: '#e6f7ff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CreditCardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={3} style={{ margin: '8px 0 4px 0', color: '#1890ff' }}>
                {sisaKredit} / {member.totalCredits}
              </Title>
              <Text type="secondary">Sisa Kredit</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '16px',
                backgroundColor: '#faf0ff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CalendarOutlined style={{ fontSize: '24px', color: '#9254de' }} />
              <Title level={3} style={{ margin: '8px 0 4px 0', color: '#9254de' }}>
                {member.endDate}
              </Title>
              <Text type="secondary">Masa Berlaku</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '16px',
                backgroundColor: '#f6ffed',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <ClockCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <Title level={3} style={{ margin: '8px 0 4px 0', color: '#52c41a' }}>
                {persentase}%
              </Title>
              <Text type="secondary">Sudah Digunakan</Text>
            </Card>
          </Col>
        </Row>
        
        {/* Progress Bar */}
        <Card
            bordered={false}
            style={{
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
            bodyStyle={{ padding: '24px 24px 8px 24px' }}
        >
          <Progress
            percent={persentase}
            strokeColor={{ from: '#1890ff', to: '#722ed1' }}
            status="active"
            style={{ marginBottom: '8px' }}
          />
          <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
            {persentase}% dari kredit Anda sudah digunakan
          </Text>
        </Card>


        {/* Riwayat Penggunaan */}
        <Card
          bordered={false}
          title={
            <Title level={4} style={{ margin: 0 }}>
              Riwayat Penggunaan
            </Title>
          }
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {member.riwayat.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={member.riwayat}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#e6f7ff' }}>
                        <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
                      </div>
                    }
                    title={
                      <Text strong>{item.deskripsi}</Text>
                    }
                    description={
                      <Text type="secondary">{item.tanggal}</Text>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
              Belum ada riwayat penggunaan
            </Text>
          )}
        </Card>
      </Space>
    </div>
  );
};

export default CekKreditMembership;