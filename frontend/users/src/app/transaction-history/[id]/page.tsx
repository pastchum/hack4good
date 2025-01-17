"use client";

import Header from "@/app/components/Header";
import { Product } from "@/app/components/RenderProduct";
import { Transaction } from "@/app/components/RenderTransaction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    user_id: "",
    item_id: "",
    quantity: 0,
    status: "",
    cost: 0,
    is_preorder: false,
    created_at: "",
  });
  const [product, setProduct] = useState<Product>({
    id: 0,
    product_image: "",
    name: "",
    description: "",
    stock: 0,
    voucher_cost: 0,
    is_available: false,
  });

  const router = useRouter();

  async function fetchTransaction() {
    try {
      const { id } = await params;

      const response = await fetch(
        `http://localhost:3000/api/users/transactions/get/${id}`
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.data);
        setTransaction(data.data[0]);

        const productResponse = await fetch(
          `http://localhost:3000/api/users/items/${transaction.item_id}`
        );

        const productData = await productResponse.json();
        if (productResponse.ok && productData.success) {
          setProduct(productData.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching product", error);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleCancel = async () => {
    console.log("Cancelling " + transaction.id);

    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/users/transactions/cancel/${transaction.id}`
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }
      setErrorMessage("");
      setSuccess(true);
      fetchTransaction();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full border shadow rounded-xl p-10 w-full">
        <div className="h-full flex flex-col md:flex-row gap-32">
          <div className="border rounded-xl p-5 flex flex-grow items-center justify-center flex-row md:flex-col gap-4 w-full md:w-1/2 text-4xl font-bold">
            TRANSACTION:
            <p className="text-2xl text-slate-500">{transaction.id}</p>
            {product.product_image ? (
              <a href={`/available-products/${transaction.item_id}`}>
                <Image
                  src={product.product_image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </a>
            ) : (
              <a
                href={`/available-products/${transaction.item_id}`}
                className="h-full text-lg flex justify-center items-center"
              >
                Image not found
              </a>
            )}
          </div>
          <div className="justify-center flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-bold">Products Bought</p>
              <p className="text-slate-500 text-sm pl-2">{product.name}</p>
            </div>
            <div>
              <p className="font-bold">Cost</p>
              <p className="text-slate-500 text-sm pl-2">
                {transaction.cost} Points
              </p>
            </div>
            <div className="font-bold">
              Type of Purchase
              <p
                className={`${
                  transaction.is_preorder ? "text-blue-500" : "text-orange-500"
                } text-sm font-normal pl-2`}
              >
                {transaction.is_preorder ? "Purchased" : "Pre-order"}
              </p>
            </div>
            <div className="font-bold text-sm">
              Quantity
              <p className="text-slate-500 pl-2 font-normal">
                {transaction.quantity}
              </p>
              <div className="font-bold mt-4">
                Status
                <p
                  className={`${
                    transaction.status == "completed"
                      ? "bg-blue-500"
                      : transaction.status == "cancelled" ||
                        transaction.status == "rejected"
                      ? "text-danger"
                      : "text-orange-500"
                  } text-sm font-normal pl-2`}
                >
                  {transaction.status}
                </p>
              </div>
              <div className="text-slate-700 mt-5 font-bold p-2 border rounded-xl flex-row flex justify-between">
                <button
                  className={`${
                    transaction.status == "completed" ||
                    transaction.status == "cancelled" ||
                    transaction.status == "rejected"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  } font-extrabold text-white text-lg p-2 rounded-xl w-full transform transition duration-300 hover:scale-110`}
                  onClick={
                    transaction.status == "completed" ||
                    transaction.status == "cancelled" ||
                    transaction.status == "rejected"
                      ? () =>
                          router.push(
                            `/available-products/${transaction.item_id}`
                          )
                      : () => handleCancel()
                  }
                >
                  {transaction.status == "completed" ||
                  transaction.status == "cancelled" ||
                  transaction.status == "rejected"
                    ? "View Product"
                    : "Cancel"}
                </button>
              </div>
              {errorMessage}
              {success && <p className="text-blue-500">Request successful.</p>}
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
