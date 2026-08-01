
import {getProducts} from "@/lib/products";
import { cn } from "@/lib/utils";
import { JSX } from "react/jsx-runtime";
import ClientProducts from "./ClientProducts";




export default async function ShowProducts({limit,category,mainProductId}:{limit:number|null,category:string|null,mainProductId:string}):Promise<JSX.Element>{
    const products = await getProducts(limit,category);
    const suggestProduct  = category !== null ? products.filter(product => product.id !== mainProductId ) : [];
    const gridClass = cn('grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3', limit && limit > 12 ? 'xl:grid-cols-4' : 'lg:grid-cols-4 xl:grid-cols-5');
    return(
        <ClientProducts products={category !== null ? suggestProduct : products} gridClass={gridClass}/>
    )
}