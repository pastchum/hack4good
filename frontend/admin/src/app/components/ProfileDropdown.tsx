"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { signOut } from "../login/actions";

export default function ProfileDropdown({ name }: ProfileDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>
          <div className="p-2 font-bold border shadow-xl rounded-xl">
            {name}
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={() => signOut()}>
        <DropdownItem key="signout">Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

type ProfileDropdownProps = {
  name: string;
};
