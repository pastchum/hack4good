"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface InventoryItem {
  id: number;
  name: string;
  stock_count: number;
  voucher_price: number;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Fetch inventory items
  useEffect(() => {
    axios.get("/api/inventory").then((res) => setInventory(res.data));
  }, []);

  // Update an inventory field
  const updateInventory = async (id: number, field: string, value: any) => {
    await axios.put(`/api/inventory/${id}`, { [field]: value });
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header (first row) */}
      <Header />

      {/* Main content (second row) */}
      <div className="row-start-2 w-full flex flex-col items-center">
        {/* Large centered heading */}
        <h1 className="text-6xl font-bold mb-12 text-center">INVENTORY</h1>

        {/* Three large buttons (similar to your Manage Users layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          {/* VIEW INVENTORY */}
          <button
            onClick={() => setShowTable((prev) => !prev)}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            View Inventory
          </button>

          {/* UPDATE INVENTORY */}
          <button
            onClick={() => {
              // e.g. open a modal, or toggle something else
              alert("Update Inventory clicked!");
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            Update Inventory
          </button>

          {/* VIEW AUDIT LOGS (full width in a 2-col layout) */}
          <button
            onClick={() => {
              alert("View Audit Logs clicked!");
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center md:col-span-2"
          >
            View Audit Logs
          </button>
        </div>

        {/* (Optional) TABLE: only shown if "showTable" is true */}
        {showTable && (
          <table className="min-w-full bg-white mt-12 border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Voucher Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={item.stock_count}
                      onChange={(e) =>
                        updateInventory(item.id, "stock_count", e.target.value)
                      }
                      className="border p-1 w-20"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={item.voucher_price}
                      onChange={(e) =>
                        updateInventory(item.id, "voucher_price", e.target.value)
                      }
                      className="border p-1 w-20"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* You can add a footer in row-start-3 if you want */}
    </div>
  );
}