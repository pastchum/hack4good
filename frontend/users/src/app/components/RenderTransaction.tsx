"use client";

export type Transaction = {
  id: string;
  user_id: string;
  item_id: string;
  quantity: number;
  status: string;
  cost: number;
  is_preorder: boolean;
  created_at: string;
};

type TransactionProps = {
  transaction: Transaction;
};

export default function RenderTransaction({ transaction }: TransactionProps) {
  const date = new Date(transaction?.created_at);
  const dateString = date.toLocaleString();
  return (
    <div key={transaction?.id} className="m-2 p-4 border rounded-xl shadow">
      <div className="font-bold text-2xl flex-row flex items-center gap-4">
        Transaction ID:{" "}
        <p className="text-xl text-slate-500">{transaction?.id}</p>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <p>Date: </p>
          <p>Cost: </p>
          <p>Status: </p>
        </div>
        <div>
          <p>{dateString}</p>
          <p>{transaction?.cost}</p>
          <p
            className={`${
              transaction?.status == "pending"
                ? "text-orange-500"
                : transaction?.status == "completed"
                ? "text-blue-500"
                : "text-danger-500"
            }`}
          >
            {transaction?.status}
          </p>
        </div>
      </div>
    </div>
  );
}
