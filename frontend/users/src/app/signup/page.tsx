"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import Image from "next/image";

import eyeClosedIcon from "@/icons/eye-closed.png";
import eyeIcon from "@/icons/eye-open.png";
import { signup } from "../login/actions";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (password && passwordCheck) {
      setPasswordMatch(password === passwordCheck);
    } else {
      setPasswordMatch(true);
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("name", name);
    formdata.append("user", "resident");
    formdata.append("points", "0");

    signup(formdata);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-blue-500 text-2xl">USER SIGNUP</p>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            value={password}
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
          <Input
            value={passwordCheck}
            label="Re-enter Password"
            type={visible ? "text" : "password"}
            onChange={(e) => setPasswordCheck(e.target.value)}
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
          <div
            className={`text-sm p-2 ${
              passwordMatch ? `text-white` : `text-red-500`
            }`}
          >
            {passwordMatch ? "" : "Passwords do not match"}
          </div>
          <div className="text-danger text-sm p-2">{errorMessage}</div>
          <button
            disabled={
              password.length < 6 || passwordCheck.length < 6 || !passwordMatch
            }
            type="submit"
            className="items-center flex w-full p-2"
          >
            <div className="p-2 border font-bold shadow-xl text-blue-700 rounded-xl w-full bg-orange-500 transition-transform transition scale-95 hover:scale-100 hover:border-orange hover:text-orange">
              SUBMIT
            </div>
          </button>
        </form>
        <div>
          <a className="text-sm" href="/login">
            Have an account?
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
