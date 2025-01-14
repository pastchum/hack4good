"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get("/api/inventory").then((res) => setInventory(res.data));
  }, []);

  const updateInventory = async (id: number, field: string, value: any) => {
    await axios.put(`/api/inventory/${id}`, { [field]: value });
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div>
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Voucher Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  value={item.stock_count}
                  onChange={(e) =>
                    updateInventory(item.id, "stock_count", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.voucher_price}
                  onChange={(e) =>
                    updateInventory(item.id, "voucher_price", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}