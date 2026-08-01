
import ShowProducts from "@/components/ShowProducts"
import SideFilter from "@/components/SideFilter"
import FoundedProducts from "@/components/FoundedProducts";

import { Home } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";







export default function Products(){

    
    return(
        <div className="mt-2 flex flex-col md:gap-3">
            <h2 className="flex items-center gap-2 text-[0.85rem] text-veg-green"><Link href='/'><Home size={16} className="opacity-55 transition-all hover:opacity-85"/></Link><span className="text-[0.6rem]">/</span> All Products</h2>
            <div className="mt-3 flex w-full flex-col gap-5 lg:flex-row">
                <Suspense fallback={<LoadingSpinner />}>
                    <SideFilter/>
                    <div className="flex w-full flex-col gap-5 pt-0 lg:pt-8">
                        <FoundedProducts/>
                        <ShowProducts limit={null} category={null} mainProductId=""/>
                    </div>
                </Suspense>
            </div>
        </div>
    )
}