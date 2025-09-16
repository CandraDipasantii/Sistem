import React, { useState } from "react";
import { Input, Button, Tag } from "antd";

const MerchantKasir = () => {
    const [filter, setFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [orders] = useState([
        {
            id: 1,
            name: "Rahde",
            type: "Dine In",
            status: "Finish",
            code: "KODE#INV001",
            items: [
                { id: 1, name: "Rice Bowls Sambal Matah", qty: 1, price: 15000, note: "" },
                { id: 2, name: "Nasi Goreng Ngejengit", qty: 1, price: 15000, note: "Level 4" },
            ],
        },
        {
            id: 2,
            name: "Gdiah",
            type: "Dine In",
            status: "Waiting",
            code: "KODE#INV002",
            items: [
                { id: 1, name: "Ayam Geprek", qty: 2, price: 20000, note: "Extra pedas" },
            ],
        },
    ]);

    // filter
    const filteredOrders =
        filter === "All" ? orders : orders.filter((o) => o.status === filter);

    return (
        <div className="p-4 bg-white min-h-screen">
            {/* Jika ada order terpilih → Detail View */}
            {selectedOrder ? (
                <div>
                    {/* Header */}
                    <div>
                        <h2 className="text-lg font-bold">Detail Order</h2>
                        <p className="text-sm text-gray-500">{selectedOrder.code}</p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        {/* Kiri: Nama + Type + Status */}
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold">{selectedOrder.name}</h3>
                            <Tag color="blue">{selectedOrder.type}</Tag>
                            <Tag color="green">{selectedOrder.status}</Tag>
                        </div>

                        {/* Kanan: Tombol Back */}
                        <Button onClick={() => setSelectedOrder(null)}>⬅ Back</Button>
                    </div>


                    {/* List Items */}
                    <div className="space-y-3">
                        {selectedOrder.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-gray-200 rounded-lg px-4 py-3 shadow-sm"
                            >
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm">x{item.qty}</p>
                                    {item.note && (
                                        <p className="text-xs text-gray-500">Note: {item.note}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">Rp {item.price.toLocaleString()}</p>
                                    <Tag color="green">DONE</Tag>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Jika tidak ada order dipilih → List View
                <div>
                    <h3 className="text-base font-semibold mb-2">
                        Active Order ({filteredOrders.length})
                    </h3>

                    {/* Tabs Filter */}
                    <div className="flex space-x-2 mb-4">
                        {["All", "Waiting", "In Progress", "Finish"].map((tab) => (
                            <Button
                                key={tab}
                                type={filter === tab ? "primary" : "default"}
                                onClick={() => setFilter(tab)}
                                className="rounded-full"
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="space-y-3">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className="flex justify-between items-center bg-gray-200 rounded-lg px-4 py-3 shadow-sm cursor-pointer hover:bg-gray-300"
                            >
                                <div>
                                    <p className="font-bold">{order.name}</p>
                                    <div className="flex space-x-2 text-xs mt-1">
                                        <Tag color="blue">{order.type}</Tag>
                                        <Tag color="geekblue">{order.code}</Tag>
                                    </div>
                                </div>
                                <Button
                                    type="primary"
                                    className={
                                        order.status === "Finish"
                                            ? "bg-green-500"
                                            : order.status === "Waiting"
                                                ? "bg-yellow-500 border-none"
                                                : "bg-blue-500"
                                    }
                                >
                                    {order.status.toUpperCase()}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MerchantKasir;
