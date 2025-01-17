"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

type User = {
  id: string;
  name: string;
};

export default function SuspendUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  const handleSuspendUser = () => {
    if (selectedUser) {
      axios.post(`/api/users/${selectedUser.id}/suspend`).then(() => {
        setSelectedUser(null);
      });
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <h1 className="text-4xl font-bold mb-8">Suspend User</h1>
      {users.length === 0 ? (
        <p className="text-xl">No users to display</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedUser?.id === user.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSuspendUser}
        disabled={!selectedUser}
        className={`mt-4 w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
          !selectedUser ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Suspend User
      </button>
    </div>
  );
}