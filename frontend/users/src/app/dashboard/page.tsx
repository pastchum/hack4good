"use client";

import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import UserDetails from "../components/UserDetails";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const session = (await supabase.auth.getSession()).data.session;

      if (session) {
        setUserData(session.user);
      }
    };
    fetchUser();
    console.log(userData);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/*Dashboard split */}
        <div className="flex flex-row justify-between space-y-2 p-10">
          <UserDetails />
          <Split />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

const Split = () => {
  return <div></div>;
};
