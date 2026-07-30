
import ShowProducts from "@/components/ShowProducts"
import SideFilter from "@/components/SideFilter"
import FoundedProducts from "@/components/FoundedProducts";

import { Home } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";







export default function Products(){

    
    return(
        <div className="flex flex-col md:gap-3 mt-2">
            <h2 className="flex place-items-center gap-2 text-veg-green text-[0.85rem]"><Link href='/'><Home size={16} className="opacity-55 hover:opacity-85 transition-all"/></Link><span className="text-[0.6rem]">/</span> All Products</h2>
            <div className="w-full flex gap-5 mt-3">
                <SideFilter/>
                <Suspense fallback={<LoadingSpinner />}>
                    <div className="flex flex-col gap-5 pt-8 w-full">
                        <FoundedProducts/>
                        <ShowProducts limit={null} category={null} mainProductId=""/>
                    </div>
                </Suspense>
            </div>
        </div>
    )
}