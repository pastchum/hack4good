"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";
import Filter, { FilterDetails } from "../components/Filter";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  product_image: string;
}

interface AvailableProductsPageProps {
  products: Product[];
}

export default function AvailableProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterDetails>({
    selectedKeys: new Set(["Available"]),
    priceRange: [0, 100],
    search: "",
  });

  /*useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    }; 

    fetchProducts();
  }, [selectedFilters]);*/

  const handleSelectionChange = (newSelection: FilterDetails) => {
    setSelectedFilters(newSelection);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full">
        <h1 className="text-4xl font-bold">Available Products</h1>
        <div className="flex flex-row space-x-4 m-2 h-full">
          {/* sidebar */}
          <Filter onSelectionChange={handleSelectionChange} />
          {/* main content */}
          <div className="m-2 flex flex-row flex-wrap w-4/5 border shadow rounded-xl p-2 h-full">
            {/*<ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
