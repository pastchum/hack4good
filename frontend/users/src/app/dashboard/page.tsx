import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import UserDetails from "../components/UserDetails";
import Header from "../components/Header";

import auctionlogo from "@/icons/auction-logo.png";
import productlogo from "@/icons/product-logo.png";
import transactionlogo from "@/icons/transaction-logo.png";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    return redirect("/login");
  }

  console.log(user);
  const { name, points } = user.user_metadata;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {/*Dashboard split */}
        <div className="flex flex-col md:flex-row justify-between space-y-2 p-10 w-full">
          <UserDetails userDetails={{ name: name, points: points }} />
          <Split />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

const Split = () => {
  return (
    <div className="md:w-1/2 w-full">
      <nav className="flex flex-col space-y-4">
        <a href="/available-products">
          <div className="border justify-between rounded-xl bg-blue-500 text-white font-bold text-2xl p-10 transition-transform transition scale-95 hover:scale-100 hover:shadow-xl shadow-md h-96 flex items-start overflow-hidden">
            Available Products
            <Image
              height={500}
              width={500}
              src={productlogo}
              alt="Available Products"
              className="object-cover"
            />
          </div>
        </a>
        <div className="flex flex-row space-x-4 m-2">
          <a href="/auction" className="w-1/2">
            <div className="border justify-between rounded-xl bg-blue-500 text-white font-bold text-2xl p-10 transition-transform transition scale-95 hover:scale-100 hover:shadow-xl shadow-md h-64 flex items-start">
              Auction
              <Image
                height={250}
                width={250}
                src={auctionlogo}
                alt="Auction"
                className="object-cover pl-100"
              />
            </div>
          </a>
          <a href="/transaction-history" className="w-1/2">
            <div className="border justify-between rounded-xl bg-blue-500 text-white font-bold text-2xl p-10 transition-transform transition scale-95 hover:scale-100 hover:shadow-xl shadow-md h-64 flex items-start">
              Transaction History
              <Image
                height={230}
                width={230}
                src={transactionlogo}
                alt="Transaction History"
                className="object-cover pl-100"
              />
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};
