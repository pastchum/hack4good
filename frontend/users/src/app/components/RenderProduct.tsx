import Image from "next/image";
import React from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  voucher_cost: number;
  stock: number;
  is_available: boolean;
  product_image: string;
}

export const RenderProduct = ({ product }: { product: Product }) => {
  return (
    <div className="m-2 p-4 border shadow rounded-xl w-full h-80 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        {product.product_image ? (
          <Image
            src={product.product_image}
            alt={product.name}
            width={250}
            height={100}
            className="object-contain"
          />
        ) : (
          <div>Image not found</div>
        )}
      </div>
      <h2 className="font-bold pt-2">{product.name}</h2>
      <p className="text-slate-500 text-sm">{product.voucher_cost} Points</p>
      <p
        className={`${
          product.is_available ? "text-blue-500" : "text-danger"
        } text-sm`}
      >
        {product.is_available ? "In stock" : "Out of Stock"}
      </p>
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
