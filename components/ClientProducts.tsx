'use client'

import { useFilterStore } from "@/store/filterStore";
import { Products } from "@prisma/client";
import ProductCart from "./ProductCart";
import { calculateDiscount } from "@/lib/utils";
import NoResults from "./NoResults";
import { useEffect } from "react";


export default function ClientProducts({products,gridClass}:{products:Products[],gridClass:string}){
    const {filterProducts,setFoundedProducts} = useFilterStore();
    const filtredProducts = filterProducts(products);
    useEffect(()=>{
        setFoundedProducts(filtredProducts.length);
    },[filtredProducts.length,setFoundedProducts])
    return(
        <div className="flex flex-col md:gap-3 mt-2">
            {filtredProducts && filtredProducts.length > 0 ? (<div className={`${gridClass}  gap-3`}>
            {filtredProducts.map(product=>{
                const discount = calculateDiscount(product.oldPrice,product.price)
                return(
                    <ProductCart discount={discount} product={product} key={product.id}/>
                )})}
            </div>) : 
            (<NoResults/>)}
        </div>
    )
}