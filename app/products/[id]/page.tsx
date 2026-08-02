

import ShowProduct from "@/components/Product";
import ShowProducts from "@/components/ShowProducts";
import { getProductById } from "@/lib/products";
import { ArrowRight, HomeIcon } from "lucide-react";
import Link from "next/link";






export default async function Product({params}:{params:Promise<{id:string}>}){
    const id = (await params).id
    const mainProduct = await getProductById(id);
    return(
        <div className="md:p-7 lg:p-10 p-1 flex flex-col gap-5">
            <div className="flex place-items-center-safe gap-2 text-black/55 text-[0.65rem] md:text-[0.8rem]">
                <HomeIcon  size={16} className="hover:text-black/75 transition-all cursor-pointer mb-1"/> <span className="text-[0.6rem]">/</span>
                <Link href='/products' className="hover:text-black/75 transition-all cursor-pointer">Products</Link> 
                <span className="text-[0.6rem]">/</span>
                <Link href={`/products?categorie=${mainProduct?.category}`} className="hover:text-black/75 transition-all cursor-pointer">{mainProduct?.category}</Link><span className="text-[0.6rem]">/</span>
                <span className="text-veg-green  transition-all">{mainProduct?.title} {mainProduct?.amount}</span>
            </div>
            <ShowProduct mainProduct={mainProduct}/>
            <div className="flex items-center justify-between mt-7">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl text-veg-green font-semibold">Related Products</h2>
                    <span className="text-[0.8rem] text-black/65">More from {mainProduct?.category}</span>
                </div>
                <Link href={`/products?categorie=${mainProduct?.category}`} className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 transition-all text-[0.8rem] cursor-pointer">View All <ArrowRight size={15}/></Link>
            </div>
            <div >
                <ShowProducts limit={4} category={mainProduct?.category ?? null} mainProductId={mainProduct?.id ?? null}/>
            </div>
        </div>
    )
}