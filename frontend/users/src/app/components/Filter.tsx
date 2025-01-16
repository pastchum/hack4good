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

export interface FilterDetails {
  selectedKeys: Set<string>;
  priceRange: number[];
  search: string;
}

interface FilterProps {
  onSelectionChange: (filterSelection: FilterDetails) => void;
}

export default function Filter({ onSelectionChange }: FilterProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Available"]));
  const selectedValue = useMemo(() => {
    if (selectedKeys.size === 2) {
      return "All";
    } else if (selectedKeys.has("Available")) {
      return "Available";
    } else if (selectedKeys.has("Out of Stock")) {
      return "Out of Stock";
    } else {
      return "None";
    }
  }, [selectedKeys]);

  const handleSelectionChange = (keys: SharedSelection) => {
    const newKeys = new Set<string>(keys as Set<string>);
    setSelectedKeys(newKeys);
    onSelectionChange({ selectedKeys: newKeys, priceRange, search });
  };

  const [priceRange, setPriceRange] = useState([0, 100]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
      onSelectionChange({ selectedKeys, priceRange: value, search });
    }
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSelectionChange({ selectedKeys, priceRange, search: e.target.value });
  };

  return (
    <div className="m-2 p-4 border shadow rounded-xl w-1/5 h-full">
      {/* Filter for Search */}
      <p className="text-xl font-bold">Search</p>
      <Input
        placeholder="Search Products"
        value={search}
        onChange={handleSearchChange}
        className="mt-2"
      />
      <br />
      {/* Filter for Availability */}
      <p className="text-xl font-bold">Availability</p>
      <Dropdown>
        <DropdownTrigger>
          <button className="mt-2 p-2 border rounded-xl w-full text-blue-500 border-blue-500 font-semibold">
            {selectedValue}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Multiple selection example"
          items={labels}
          closeOnSelect={false}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={handleSelectionChange}
        >
          {(labels) => (
            <DropdownItem
              key={labels.name}
              className={`${
                selectedKeys.has(labels.name)
                  ? "text-blue-500"
                  : "text-slate-500"
              } `}
            >
              {labels.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* Filter for Price */}
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
