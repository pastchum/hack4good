import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  if (supabase.auth.getUser() !== null) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
