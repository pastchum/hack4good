"use client";

import { useState, useEffect } from "react";

import { Input } from "@nextui-org/input";

import { useSearchParams } from "next/navigation";

import Header from "../components/Header";

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  const [number, setNumber] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("number", number);

    await resetPassword(formdata);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-blue-500 text-2xl">RESET PASSWORD</p>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            label="Number"
            type="Number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />

          <div className="text-danger text-sm p-2">{errorMessage}</div>

          <button type="submit" className="items-center flex w-full p-2">
            <div className="p-2 border font-bold shadow-xl text-blue-700 rounded-xl w-full bg-orange-500 transition-transform transition scale-95 hover:scale-100 hover:border-orange hover:text-orange">
              SUBMIT
            </div>
          </button>
        </form>
        <div className="flex flex-col gap-4 justify-between">
          <div>
            <a className="text-sm" href="/login">
              Login
            </a>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
