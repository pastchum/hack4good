import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Link href="/voucher-requests">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Voucher Requests
          </button>
        </Link>
        <Link href="/inventory">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Inventory
          </button>
        </Link>
        <Link href="/users">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Users
          </button>
        </Link>
      </div>
    </div>
  );
}