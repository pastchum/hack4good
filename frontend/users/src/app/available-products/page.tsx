"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";
import Filter, { FilterDetails } from "../components/Filter";
import {
  Product,
  RenderProduct,
  test,
  test2,
} from "../components/RenderProduct";

interface AvailableProductsPageProps {
  products: Product[];
}

export default function AvailableProductsPage() {
  const [products, setProducts] = useState<Product[]>([test, test2]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [selectedFilters, setSelectedFilters] = useState<FilterDetails>({
    selectedKeys: new Set(["Available"]),
    priceRange: [0, 100],
    search: "",
  });

  useEffect(() => {
    setVisibleProducts(
      products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(selectedFilters.search.toLowerCase()) &&
          product.price >= selectedFilters.priceRange[0] &&
          product.price <= selectedFilters.priceRange[1] &&
          (selectedFilters.selectedKeys.has("Available") &&
          !selectedFilters.selectedKeys.has("Out of Stock")
            ? product.available
            : !selectedFilters.selectedKeys.has("Available") &&
              selectedFilters.selectedKeys.has("Out of Stock")
            ? !product.available
            : true)
      )
    );
  }, [selectedFilters]);

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
          <div className="m-2 flex flex-col flex-wrap w-4/5 border shadow rounded-xl p-2 h-full">
            <ul>
              {visibleProducts.map((product) => (
                <a href={`/available-products/${product.id}`} key={product.id}>
                  <RenderProduct product={product} />
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
