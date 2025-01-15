"use client";

import { useState, useEffect } from "react";

import { Input } from "@nextui-org/input";
import Image from "next/image";

import { useSearchParams } from "next/navigation";

import eyeClosedIcon from "@/icons/eye-closed.png";
import eyeIcon from "@/icons/eye-open.png";
import { login } from "./actions";
import Header from "../components/Header";

export default function Login() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    await login(formdata);
  };

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-blue-500 text-2xl">USER LOGIN</p>
        <form className="space-y-2" onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type={visible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button onClick={() => setVisible(!visible)}>
                {visible ? (
                  <Image
                    src={eyeClosedIcon}
                    className="w-5 h-5"
                    alt="Invisible"
                  ></Image>
                ) : (
                  <Image
                    src={eyeIcon}
                    className="w-10 h-10"
                    alt="Visible"
                  ></Image>
                )}
              </button>
            }
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
            <a className="text-sm" href="/signup">
              Request for account
            </a>
          </div>
          <div>
            <a className="text-sm" href="/forgot-password">
              Forgot password?
            </a>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
