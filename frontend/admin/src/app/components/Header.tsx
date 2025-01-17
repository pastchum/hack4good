"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ProfileDropdown from "./ProfileDropdown";
import logo from "@/icons/logo.png";

export default function Header() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setName(data.user?.user_metadata.name || "");
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="p-5 row-start-1 flex flex-row justify-between gap-8 items-end w-full">
      <div className="">
        <a className="flex flex-row gap-4 items-center" href="/">
          <Image src={logo} alt="logo" />{" "}
          <div className="text-2xl font-bold flex flex-row text-orange-500">
            <p className="text-sm py-2 text-blue-500">MINI</p>MART
          </div>
        </a>
      </div>
      {name ? <ProfileDropdown name={name} /> : <div></div>}
    </header>
  );
}
