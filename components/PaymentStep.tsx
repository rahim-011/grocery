'use client'


import { useCheckoutStore } from "@/store/checkoutStore";
import { ChevronRight, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";


export default function PaymentStep(){
    const paymentMethods = [
        {type:'Credit / Debit Card',info:'Pay securly with your card'},
        {type:'Cash on Delivery',info:'Pay when you receive'}
    ]
    const [selectedMethod,setSelectedMethod] = useState<string>('Credit / Debit Card')
    const {step,updateStep,setPaymentMethod} = useCheckoutStore();
    useEffect(()=>{
        setPaymentMethod(selectedMethod);
    },[selectedMethod])
    return(
        <>
        {step === 1 && <div className="p-4 flex flex-col gap-4 animate-in slide-in-from-bottom-10 transition-all duration-300">
                <h2 className="text-[1.2rem} text-veg-green font-semibold flex items-center gap-2"><CreditCard size={18}/>Payment Method</h2>
                <div className="flex flex-col gap-3">
                    {paymentMethods.map((method,index)=>{
                        return(
                            <div className="flex items-center gap-4 p-3 border border-veg-green/30 rounded-[12px] hover:border-green-900 transition-all hover:cursor-pointer" key={index} onClick={()=>setSelectedMethod(method.type)}>
                                <div className={`w-4 h-4 rounded-full border-1 ${method.type === selectedMethod ? 'border-blue-600' : 'border-black/50'} flex items-center justify-center p-0.5`}>
                                {selectedMethod === method.type && <div className="w-full h-full rounded-full bg-blue-600" />}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[0.8rem] text-veg-green font-semibold">{method.type}</span>
                                    <span className="text-[0.7rem] text-black/60">{method.info}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className="p-3 rounded-[12px] bg-veg-green hover:bg-green-900 transition-all cursor-pointer text-white flex items-center gap-2 justify-center font-semibold mt-2 text-[0.9rem] mt-3" onClick={()=>updateStep(step + 1)}>Review Order <ChevronRight size={15}/></button>
            </div>}
        </>
    )
}