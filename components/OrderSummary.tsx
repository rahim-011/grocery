'use client'

import { useCartStore } from "@/store/cartStore";

export default function OrderSummary(){
    const {getTotalPrice,calculeTax,getSubTotal,getTotalItems} = useCartStore();
    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();
    const tax = calculeTax();
    const subTotal = getSubTotal();
    return(
        <div className="flex flex-col gap-4 sticky top-24">
            <h3 className="text-[1rem] text-veg-green font-semibold">Order Summary</h3>
            <div className="flex justify-between items-center">
                <span className="text-[0.8rem] text-black/60">Subtotal ({totalItems} items)</span>
                <span className="text-veg-green text-[0.8rem]">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
                <span  className="text-[0.8rem] text-black/60">Delivery</span>
                <span className="text-[0.8rem] font-medium text-green-500">Free</span>
            </div>
            <div className="flex justify-between items-center">
                <span  className="text-[0.8rem] text-black/60">Tax</span>
                <span className="text-veg-green text-[0.8rem]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-t-veg-green/20 pt-5">
                <span className="text-veg-green font-semibold text-[0.85rem]">Total</span>
                <span className="text-veg-green font-semibold text-[0.85rem]">${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    )
}