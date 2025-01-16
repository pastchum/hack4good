"use client";

import React, { Key, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

type User = {
  id: Key | null | undefined;
  name: string;
  points: number;
  voucherBalance: number;
  behavior: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header in the first row */}
      <Header />

      {/* Main content in the second row */}
      <div className="row-start-2 w-full flex flex-col items-center">
        {/* Centered bigger 'USERS' heading */}
        <h1 className="text-6xl font-bold mb-12 text-center">MANAGE USERS</h1>

        {/* Larger 4 boxes, occupying more space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
            Add User
          </button>
          <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
            Remove User
          </button>
          <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
            Suspend User
          </button>
          <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
            Reset Password
          </button>
        </div>

        {/* Remove the table
        <table className="min-w-full bg-white mt-12">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Points</th>
              <th className="py-2 px-4 border-b">Voucher Balance</th>
              <th className="py-2 px-4 border-b">Positive Behavior</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.points}</td>
                <td className="py-2 px-4 border-b">{user.voucherBalance}</td>
                <td className="py-2 px-4 border-b">{user.behavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
        */}
      </div>
    </div>
  );
}