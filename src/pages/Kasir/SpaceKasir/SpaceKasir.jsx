import React, { useState } from "react";
import { Input, Table, Button, Tag } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const SpaceKasir = () => {
  const [status, setStatus] = useState("Active");

  const spaceTypes = [
    { name: "Space Monitor", total: 6, available: 6, icon: <DesktopOutlined /> },
    { name: "Space Lesehan", total: 6, available: 6, icon: <HomeOutlined /> },
    { name: "Meeting Room Kecil", total: 2, available: 2, icon: <UserOutlined /> },
    { name: "Meeting Room Besar", total: 1, available: 1, icon: <UserOutlined /> },
    { name: "Open Space", total: 14, available: 14, icon: <AppstoreOutlined /> },
  ];

  const spaceUnits = ["OS7", "OS8", "OS9", "OS10", "OS11", "OS12", "OS13", "MR3"];

  const dataSource = [
    {
      key: "1",
      product: "Meeting Room Kecil (2jam)",
      name: "Tes Hh",
      unit: "MR2",
      start: "09:36",
      end: "11:36",
      total: "Rp. 0",
    },
  ];

  const columns = [
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Start", dataIndex: "start", key: "start" },
    { title: "End", dataIndex: "end", key: "end" },
    { title: "Total (Rp)", dataIndex: "total", key: "total" },
  ];

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Search bar */}
      <Search placeholder="Search" allowClear className="w-full rounded-md" />

      {/* Top Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow text-center">
          <p className="text-sm">Today Transaction</p>
          <p className="text-2xl font-bold">Rp 22.500</p>
        </div>
        <div className="bg-yellow-400 text-black p-4 rounded-lg shadow text-center">
          <p className="text-sm">Space Rental</p>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow text-center">
          <p className="text-sm">Space Available</p>
          <p className="text-2xl font-bold">28</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Space Unit Type */}
        <div className="col-span-1">
          <h3 className="font-bold mb-2">Space Unit Type</h3>
          <div className="space-y-2">
            {spaceTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 shadow"
              >
                <div className="flex items-center space-x-2">
                  <Tag color="blue">{type.total}</Tag>
                  <Tag color="green">{type.available}</Tag>
                </div>
                <span className="text-sm font-medium">{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Space Unit Available + Table */}
        <div className="col-span-3 space-y-4">
          {/* Space Units */}
          <div>
            <h3 className="font-bold mb-2">Space Unit Available (28)</h3>
            <div className="flex flex-wrap gap-2">
              {spaceUnits.map((unit, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-white rounded-lg border flex items-center justify-center shadow cursor-pointer hover:bg-blue-50"
                >
                  <span className="font-semibold">{unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Space Rental (today)</h3>
              <div className="space-x-2">
                <Button
                  type={status === "Active" ? "primary" : "default"}
                  onClick={() => setStatus("Active")}
                >
                  Active
                </Button>
                <Button
                  type={status === "Finish" ? "primary" : "default"}
                  onClick={() => setStatus("Finish")}
                >
                  Finish
                </Button>
              </div>
            </div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceKasir;
