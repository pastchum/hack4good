import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/server'

const UpdateInventoryPage = () => {
  const [items, setItems] = useState([]); // Store items from Supabase
  const [selectedItemId, setSelectedItemId] = useState(''); // Selected item's ID
  const [stock, setStock] = useState(0); // Stock count to update
  const [voucherCost, setVoucherCost] = useState(0); // Voucher cost to update

  useEffect(() => {
    // Fetch items on component load
    const fetchItems = async () => {
      const supabase = await createClient()
      const { data: items, error } = await supabase.from('items').select('*');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(items);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItemId || stock < 0 || voucherCost < 0) {
      alert('Please select an item and provide valid inputs.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/items/${selectedItemId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock, voucherCost }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert(`Failed to update inventory: ${response.statusText}`);
        return;
      }

      const result = await response.json();
      alert('Inventory updated successfully!');
    } catch (error) {
      console.error('Failed to update inventory:', error);
      alert('An error occurred while updating the inventory.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Update Inventory</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="item" className="block text-lg font-medium">
            Select Item
          </label>
          <select
            id="item"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (Current Stock: {item.stock})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-lg font-medium">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="voucherCost" className="block text-lg font-medium">
            Voucher Cost
          </label>
          <input
            type="number"
            id="voucherCost"
            value={voucherCost}
            onChange={(e) => setVoucherCost(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Inventory
        </button>
      </form>
    </div>
  );
};

export default UpdateInventoryPage;
