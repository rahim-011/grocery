'use client'


import { useFilterStore } from "@/store/filterStore";
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


export default function Searchbar(){
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams(); 
    const [search,setSearch] = useState<string>(searchParams.get('search')||'');
    const {setSearchQuery} = useFilterStore();

    useEffect(()=>{
        setSearch(searchParams.get('search')||'')
    },[searchParams])
    const handleSearch = (value:string) =>{
        setSearch(value);
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
        <form className="w-full max-w-2xl" onSubmit={(e)=>e.preventDefault()}>
            <input 
                placeholder="Search for grocerie..."
                type='text'
                name='search'
                id="search"
                maxLength={20}
                autoComplete="off"
                className="w-full relative px-6 py-2 rounded-3xl  placeholder:text-[0.75rem] placeholder:text-text-darker/60 border border-selected/40 focus-within:border focus-within:border-selected/80 outline-none text-[0.85rem] text-black/80  focus-within:bg-white"
                onChange={(e)=>handleSearch(e.target.value)}
                value={search}
            >
            </input>
            <Search className="absolute left top-[35%] text-black/70 hover:cursor-pointer pl-2" size={20}/>
        </form>
    )
    
}