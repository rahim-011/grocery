'use client'


import { Products } from "@prisma/client";
import { JSX } from "react/jsx-runtime";
import { PlusIcon, Star } from "lucide-react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";


export const inter = Inter({weight:'800'})

export default function ProductCart ({product,discount}:{product:Products,discount:number}):JSX.Element{

    const {addToCart} = useCartStore();
    const handleCartProducts  = () =>{
        addToCart(product,1)
    }
    const router = useRouter();
    return(
        <div key={product.id} className="flex flex-col gap-3 bg-emerald-50/40 p-4 rounded-2xl shadow-sm border border-black/5" onClick={()=>{router.push(`/products/${product.id}`);window.scroll(0,0)}}>
            <div className="text-[0.65rem] text-white font-semibold bg-orange-500 self-start rounded-full px-2.5 py-1">{discount}% OFF</div>
            <div className="self-center py-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-200 flex-1 flex">
                <Image alt={product.title}
                    className="object-contain"
                    src={product.imageSrc}
                    width={110}
                    height={110}
                    style={{ height: '100%', width: 'auto' }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[0.85rem] font-medium text-black/70">{product.title} {product.amount}</span>
                <div className="flex items-center gap-1">
                    <Star size={13} className="text-yellow-500 fill-current"/>
                    <span className="text-[0.7rem] font-semibold text-black/70">4.5</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <div className="flex items-baseline gap-1.5">
                        <span className={`font-bold text-[1rem] ${inter.className} antialiased`}>${product.price}</span>
                        {product.oldPrice &&<span className="line-through text-[0.7rem] text-black/50">${product.oldPrice}</span>}
                    </div>
                    <button className="bg-orange-500 hover:opacity-90 p-2 cursor-pointer rounded-full text-white transition-opacity" onClick={handleCartProducts}>
                        <PlusIcon size={14}/>
                    </button>
                </div>
            </div>
        </div>
    )
}