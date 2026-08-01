'use client'


import { useFilterStore } from "@/store/filterStore";
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function Searchbar(){
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams(); 
    const search = searchParams.get('search') || '';
    const {setSearchQuery} = useFilterStore();

    const handleSearch = (value:string) =>{
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()){
            params.set('search',value)
        }else{
            params.delete('search')
        }
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newUrl,{scroll:false})
        setSearchQuery(value);
    }
    
    
    return(
        <form className="relative w-full max-w-2xl" onSubmit={(e)=>e.preventDefault()}>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/60" size={16} />
            <input 
                placeholder="Search for grocerie..."
                type='text'
                name='search'
                id="search"
                maxLength={20}
                autoComplete="off"
                className="w-full pl-9 pr-4 py-2.5 rounded-3xl placeholder:text-[0.75rem] placeholder:text-text-darker/60 border border-selected/40 focus:border-selected/80 outline-none text-[0.85rem] text-black/80 bg-white"
                onChange={(e)=>handleSearch(e.target.value)}
                value={search}
            >
            </input>
        </form>
    )
    
}