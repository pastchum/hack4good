"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import TransactionFilter, {
  TransactionFilterDetails,
} from "../components/TransactionFilter";
import { createClient } from "@/utils/supabase/client";
import RenderTransaction, {
  Transaction,
} from "../components/RenderTransaction";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visibleTransactions, setVisibleTransactions] =
    useState<Transaction[]>(transactions);
  const [selectedFilters, setSelectedFilters] =
    useState<TransactionFilterDetails>({
      selectedKeys: new Set(["Completed", "Pending"]),
    });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      const { id } = data.user!;
      setLoading(true);
      // Filter transactions based on selected filters
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/transactions/${id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Transaction History:", data);
        if (response.ok && data.success) {
          setTransactions(data.data);
          setVisibleTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        throw error;
      }

      setLoading(false);
    }
    fetchTransactions();
    console.log(visibleTransactions);
  }, []);

  useEffect(() => {
    setVisibleTransactions(
      transactions.filter((transaction) =>
        transactionMatchesFilters(transaction, selectedFilters)
      )
    );
  }, [selectedFilters]);

  const transactionMatchesFilters = (
    transaction: Transaction,
    filters: TransactionFilterDetails
  ) => {
    const matchesStatus =
      filters.selectedKeys.size === 0 ||
      filters.selectedKeys.has(transaction.status);

    return matchesStatus; // && matchesDate;
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
          <TransactionFilter onSelectionChange={handleSelectionChange} />
          {/* Main content */}
          <div className="m-2 border shadow rounded-xl grid grid-cols-1 w-full overflow-y-auto grid:col-1">
            {loading ? (
              <div className="flex justify-center items-center w-full h-48 text-2xl font-bold text-blue-500">
                <p>Loading...</p>
              </div>
            ) : (
              visibleTransactions.map((transaction) => (
                <a
                  href={`transaction-history/${transaction.id}`}
                  key={transaction.id}
                >
                  <RenderTransaction transaction={transaction} />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
