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
            <div className="flex flex-col lg:hidden fixed bottom-0 left-0 z-50 pt-5 rounded-t-2xl bg-white w-full h-[80%] block animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center text-veg-green px-4">
                    <h2 className="font-bold text-[1.1rem] ">Filters</h2>
                    <X className="cursor-pointer hover:scale-105 transition-all" size={18} onClick={()=>closeFilter()}/>
                </div>
                <hr className="mt-5 text-veg-green/30 mb-4"></hr>
                <FilterBy/>
            </div>}
        </>
    )
}