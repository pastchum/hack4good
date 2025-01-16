"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VoucherRequests() {
  interface Request {
    id: number;
    userName: string;
    voucherCount: number;
    behavior: string;
  }

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
    <div>
      <h1>Voucher Requests</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Vouchers</th>
            <th>Behavior</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.userName}</td>
              <td>{req.voucherCount}</td>
              <td>{req.behavior}</td>
              <td>
                <button onClick={() => handleApprove(req.id)}>Approve</button>
                <button onClick={() => handleReject(req.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}