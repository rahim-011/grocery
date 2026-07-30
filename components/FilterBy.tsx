import { categories } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useEffect, useState } from "react";


 


export default function FilterBy(){

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const {setCategoryQuery,setPrice,clearAllFilters,closeFilter} = useFilterStore();
    const [activeCategory,setActiveCategory] = useState<string>('All Categories');
    const [maxPrice,setMaxPrice] = useState<string>('');
    const [minPrice,setMinPrice] = useState<string>('');
    

    useEffect(()=>{
        const categoryFromUrl = searchParams.get('categorie') || 'All Categories';
        const minPriceFromUrl = searchParams.get('minPrice') || '';
        const maxPriceFromUrl = searchParams.get('maxPrice') || '';

        setActiveCategory(categoryFromUrl);
        setMinPrice(minPriceFromUrl);
        setMaxPrice(maxPriceFromUrl);

        setCategoryQuery(categoryFromUrl === 'All Categories' ? '' : categoryFromUrl);
        if (minPriceFromUrl) setPrice(minPriceFromUrl, 'minPrice');
        if (maxPriceFromUrl) setPrice(maxPriceFromUrl, 'maxPrice');
    },[searchParams, setCategoryQuery, setPrice])

    const handleCategoryFilter = (value:string) =>{
        const params = new URLSearchParams(searchParams);
        if (value.trim() && value !== 'All Categories'){
            params.set('categorie',value)
        }else{
            params.delete('categorie')
        }
        router.push(`${pathname}?${params.toString()}`,{scroll:false})
    }

    const handlePriceFilter = (value:string,type:string) =>{
        const params = new URLSearchParams(searchParams);

        if (value.trim()){
            if (type === 'maxPrice'){
                params.set('maxPrice',value)
            }
            else if (type === 'minPrice'){
                params.set('minPrice',value)
            }
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleClearFilters = () =>{
        setActiveCategory('All Categories');
        clearAllFilters();
        setMaxPrice('');
        setMinPrice('');
        const params = new URLSearchParams(searchParams);
        params.delete('categorie');
        params.delete('maxPrice');
        params.delete('minPrice');
        params.delete('sortedBy')

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newUrl) 
    }
    return(
        <div className="flex flex-col gap-4 p-3 rounded-2xl sticky top-24 md:overflow-scroll">
            <div className="flex flex-col gap-3 md:w-full">
                <h3 className="text-veg-green text-[0.8rem] font-bold">Categories</h3>
                <ul className="flex flex-col gap-1">
                    {categories.map((categorie,index) =>{
                        const selectionClass = cn(activeCategory == categorie ? 'bg-veg-green text-white hover:brightness(110)':'text-black/70 hover:text-black/85')
                    return(
                        <li key={index} className={`rounded-[7px] p-2 text-[0.9rem] cursor-pointer ${selectionClass} md:text-[0.8rem]`} onClick={()=>{handleCategoryFilter(categorie);setActiveCategory(categorie);closeFilter();window.scroll(0,0)}}> {categorie}</li>
                    )})}
                </ul>
            </div>
            <h3 className="text-[0.85rem] text-veg-green font-bold">Price Range</h3>
            <div className="flex items-center gap-2 w-full">
                <input type="number" id="min_price" name="min_price" placeholder="Min" min={0} className="p-1.5 border rounded-[8px] w-1/2 border-black/50 focus-within:border-veg-green outline-none" onChange={(e)=>handlePriceFilter(e.target.value,'minPrice')} value={minPrice}/>
                <span className="text-black/70">-</span>
                <input type="number" id="max_price" name="max_price" placeholder="Max" min={0} className="p-1.5 border rounded-[8px] w-1/2 border-black/50 focus-within:border-veg-green outline-none" onChange={(e)=>handlePriceFilter(e.target.value,'maxPrice')} value={maxPrice}/>
            </div>
            <button className="text-white text-[0.9rem] mt-4 bg-red-600 p-2 rounded-2xl hover:bg-red-600/75 transition-all cursor-pointer" onClick={handleClearFilters}>Clear All Filters</button>
        </div>
    )
}