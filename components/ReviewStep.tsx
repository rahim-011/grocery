'use client'

import { Check, LoaderCircle, Truck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import ProductReview from "./ProductReview";



export default function ReviewStep(){
    const {step,selectedAddress,paymentMethod} = useCheckoutStore();
    const {cartProducts,getTotalPrice,clearCartProducts} = useCartStore();
    const totalPrice = getTotalPrice();
    const {data:session} = useSession();
    const userId = session?.user.id;
    const addressId = selectedAddress?.id;
    const router = useRouter();

    const [loading,setLoading] = useState<boolean>(false);
    const handleOrder = async () =>{
        const toastId = toast.loading('Placing your order...');
        setLoading(true)
        if (paymentMethod === 'Cash on Delivery'){
            try{
                const response = await fetch('/api/routes/checkout/OrderByCash',{
                    body:JSON.stringify({userId,cartProducts,addressId}),
                    method: 'POST'
                });

                if (!response.ok){
                    toast.error('Cant add place your order',{id:toastId});
                    toast.dismiss(toastId);
                    return
                }

                const result = await response.json();
                toast.success(result.message,{id:toastId})
                clearCartProducts();

                router.push('/orders');
                router.refresh();
            }
            catch(error){
                toast.error('Network error',{id:toastId});
                toast.dismiss(toastId);
            }
            finally{
                setLoading(false)
            }
        }
        else if(paymentMethod === 'Credit / Debit Card'){
            try{
                const response = await fetch('/api/routes/checkout/OrderByCard',{
                    body: JSON.stringify({userId,cartProducts,addressId}),
                    method: 'POST'
                })

                const result = await response.json();
                if (result.checkoutUrl){
                    window.location.href = result.checkoutUrl;
                }else {
                    toast.error(result.error,{id:toastId})
                    toast.dismiss(toastId)
                }
            }
            catch(error){
                toast.error('Network error',{id: toastId})
                toast.dismiss(toastId);
            }
            finally{
                setLoading(false)
            }
        }
    }
    return(
        <>
        {step === 2 && <div className="flex flex-col gap-4 p-4 animate-in slide-in-from-bottom-10 transition-all duration-300">
            <h2 className="flex items-center gap-2 text-veg-green font-semibold mb-3"><Check size={18}/>Review Your Order</h2>
            <div className="flex flex-col gap-5 p-3">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-veg-green font-semibold text-[0.85rem]">
                        <Truck size={18}/>
                        Delivery Address
                    </div>
                    <div className="flex items-center">
                       <span className="text-[0.8rem] text-black/75">{selectedAddress?.label}</span>
                       <span className="text-[0.7rem] mx-2 text-black/60">/</span>
                       <span className="text-[0.75rem] text-black/60"> {selectedAddress?.street}, {selectedAddress?.city}, {selectedAddress?.state}{selectedAddress?.zipCode}</span> 
                    </div>
                </div>
                <ProductReview/>
            </div>
            <button className="rounded-[12px] bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer p-3 text-white font-bold text-[0.9rem] text-center mt-2 flex items-center justify-center" onClick={handleOrder} disabled={loading}>{loading ? <LoaderCircle className="animate animate-spin transition-all ease-in-out text-white/70" size={18}/> : `Place Order — $${totalPrice.toFixed(2)}`}</button>
        </div>}
        </>
    )
}