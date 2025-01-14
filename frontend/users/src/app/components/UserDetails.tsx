"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function UserDetails() {
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
    <div>
      <div className="text-4xl font-bold">WELCOME</div>
      <div>{userData?.user_metadata?.name}</div>
    </div>
  );
}
