"use client";

import React from "react";
import Header from "../components/Header";

export default function Reports() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Top row: Header */}
      <Header />

      {/* Middle row: Main content */}
      <div className="row-start-2 w-full flex flex-col items-center">
        {/* Large centered heading */}
        <h1 className="text-6xl font-bold mb-12 text-center">REPORTS</h1>

        {/* 3 big buttons in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3 xl:w-1/2">
          {/* 1. Generate Weekly Requests */}
          <button
            onClick={() => alert("Generate Weekly Requests clicked!")}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            Generate Weekly Requests
          </button>

          {/* 2. Generate Inventory Summary */}
          <button
            onClick={() => alert("Generate Inventory Summary clicked!")}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center"
          >
            Generate Inventory Summary
          </button>

          {/* 3. Generate User Requests (full width in 2-col layout) */}
          <button
            onClick={() => alert("Generate User Requests clicked!")}
            className="rounded-xl bg-blue-500 text-white font-bold text-2xl h-48 p-6
                       transition-transform scale-95 hover:scale-100 hover:shadow-xl shadow-md 
                       flex items-center justify-center md:col-span-2"
          >
            Generate User Requests
          </button>
        </div>
      </div>

      {/* Bottom row (footer) if desired */}
    </div>
  );
}