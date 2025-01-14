"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

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