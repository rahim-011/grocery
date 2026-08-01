'use client'

import FilterBy from "./FilterBy";
import { X } from "lucide-react";
import {useFilterStore} from '../store/filterStore'

export default function SideFilter(){
    
    const {isFilterOpen,closeFilter} = useFilterStore();

    return(
        <>
            <div className="lg:block flex flex-col max-w-[250px] w-full hidden">
                <FilterBy/>
            </div>
            {isFilterOpen && 
            <div className="fixed bottom-0 left-0 z-50 flex h-[80vh] w-full flex-col rounded-t-2xl bg-white pt-5 lg:hidden animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between px-4 text-veg-green">
                    <h2 className="text-[1.1rem] font-bold">Filters</h2>
                    <X className="cursor-pointer transition-all hover:scale-105" size={18} onClick={()=>closeFilter()}/>
                </div>
                <hr className="mb-4 mt-5 border-veg-green/30"></hr>
                <div className="flex-1 overflow-y-auto px-4 pb-6">
                    <FilterBy/>
                </div>
            </div>}
        </>
    )
}