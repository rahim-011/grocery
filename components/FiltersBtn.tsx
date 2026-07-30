'use client'

import { SlidersHorizontal } from "lucide-react"
import { useFilterStore } from "@/store/filterStore"


export default function FiltersBtn(){
    const {openFilter} = useFilterStore();
    return(
        <div className="cursor-pointer w-full ">
            <button className="flex items-center gap-2 text-veg-green text-[0.85rem] border border-veg-green/30 p-2 rounded-[8px] hover:border-veg-green/60 cursor-pointer w-full transition-all" onClick={()=>openFilter()}><SlidersHorizontal size={18}/> Filters</button>
        </div>
    )
}