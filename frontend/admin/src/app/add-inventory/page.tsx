"use client"

import React, { useState } from "react";

const AddInventoryPage = () => {
  const [itemId, setItemId] = useState("");
  const [stock, setStock] = useState(0);
  const [voucherCost, setVoucherCost] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/items/:${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock, voucherCost }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Item inventory updated successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to update inventory:", error);
      alert("An error occurred while updating the inventory.");
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <h1 className="text-4xl font-bold mb-8">Update Inventory</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="itemId" className="block text-lg font-medium text-gray-700">
            Item ID
          </label>
          <input
            type="text"
            id="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-lg font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="voucherCost" className="block text-lg font-medium text-gray-700">
            Voucher Cost
          </label>
          <input
            type="number"
            id="voucherCost"
            value={voucherCost}
            onChange={(e) => setVoucherCost(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Inventory
        </button>
      </form>
    </div>
  );
};

export default AddInventoryPage;

