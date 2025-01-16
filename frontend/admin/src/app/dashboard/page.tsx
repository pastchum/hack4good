import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import UserDetails from "../components/UserDetails";
import Header from "../components/Header";

import manageUsersLogo from "@/icons/manage-users-logo.png";
import voucherTasksLogo from "@/icons/voucher-tasks-logo.png";
import inventoryLogo from "@/icons/inventory-logo.png";
import reportsLogo from "@/icons/reports-logo.png";

export default async function AdminDashboard() {
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
        {/* Admin Dashboard split */}
        <div className="flex flex-col md:flex-row justify-between space-y-2 p-10 w-full">
          <UserDetails userDetails={{ name: name }} />
          <AdminSplit />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

const AdminSplit = () => {
    return (
      <div className="md:w-1/2 w-full">
        {/* Make the parent a 2x2 grid with spacing */}
        <nav className="grid grid-cols-2 gap-6">
          {/* Card #1: Manage Users */}
          <a href="/users">
            <div className="
              rounded-xl 
              bg-blue-500 
              text-white 
              font-bold 
              text-2xl 
              p-6 
              transition-transform 
              scale-95 
              hover:scale-100 
              hover:shadow-xl 
              shadow-md 
              flex 
              flex-col 
              items-center 
              justify-center 
              aspect-square
            ">
              <span className="mb-4">Manage Users</span>
              <Image
                src={manageUsersLogo}
                alt="Manage Users"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </a>
  
          {/* Card #2: Voucher Tasks */}
          <a href="/voucher-requests">
            <div className="
              rounded-xl 
              bg-blue-500 
              text-white 
              font-bold 
              text-2xl 
              p-6 
              transition-transform 
              scale-95 
              hover:scale-100 
              hover:shadow-xl 
              shadow-md 
              flex 
              flex-col 
              items-center 
              justify-center 
              aspect-square
            ">
              <span className="mb-4">Voucher Tasks</span>
              <Image
                src={voucherTasksLogo}
                alt="Voucher Tasks"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </a>
  
          {/* Card #3: Inventory */}
          <a href="/inventory">
            <div className="
              rounded-xl 
              bg-blue-500 
              text-white 
              font-bold 
              text-2xl 
              p-6 
              transition-transform 
              scale-95 
              hover:scale-100 
              hover:shadow-xl 
              shadow-md 
              flex 
              flex-col 
              items-center 
              justify-center 
              aspect-square
            ">
              <span className="mb-4">Inventory</span>
              <Image
                src={inventoryLogo}
                alt="Inventory"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </a>
  
          {/* Card #4: Reports */}
          <a href="/reports">
            <div className="
              rounded-xl 
              bg-blue-500 
              text-white 
              font-bold 
              text-2xl 
              p-6 
              transition-transform 
              scale-95 
              hover:scale-100 
              hover:shadow-xl 
              shadow-md 
              flex 
              flex-col 
              items-center 
              justify-center 
              aspect-square
            ">
              <span className="mb-4">Reports</span>
              <Image
                src={reportsLogo}
                alt="Reports"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </a>
        </nav>
      </div>
    );
  };