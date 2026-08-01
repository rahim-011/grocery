import AdminSideNav from "@/components/AdminSideNav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="mt-3 flex w-full gap-6 p-4">
      <AdminSideNav />
      <div className="w-full">{children}</div>
    </main>
  );
}