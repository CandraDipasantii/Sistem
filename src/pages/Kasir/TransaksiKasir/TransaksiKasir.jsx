import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Select, Dropdown, Menu, Input, Modal, Radio } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { getDataTransaksiKasir } from "../../../services/service.js"; // pakai named import
import dayjs from "dayjs";

const { Option } = Select;

const TransaksiKasir = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderType, setOrderType] = useState("Takeout");
  const [customerName, setCustomerName] = useState("");
  const [room, setRoom] = useState("");

  const cashierName = "Rossa";

  const getStatusColor = (status) => {
    switch (status) {
      case "WAITING":
      case "Baru":
        return "warning";
      case "SUCCESS":
      case "Selesai":
        return "success";
      case "Diproses":
        return "processing";
      case "Batal":
        return "error";
      default:
        return "default";
    }
  };

  // Ambil data transaksi dari API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const result = await getDataTransaksiKasir();

        // Normalisasi data dari backend ke format frontend
        const mappedOrders = result.datas.map((o) => ({
          id: o.id,
          name: o.customer || "Guest",
          type: o.type || "-",
          status: o.status,
          price: o.total,
          product: o.items && o.items.length > 0 ? o.items[0].product : "-",
          room: o.type === "Dine In" ? o.type : null,
          time: o.time,
        }));

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching transaksi kasir:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalSales = orders.reduce((sum, order) => sum + order.price, 0);

  const productSummary = orders.reduce((acc, order) => {
    if (!acc[order.product]) {
      acc[order.product] = { qty: 0, total: 0 };
    }
    acc[order.product].qty += 1;
    acc[order.product].total += order.price;
    return acc;
  }, {});

  const topProducts = Object.entries(productSummary)
    .map(([product, data], index) => ({
      key: index + 1,
      item: product,
      qty: data.qty,
      total: `Rp ${data.total.toLocaleString("id-ID")}`,
    }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 10);

  const menu = (
    <Menu>
      <Menu.Item>Terbaru</Menu.Item>
      <Menu.Item>Terlama</Menu.Item>
    </Menu>
  );

  const handleCreateOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      name: customerName || "Guest",
      type: orderType === "Takeout" ? "Take Away" : orderType,
      status: "WAITING",
      price: 0, // default dulu
      product: "-",
      room: orderType === "Dine In" ? room : null,
      time: dayjs().format("DD MMMM YYYY HH:mm:ss"),
    };

    setOrders([...orders, newOrder]);

    // reset form
    setCustomerName("");
    setRoom("");
    setOrderType("Takeout");
    setIsModalVisible(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex-1 bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold">Welcome</h2>
            <p className="text-sm text-gray-500">Dago Creative Hub & Coffee Lab</p>
          </div>
        </div>

        <div className="pb-2">
          <Input.Search placeholder="Search" variant="filled" />
        </div>

        {/* Filter + New Order */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Select defaultValue="All Status" className="w-32">
              <Option value="all">All Status</Option>
              <Option value="waiting">Waiting</Option>
              <Option value="success">Success</Option>
            </Select>

            <Select defaultValue="All Type" className="w-32">
              <Option value="all">All Type</Option>
              <Option value="dinein">Dine In</Option>
              <Option value="takeaway">Take Away</Option>
              <Option value="online">Online</Option>
            </Select>

            <Dropdown overlay={menu}>
              <Button>Terbaru</Button>
            </Dropdown>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New Order
          </Button>
        </div>

        {/* Orders List */}
        <div>
          <h3 className="font-semibold mb-2">
            Jumlah Order ({orders.length})
          </h3>

          <div className="space-y-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 shadow-sm"
                >
                  <span className="font-semibold">
                    {order.name} {order.room ? `(${order.room})` : ""}
                  </span>

                  <div className="flex space-x-2">
                    <Tag
                      color={
                        order.type === "Online"
                          ? "orange"
                          : order.type === "Dine In"
                          ? "blue"
                          : "purple"
                      }
                      className="px-4 py-1 rounded-md font-semibold"
                    >
                      {order.type}
                    </Tag>

                    <Tag
                      color={getStatusColor(order.status)}
                      className="px-4 py-1 rounded-md font-semibold"
                    >
                      {order.status}
                    </Tag>
                  </div>

                  <span className="font-semibold text-blue-600">
                    Rp {order.price.toLocaleString("id-ID")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-72 bg-gray-100 p-4 space-y-6">
        <div className="flex justify-between bg-white rounded-lg p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-700">Total Sales</h3>
          <p className="text-xl font-bold text-blue-600">
            Rp {totalSales.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex justify-center">
          <img src="/img/logo_dago.png" alt="Logo Dago" className="h-16" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Top 10 Product</h3>
          <Table
            size="small"
            pagination={false}
            columns={[
              { title: "Item", dataIndex: "item", key: "item" },
              { title: "Qty", dataIndex: "qty", key: "qty" },
              { title: "Total (Rp)", dataIndex: "total", key: "total" },
            ]}
            dataSource={topProducts}
          />
        </div>
      </div>

      {/* Modal New Order */}
      <Modal
        title="Add New Order"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>{dayjs().format("DD MMMM YYYY HH:mm:ss")}</p>

        <Radio.Group
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value="Dine In">Dine In</Radio.Button>
          <Radio.Button value="Takeout">Takeout</Radio.Button>
          <Radio.Button value="Pick Up">Pick Up</Radio.Button>
        </Radio.Group>

        <Input
          placeholder="Customer Name (optional)"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {orderType === "Dine In" && (
          <Input
            placeholder="Room (ex: Room 1)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginBottom: 16 }}
          />
        )}

        <p><UserOutlined /> Cashier: {cashierName}</p>

        <Button
          type="primary"
          block
          icon={<PlusOutlined />}
          onClick={handleCreateOrder}
          style={{ marginTop: 16 }}
        >
          Create Order
        </Button>
      </Modal>
    </div>
  );
};

export default TransaksiKasir;
