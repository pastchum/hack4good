import Header from "@/app/components/Header";
import { createClient } from "@/utils/supabase/server";
import { test, test2 } from "@/app/components/RenderProduct";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const product = test2;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full border shadow rounded-xl p-10 w-full">
        <div className="flex flex-col md:flex-row gap-32">
          <div className="flex flex-grow items-center justify-center flex-col gap-4 w-1/2">
            <h1 className="w-full items-center text-4xl font-bold p-2">
              {product.name}
            </h1>
            <Image
              src={product.product_image}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
          <div className="justify-center flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-bold">Product Description</p>
              <p className="text-xl p-2">{product.description}</p>
            </div>
            <div>
              <p className="font-bold">Price</p>
              <p className="text-xl p-2">{product.price} Points</p>
            </div>
            <div>
              <p
                className={`${
                  product.available ? "text-blue-500" : "text-danger"
                } text-xl p-2`}
              >
                {product.available ? "Available" : "Out of Stock"}
              </p>
            </div>
            <button
              className={`${
                product.available ? "bg-blue-500" : "bg-orange-500"
              } font-extrabold text-white text-lg p-2 rounded-xl w-1/4 transform transition duration-300 hover:scale-110`}
            >
              {product.available ? "Buy" : "Pre-Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
