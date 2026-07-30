'use client'

import { cn } from "@/lib/utils"
import { Products } from "@prisma/client"
import { X,SquarePen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Overlay from "./Overlay"
import Confirm from "./Confirm"


export default function AdminProduct({products}:{products:Products[]}){
    const [isConfirmOpen,setIsOpenConfirm] = useState<boolean>(false);
    const [productId,setProductId] = useState<string>('');

    return(
        <>
        {isConfirmOpen && 
        <div className="flex items-center justify-center ">
            <Overlay showConfirm={isConfirmOpen} onCloseConfirm={()=>setIsOpenConfirm(false)}/>
            <Confirm productId={productId} onCloseConfirm={()=>setIsOpenConfirm(false)} type="product"/>
        </div>
        }
        {products.map((product,index)=>{
            const productAmount = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
            const amountClass = cn(productAmount === 'Out of stock ' ? 'bg-red-400 text-red-600' : 'bg-green-300/50 text-green-600');
            return(
                <div className="p-5 grid grid-cols-[350px_1fr_auto] items-center border-t border-t-black/10" key={index}>
                    <div className="flex items-center gap-5 p-2">
                        <div className="w-auto h-auto">
                            <Image 
                                alt={product.title}
                                src={product.imageSrc}
                                width={25}
                                height={25}
                                className="h-auto w-auto rounded-[10px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[0.85rem] font-semibold">{product.title} {product.amount}</span>
                            <span className="text-[0.65rem] text-black/50">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex gap-24 items-center">
                        <span className="text-veg-green">${product.price.toFixed(2) || product.oldPrice?.toFixed(2)}</span>
                        <span className={`text-[0.7rem] font-semibold px-2 py-1 rounded-2xl ${amountClass}`}>{productAmount}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link className="p-2 rounded-[10px] bg-black/10 cursor-pointer" href={`/admin/products/${product.id}/edit`}><SquarePen size={16} className="hover:text-orange-700 transition-all"/></Link>
                        <button className="p-2 rounded-[10px] bg-black/10 cursor-pointer text-black/70"><X size={16} className="hover:text-red-500 transition-all text-black/70" onClick={()=>{setIsOpenConfirm(true);setProductId(product.id)}}/></button>
                    </div>
                </div>
            )
        })}
        </>
    )
}