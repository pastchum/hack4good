"use client";

import React, { useEffect, useState } from "react";
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

  const handleRedirect = () => {
    window.location.href = "/add-inventory";// Replace with the actual route to the Update Inventory page
  };

  // Fetch inventory items from the Express.js backend
  const fetchInventory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/items`); // Replace with your backend URL

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setInventory(result.data); // Adjust based on the backend's response format
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  // update inventory
  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <Header />
  
      {/* Main content */}
      <div className="row-start-2 w-full flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-12 text-center">INVENTORY</h1>
  
        {/* Action buttons */}
        <div className="flex justify-center gap-8 w-full">
          <button
            onClick={() => setShowTable((prev) => !prev)}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            View Inventory
          </button>
  
          <button
            onClick={handleRedirect}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            Update Inventory
          </button>
        </div>
  
        {/* Inventory Table */}
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
                  <td className="py-2 px-4 border-b">{item.stock_count}</td>
                  <td className="py-2 px-4 border-b">
                    ${item.voucher_price ? item.voucher_price.toFixed(2) : "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}  