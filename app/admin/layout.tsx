import AdminSideNav from "@/components/AdminSideNav";
import React from "react";



export default function layout({children}:Readonly<{children:React.ReactNode}>){
    return (
        <main className="flex gap-6 w-full mt-3 p-4">
            <AdminSideNav/>
            <div className="w-full">
                {children}
            </div>
        </main>
    )
}