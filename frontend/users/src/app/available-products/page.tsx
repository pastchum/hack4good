"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";
import ProductFilter, { FilterDetails } from "../components/ProductFilter";
import {
  Product,
  RenderProduct,
  test,
  test2,
} from "../components/RenderProduct";

export default function AvailableProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/items`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok && data.success) {
          setProducts(data.data);
          setVisibleProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts().then(() => console.log(products));
  }, []);

  useEffect(() => {
    setVisibleProducts(
      products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(selectedFilters.search.toLowerCase()) &&
          product.voucher_cost >= selectedFilters.priceRange[0] &&
          product.voucher_cost <= selectedFilters.priceRange[1] &&
          (selectedFilters.selectedKeys.has("Available") &&
          !selectedFilters.selectedKeys.has("Out of Stock")
            ? product.is_available
            : !selectedFilters.selectedKeys.has("Available") &&
              selectedFilters.selectedKeys.has("Out of Stock")
            ? !product.is_available
            : true)
      )
    );
  }, [selectedFilters, products]);

  const handleSelectionChange = (newSelection: FilterDetails) => {
    setSelectedFilters(newSelection);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex md:flex-row flex-col-reverse space-x-4 m-2 h-full">
          {/* sidebar */}
          <ProductFilter onSelectionChange={handleSelectionChange} />
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
