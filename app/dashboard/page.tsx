"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Only redirect AFTER session is fully loaded and definitely unauthenticated
  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      router.replace("/signup");
    }
  }, [status, router]);

  // ✅ While loading, show a loader
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;
  }

  // ✅ This condition is now safe, but may not even be needed
  if (!session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
