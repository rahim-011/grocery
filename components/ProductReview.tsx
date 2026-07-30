'use client'


import { useCartStore } from "@/store/cartStore";
import Image from "next/image";


export default function ProductReview(){

    const {cartProducts} = useCartStore();
    return(
        <div className="flex flex-col gap-3">
            {cartProducts.map((cartProduct,index)=>{
                const {quantity,product} = cartProduct;
                const productTotal = quantity * product.price;
                return(
                    <div className="flex justify-between items-center" key={index}>
                        <div className="flex items-center gap-4">
                            <div className="w-auto h-auto">
                                <Image
                                src={product.imageSrc} 
                                width={50}
                                height={50}
                                alt={product.title}
                                className="object-cover"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[0.8rem] text-veg-green">{product.title} {product.amount}</span>
                                <span className="text-[0.75rem] text-black/60">Qty: {quantity}</span>
                            </div>
                        </div>
                        <div className="self-center text-veg-green font-semibold text-[0.8rem]">
                            ${productTotal.toFixed(2)}
                        </div>
                    </div>
                )})}
        </div>
    )
}