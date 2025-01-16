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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
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
      setLoading(false);
    }
    fetchProducts();
  }, [selectedFilters]);

  const handleSelectionChange = (newSelection: FilterDetails) => {
    setSelectedFilters(newSelection);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex flex-row space-x-4 m-2 h-full">
          {/* sidebar */}
          <Filter onSelectionChange={handleSelectionChange} />
          {/* main content */}
          <div className="m-2 border shadow rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center w-full h-48 text-2xl font-bold text-blue-500">
                <p>Loading...</p>
              </div>
            ) : (
              visibleProducts.map((product) => (
                <a
                  href={`/available-products/${product.id}`}
                  key={product.id}
                  className="w-full h-48"
                >
                  <RenderProduct product={product} />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
