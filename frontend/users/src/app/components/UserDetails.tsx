"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import voucherlogo from "@/icons/voucher-logo.png";

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
      <br />
      <a href="/vouchers">
        <div className="border justify-between rounded-xl bg-blue-500 text-white font-bold text-2xl p-5 transition-transform transition scale-95 hover:scale-100 hover:shadow-xl shadow-md h-28 flex-row flex items-start">
          <div className="flex-col ">
            Get More <p>Vouchers</p>
          </div>
          <Image
            src={voucherlogo}
            alt="Vouchers"
            height={100}
            width={100}
            className="object-cover"
          />
        </div>
      </a>
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
