"use client";

import Header from "@/app/components/Header";
import { Product } from "@/app/components/RenderProduct";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [product, setProduct] = useState<Product>({
    id: 0,
    product_image: "",
    name: "",
    description: "",
    stock: 0,
    voucher_cost: 0,
    is_available: false,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { id } = await params;

        const response = await fetch(
          `http://localhost:3000/api/users/items/${id}`
        );
        const data = await response.json();
        if (data.success) {
          console.log(data.data);
          setProduct(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      }
    }
    fetchProduct();
  }, []);

  const handlePurchase = async () => {
    console.log("Purchasing");

    if (quantity == 0) {
      setErrorMessage("Please select a quantity");
      return;
    }

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const id = user?.id;

      if (!id) {
        throw new Error("User not logged in");
      }
      const jsonData = JSON.stringify({
        userId: id,
        itemId: product.id,
        quantity: quantity,
        isPreorder: !product.is_available,
      });
      console.log(jsonData);
      const response = await fetch(
        "http://localhost:3000/api/users/items/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }
      setErrorMessage("");
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      0,
      Math.min(Number.parseInt(e.target.value), product.stock)
    );
    setQuantity(value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full border shadow rounded-xl p-10 w-full">
        <div className="h-full flex flex-col md:flex-row gap-32">
          <div className="border rounded-xl p-5 flex flex-grow items-center justify-center flex-col gap-4 w-1/2">
            <h1 className="w-full items-center text-4xl font-bold p-2">
              {product.name}
            </h1>
            {product.product_image ? (
              <Image
                src={product.product_image}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain"
              />
            ) : (
              <div className="h-full flex justify-center items-center">
                Image not found
              </div>
            )}
          </div>
          <div className="justify-center flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-bold">Product Description</p>
              <p className="text-xl p-2">{product.description}</p>
            </div>
            <div>
              <p className="font-bold">Price</p>
              <p className="text-xl p-2">{product.voucher_cost} Points</p>
            </div>
            <div>
              <p
                className={`${
                  product.is_available ? "text-blue-500" : "text-danger"
                } text-xl p-2`}
              >
                {product.is_available ? "Available" : "Out of Stock"}
              </p>
            </div>
            <div className="text-danger text-sm">
              <p className="text-slate-500"> Quantity </p>
              <Input
                className="w-20"
                type="number"
                onChange={handleChangeQuantity}
                value={quantity.toString()}
              />
              {errorMessage}
              {success && <p className="text-blue-500">Request successful.</p>}
            </div>
            <br />
            <button
              className={`${
                product.is_available ? "bg-blue-500" : "bg-orange-500"
              } font-extrabold text-white text-lg p-2 rounded-xl w-1/4 transform transition duration-300 hover:scale-110`}
              onClick={() => handlePurchase()}
            >
              {product.is_available ? "Buy" : "Pre-Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
