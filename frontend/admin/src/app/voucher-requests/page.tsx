"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "../components/Header";

interface Request {
  id: number;
  userName: string;
  voucherCount: number;
  behavior: string;
}

export default function VoucherRequests() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    axios.get("/api/voucher-requests").then((res) => setRequests(res.data));
  }, []);

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
      <Header />

      <div className="row-start-2 w-full flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-12 text-center">VOUCHER TASK</h1>

        {/* 2 large buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          {/* Use Link instead of <a> in onClick */}
          <Link href="../voucher-requests/approve-voucher">
            <button
              className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                         transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md
                         flex items-center justify-center md:col-span-2"
            >
              View Voucher Task
            </button>
          </Link>

          <button
            onClick={() => {
              /* handle track product request if needed */
            }}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md
                       flex items-center justify-center md:col-span-2"
          >
            Track Product Request
          </button>
        </div>
      </div>
    </div>
  );
}