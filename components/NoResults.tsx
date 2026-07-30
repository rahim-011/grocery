'use client'

import { useFilterStore } from "@/store/filterStore";
import { Search } from "lucide-react";
import Link from "next/link";




export default function NoResults(){
    const {searchQuery,clearSearchQuery} = useFilterStore();
    return(
        <div className="flex items-center justify-center flex-col gap-4 p-6 mt-10">
            <Search size={50} className="opacity-25"/>
            <h2 className="text-veg-green text-[1.2rem] font-bold">No Results found</h2>
            <p className="text-center text-black/50 text-[0.8rem] max-w-100">We couldn't find any products matching "{searchQuery}". Try a different search term</p>
            <Link href='/products' className="text-white font-medium px-4 py-3 rounded-[10px] bg-veg-green hover:brightness-115 transition-all text-[0.8rem]" onClick={()=>clearSearchQuery()}>Browse All Products</Link>
        </div>
    )
}