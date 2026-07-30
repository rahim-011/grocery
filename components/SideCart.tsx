'use client'

import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Empty from "./Empty";
import CartProducts from "./CartProducts";
import Link from "next/link";


export default function SideCart(){
    const {isCartOpen,closeCart,getTotalItems,getSubTotal} = useCartStore();
    const totalItems = getTotalItems();
    const subTotal = getSubTotal();
    return(
        <>
        {isCartOpen && 
            <div className="bg-white  flex flex-col  animate-in slide-in-from-right ease-in-out duration-300 fixed right-0 top-0 z-50 h-full w-[75%] md:w-[50%] lg:w-[35%]  ">
                <div className="flex items-center justify-between text-veg-green h-18 border-b border-black/15 p-3">
                    <div className="flex items-center gap-2">
                        <span><ShoppingBag size={18}/></span>
                        <span className="mr-5">Your Cart</span>
                        <span className="text-[0.7rem]">{totalItems} items</span>
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all ease-out duration-100"><X  onClick={()=>closeCart()}/></div>
                </div>
                {totalItems > 0 ?
                    <>
                        <CartProducts/>
                        <div className="flex flex-col gap-3 p-3 border-t w-full border-black/15">
                            <div className="flex items-center justify-between">
                                <span className="text-[0.75rem] text-black/60">Subtotal</span>
                                <span className="text-veg-green text-[0.75rem] font-medium">${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-black/60 text-[0.75rem]">Delievry</span>
                                <span className="text-[0.8rem] font-bold text-green-600">Free</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-veg-green font-bold">Total</span>
                                <span className={`font-bold text-veg-green`}>${subTotal.toFixed(2)}</span>
                            </div>
                            <Link href='/checkout' className="text-white font-bold w-full p-2.5 rounded-2xl bg-orange-500 flex items-center justify-center text-[0.9rem] gap-2 cursor-pointer hover:bg-orange-600" onClick={()=>closeCart()}>Proceed to Checkout <ArrowRight size={16}/></Link>
                        </div> </> : <Empty/> 
                }
                
            </div>
        }</>
    )
        
}