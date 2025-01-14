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
      <br />
      You have
      <div className="flex flex-row space-x-1 text-lg font-bold">
        <div className="text-orange-500">{userDetails.points}</div>
        <div>points</div>
      </div>
    </div>
  );
}

type UserDetails = {
  name: string;
  points: string;
};

type UserDetailsProps = {
  userDetails: UserDetails;
};
