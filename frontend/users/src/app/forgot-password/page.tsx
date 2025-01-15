"use client";

import { useState, useEffect } from "react";

import { Input } from "@nextui-org/input";

import { redirect, useSearchParams } from "next/navigation";

import Header from "../components/Header";
import {
  resetPasswordWithEmail,
  resetPasswordWithNumber,
} from "../login/actions";

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [useEmail, setUseEmail] = useState(true);

  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      if (message === "success") {
        setSuccess(true);
      } else {
        setErrorMessage(decodeURIComponent(message));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (useEmail) {
      if (!email) {
        redirect(
          `/forgot-password?message=${encodeURIComponent("Email is required")}`
        );
      }

      const formdata = new FormData();
      formdata.append("email", email);

      await resetPasswordWithEmail(formdata);
    } else {
      for (let i = 0; i < number.length; i++) {
        if (isNaN(parseInt(number[i]))) {
          redirect(
            `/forgot-password?message=${encodeURIComponent("Invalid number")}`
          );
        }
      }

      const formdata = new FormData();
      formdata.append("number", number);

      await resetPasswordWithNumber(formdata);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-blue-500 text-2xl">RESET PASSWORD</p>
        {success ? (
          <div></div>
        ) : (
          <form className="space-y-2" onSubmit={handleSubmit}>
            {useEmail ? (
              <Input
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            ) : (
              <Input
                label="Number"
                type="string"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            )}

            <div className="text-danger text-sm p-2">{errorMessage}</div>

            <button
              disabled={!number}
              type="submit"
              className="items-center flex w-full p-2"
            >
              <div className="p-2 border font-bold shadow-xl text-blue-700 rounded-xl w-full bg-orange-500 transition-transform transition scale-95 hover:scale-100 hover:border-orange hover:text-orange">
                SUBMIT
              </div>
            </button>
          </form>
        )}
        <div className="flex flex-row gap-4 justify-between w-full">
          <div>
            <a className="text-sm" href="/login">
              Login
            </a>
          </div>
          <button className="text-sm" onClick={() => setUseEmail(!useEmail)}>
            {useEmail ? "Use Number" : "Use Email"}
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
