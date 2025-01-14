"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  return (
    <div className="p-10">
      <p className="text-2xl font-bold text-blue-500">
        Sorry, something went wrong
      </p>
      <p className="text-lg text-slate-400">{errorMessage}</p>
      <a
        className="p-2 text-sm text-slate-400 hover:text-orange-500"
        href="/login"
      >
        Back to login page
      </a>
    </div>
  );
}
