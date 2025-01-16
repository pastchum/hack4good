import Image from "next/image";
import React from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  voucher_cost: number;
  stock: number;
  available: boolean;
  product_image: string;
}

export const RenderProduct = ({ product }: { product: Product }) => {
  return (
    <div className="m-2 p-4 border shadow rounded-xl w-64 h-80 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <Image
          src={product.product_image}
          alt={product.name}
          width={250}
          height={100}
          className="object-contain"
        />
      </div>
      <h2 className="font-bold pt-2">{product.name}</h2>
      <p className="text-slate-500 text-sm">{product.voucher_cost} Points</p>
      <p
        className={`${
          product.available ? "text-blue-500" : "text-danger"
        } text-sm`}
      >
        {product.available ? "In stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export const test = {
  id: 1,
  name: "Chaewon Flag",
  description: "Baddie asffff",
  voucher_cost: 10,
  available: true,
  stock: 10,
  product_image: "/images/chaewon-flag.jpg",
};

export const test2 = {
  id: 2,
  name: "Sana Flag",
  description: "Baddie asffff",
  voucher_cost: 30,
  available: false,
  stock: 0,
  product_image: "/images/sana-flag.jpg",
};
