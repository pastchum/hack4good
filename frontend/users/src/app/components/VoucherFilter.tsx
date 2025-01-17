"use client";

import { useState, useMemo } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SharedSelection } from "@nextui-org/system";
import { Slider } from "@nextui-org/slider";
import { Input } from "@nextui-org/input";

export interface VoucherFilterDetails {
  priceRange: number[];
  search: string;
}

interface VoucherFilterProps {
  onSelectionChange: (filterSelection: VoucherFilterDetails) => void;
}

export default function VoucherFilter({
  onSelectionChange,
}: VoucherFilterProps) {
  const handleSelectionChange = (keys: SharedSelection) => {
    const newKeys = new Set<string>(keys as Set<string>);
    onSelectionChange({ priceRange, search });
  };

  const [priceRange, setPriceRange] = useState([0, 100]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
      onSelectionChange({ priceRange: value, search });
    }
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSelectionChange({ priceRange, search: e.target.value });
  };

  return (
    <div className="m-2 p-4 border shadow rounded-xl w-full md:w-1/5 h-full">
      {/* Filter for Search */}
      <p className="text-xl font-bold">Search</p>
      <Input
        placeholder="Search Vouchers"
        value={search}
        onChange={handleSearchChange}
        className="mt-2"
        aria-label="Search"
      />
      <br />

      <>
        <p className="text-xl font-bold mt-4">Price Range</p>
        <Slider
          value={priceRange}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={handlePriceChange}
          className="mt-2"
          aria-label="Price Range"
        />
        <div className="flex justify-between mt-2">
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
      </>
    </div>
  );
}

const labels = [
  {
    name: "Available",
  },
  {
    name: "Out of Stock",
  },
];
