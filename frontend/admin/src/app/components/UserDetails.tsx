"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function UserDetails({ userDetails }: UserDetailsProps) {
  return (
    <div>
      <div className="text-6xl font-bold flex-col flex">
        WELCOME
        <div className="text-blue-500">{userDetails.name}</div>
      </div>
    </div>
  );
}

type UserDetails = {
  name: string;
};

type UserDetailsProps = {
  userDetails: {
    name: string;
  };
};
