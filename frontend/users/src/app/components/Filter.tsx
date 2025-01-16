"use client";

import { useState, useMemo } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SharedSelection } from "@nextui-org/system";

interface FilterProps {
  onSelectionChange: (selectedKeys: Set<string>) => void;
}

export default function Filter({ onSelectionChange }: FilterProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Available"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: SharedSelection) => {
    const newKeys = new Set<string>(keys as Set<string>);
    setSelectedKeys(newKeys);
    onSelectionChange(newKeys);
  };

  return (
    <div className="m-2 p-4 border shadow rounded-xl w-1/5 h-full">
      <p className="text-xl font-bold">Filters</p>
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
              key={labels.id}
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
    id: 1,
    name: "Available",
  },
  {
    id: 2,
    name: "Out of Stock",
  },
];
