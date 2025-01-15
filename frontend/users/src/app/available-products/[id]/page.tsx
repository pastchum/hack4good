import Header from "@/app/components/Header";
import { createClient } from "@/utils/supabase/server";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  //const product = await supabase.from("products").select("*").eq("id", id);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="h-full border shadow rounded-xl p-5 w-full">
        <h1 className="text-4xl font-bold">{id}</h1>
      </div>
    </div>
  );
}
