"use client";

import { useState, useMemo } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SharedSelection } from "@nextui-org/system";

export interface TransactionFilterDetails {
  selectedKeys: Set<string>;
}

interface TransactionFilterProps {
  onSelectionChange: (filterSelection: TransactionFilterDetails) => void;
}

export default function TransactionFilter({ onSelectionChange }: TransactionFilterProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Completed", "Pending"]));
  const selectedValue = useMemo(() => {
    if (selectedKeys.size === 2) {
      return "All";
    } else if (selectedKeys.has("Completed")) {
      return "Completed";
    } else if (selectedKeys.has("Pending")) {
      return "Pending";
    } else {
      return "None";
    }
  }, [selectedKeys]);

  const handleSelectionChange = (keys: SharedSelection) => {
    const newKeys = new Set<string>(keys as Set<string>);
    setSelectedKeys(newKeys);
    onSelectionChange({ selectedKeys: newKeys });
  };

  return (
    <div className="m-2 p-4 border shadow rounded-xl w-1/5 h-full">
      {/* Filter for Availability */}
      <p className="text-xl font-bold">Transaction Status</p>
      <Dropdown>
        <DropdownTrigger>
          <button className="mt-2 p-2 border rounded-xl w-full text-blue-500 border-blue-500 font-semibold">
            {selectedValue}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Filter by status"
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
    </div>
  );
}

const labels = [
  {
    name: "Pending",
  },
  {
    name: "Completed",
  },
];
