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
      <Header />
      <div className="row-start-2 w-full flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-12 text-center">MANAGE USERS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          <a href="/users/add-user">
            <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
              Add User
            </button>
          </a>
          <a href="/users/remove-user">
            <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
              Remove User
            </button>
          </a>
          <a href="/users/suspend-user">
            <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
              Suspend User
            </button>
          </a>
          <a href="/users/reset-password">
            <button className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6 transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md flex items-center justify-center">
              Reset Password for User
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}