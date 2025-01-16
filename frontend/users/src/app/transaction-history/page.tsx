"use client"

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Filter, { TransactionFilterDetails } from "../components/Filter";
interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string; // e.g., "Completed", "Pending", "Failed"
}

const testTransaction1: Transaction = {
  id: "123",
  date: "2025-01-01",
  amount: 100,
  status: "Completed",
};

const testTransaction2: Transaction = {
  id: "124",
  date: "2025-01-02",
  amount: 200,
  status: "Pending",
};

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    testTransaction1,
    testTransaction2,
  ]);
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(
    transactions
  );
  const [selectedFilters, setSelectedFilters] = useState<TransactionFilterDetails>({
    selectedKeys: new Set(["Completed", "Pending"]),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      // Filter transactions based on selected filters
      setVisibleTransactions(
        transactions.filter((transaction) =>
          transactionMatchesFilters(transaction, selectedFilters)
        )
      );
      setLoading(false);
    }
    fetchTransactions();
  }, [selectedFilters]);

  const transactionMatchesFilters = (
    transaction: Transaction,
    filters: TransactionFilterDetails
  ) => {
    const matchesStatus =
      filters.selectedKeys.size === 0 ||
      filters.selectedKeys.has(transaction.status);

    return matchesStatus;// && matchesDate;
  };

  const handleSelectionChange = (newSelection: TransactionFilterDetails) => {
    setSelectedFilters(newSelection);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full">
        <h1 className="text-4xl font-bold">Transaction History</h1>
        <div className="flex flex-row space-x-4 m-2 h-full">
          {/* Sidebar for filters */}
          <Filter onSelectionChange={handleSelectionChange} />
          {/* Main content */}
          <div className="m-2 border shadow rounded-xl grid grid-cols-1 gap-4 w-full overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center w-full h-48 text-2xl font-bold text-blue-500">
                <p>Loading...</p>
              </div>
            ) : (
              visibleTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border rounded shadow hover:bg-gray-100"
                >
                  <p className="font-bold">Transaction ID: {transaction.id}</p>
                  <p>Date: {transaction.date}</p>
                  <p>Amount: ${transaction.amount.toFixed(2)}</p>
                  <p>Status: {transaction.status}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

