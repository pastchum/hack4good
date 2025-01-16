import Header from "@/app/components/Header";
import { createClient } from "@/utils/supabase/server";
import { test } from "@/app/components/RenderProduct";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const product = test;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full border shadow rounded-xl p-10 w-full">
        <div className="flex flex-col justify-between">
          <div>
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
          <div>
            <p className="text-xl p-2">{product.description}</p>
            <p className="text-xl p-2">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
