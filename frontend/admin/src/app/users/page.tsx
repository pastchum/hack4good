"use client";

import React, { Key, useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Voucher Balance</th>
            <th>Positive Behavior</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.points}</td>
              <td>{user.voucherBalance}</td>
              <td>{user.behavior}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}