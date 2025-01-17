"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";

import { createClient } from "@/utils/supabase/client";
import { RenderVoucher, Voucher } from "../components/RenderVouchers";
import VoucherFilter, {
  VoucherFilterDetails,
} from "../components/VoucherFilter";

interface VoucherQuantity {
  id: string;
  qty: number;
}

type UserVouchers = {
  vouchers: Voucher;
  quantity: number;
  created_at: string;
};

export default function VoucherPage() {
  const [userVouchers, setUserVouchers] = useState<UserVouchers[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [voucherQty, setVoucherQty] = useState<VoucherQuantity[]>([]);
  const [visibleVouchers, setVisibleVouchers] = useState<Voucher[]>([]);
  const [selectedFilters, setSelectedFilters] =
    useState<VoucherFilterDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVouchers() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      const { id } = data.user!;
      setLoading(true);
      // Filter vouchers based on selected filters
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${id}/vouchers`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Vouchers:", data);
        if (response.ok && data.success) {
          setUserVouchers(data.data);
          const fetchedVouchers = data.data.map((uv: UserVouchers) => {
            return uv.vouchers;
          });
          setVouchers(fetchedVouchers);
          const fetchedVoucherQty = data.data.map((uv: UserVouchers) => ({
            id: uv.vouchers.id,
            qty: uv.quantity,
          }));
          setVoucherQty(fetchedVoucherQty);
          setVisibleVouchers(fetchedVouchers);
        }
      } catch (error) {
        console.error("Error fetching Vouchers:", error);
        throw error;
      } finally {
        console.log(visibleVouchers);
        console.log(userVouchers);
      }

      setLoading(false);
    }
    fetchVouchers();
  }, []);

  useEffect(() => {
    setVisibleVouchers(
      vouchers.filter((voucher) =>
        selectedFilters ? voucherMatchesFilters(voucher, selectedFilters) : true
      )
    );
  }, [selectedFilters]);

  const voucherMatchesFilters = (
    voucher: Voucher,
    filters: VoucherFilterDetails
  ) => {
    const priceCheck =
      filters.priceRange[0] < voucher.denomination &&
      filters.priceRange[1] > voucher.denomination;
    const searchCheck = voucher.description
      .toLowerCase()
      .includes(selectedFilters ? selectedFilters.search.toLowerCase() : "");

    return priceCheck && searchCheck; // && matchesDate;
  };

  const handleSelectionChange = (newSelection: VoucherFilterDetails) => {
    setSelectedFilters(newSelection);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full">
        <h1 className="text-4xl font-bold">Vouchers</h1>
        <div className="flex flex-row space-x-4 m-2 h-full">
          {/* Sidebar for filters */}
          <VoucherFilter onSelectionChange={handleSelectionChange} />
          {/* Main content */}
          <div className="p-2 m-2 border shadow rounded-xl grid grid-cols-1 w-full overflow-y-auto grid:col-1">
            {loading ? (
              <div className="flex justify-center items-center w-full h-48 text-2xl font-bold text-blue-500">
                <p>Loading...</p>
              </div>
            ) : visibleVouchers ? (
              visibleVouchers.map((voucher) => (
                <RenderVoucher
                  voucher={voucher}
                  quantity={
                    voucherQty?.find((pair) => pair.id === voucher.id)?.qty || 0
                  }
                  key={voucher.id}
                />
              ))
            ) : (
              <div className="items-center justify-center p-5">
                No Vouchers to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
