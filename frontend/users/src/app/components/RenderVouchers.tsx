import Image from "next/image";
import React, { useEffect } from "react";

export interface Voucher {
  id: string;
  description: string;
  denomination: number;
  is_available: boolean;
  created_at: string;
}

export const RenderVoucher = ({
  voucher,
  quantity,
}: {
  voucher: Voucher;
  quantity: number;
}) => {
  const handleRequest = () => {};
  return (
    <div className=" p-4 border shadow rounded-xl w-full h-48 flex-row flex justify-between">
      <div>
        <div>
          <h2 className="font-bold pt-2">{voucher.description}</h2>
          <p className="text-slate-500 text-sm">
            {voucher.denomination} Points
          </p>
        </div>
        <p>Quantity Available: {quantity}</p>
      </div>
      <button
        className={`p-4 bg-blue-500 font-extrabold text-white text-lg p-2 rounded-xl w-48 transform transition duration-300 hover:scale-110 h-full`}
        onClick={() => handleRequest()}
      >
        Request for more
      </button>
    </div>
  );
};

export const test = {
  id: 1,
  name: "Chaewon Flag",
  description: "Baddie asffff",
  voucher_cost: 10,
  is_available: true,
  stock: 10,
  product_image: "/images/chaewon-flag.jpg",
};

export const test2 = {
  id: 2,
  name: "Sana Flag",
  description: "Baddie asffff",
  voucher_cost: 30,
  is_available: false,
  stock: 0,
  product_image: "/images/sana-flag.jpg",
};
