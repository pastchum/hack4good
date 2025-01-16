"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface Request {
  id: number;
  userName: string;
  voucherCount: number;
  behavior: string;
}

export default function VoucherRequests() {
  const [requests, setRequests] = useState<Request[]>([]);

  // Fetch voucher requests
  useEffect(() => {
    axios.get("/api/voucher-requests").then((res) => setRequests(res.data));
  }, []);

  // Example Approve/Reject handlers (same as before)
  const handleApprove = async (id: number) => {
    await axios.post(`/api/voucher-requests/${id}/approve`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleReject = async (id: number) => {
    await axios.post(`/api/voucher-requests/${id}/reject`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header row */}
      <Header />

      {/* Main content */}
      <div className="row-start-2 w-full flex flex-col items-center">
        {/* Large centered heading */}
        <h1 className="text-6xl font-bold mb-12 text-center">
          VOUCHER TASK
        </h1>

        {/* 3 large buttons (similar to Manage Users layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          <button
            onClick={() => {
              // Example usage of handleApprove if you want
              // handleApprove(...) 
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            Approve Voucher Task
          </button>

          <button
            onClick={() => {
              // Example usage of handleReject if you want
              // handleReject(...) 
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md
                       flex items-center justify-center"
          >
            Reject Voucher Task
          </button>

          <button
            onClick={() => {
              // Handle track product request here if needed
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md
                       flex items-center justify-center
                       md:col-span-2" // so this button goes full width in 2-col layout
          >
            Track Product Request
          </button>
        </div>
      </div>

      {/* If you want a footer, place it in row-start-3 */}
    </div>
  );
}