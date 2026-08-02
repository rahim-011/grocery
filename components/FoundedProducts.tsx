'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FiltersBtn from "@/components/FiltersBtn";
import { useFilterStore } from "@/store/filterStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function FoundedProducts(){
    const items = [
  { value: "newest", label: "Newest" },
  { value: "high-to-low", label: "Price High → Low" },
  { value: "low-to-high", label: "Price Low → High" },
  { value: "top-rated", label: "Top Rated" },
  { value: "a-to-z", label: "A → Z" }, 
];
    const {categoryQuery,foundedProducts,sortType,setSortType} = useFilterStore();
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleFilterType = (value:string | null) =>{
        const params = new URLSearchParams(searchParams);
        if (value){
            params.set('sortedBy',value);
            router.push(`${pathname}?${params.toString()}`);
            setSortType(value.toLowerCase())
        }
    }
    return(
         <div className="flex flex-col gap-3 md:justify-between  w-full">
            <div className="flex flex-col">
                <h1 className="text-veg-green font-bold text-2xl">{categoryQuery ||'All Products'}</h1>
                <span className="text-black/70 text-[0.8rem]">{foundedProducts} products found</span>
            </div>
            <div className="flex flex-col gap-1" >
                <div className="lg:hidden">
                <FiltersBtn/>
                </div>
                <div>
                    <Select value={sortType || 'newest'} onValueChange={(value)=>handleFilterType(value)}>
                        <SelectTrigger className="w-[180px] border-veg-green/30 hover:border-veg-green/60 transition-all cursor-pointer">
                            <SelectValue placeholder="Newest" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none" alignItemWithTrigger >
                            <SelectGroup>
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                {item.label}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}