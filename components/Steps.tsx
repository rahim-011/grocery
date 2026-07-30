'use client'


import { Check, ChevronRight, CreditCard, MapPin } from "lucide-react";
import { useCheckoutStore } from "@/store/checkoutStore";
import { cn } from "@/lib/utils";


export default function Steps(){
    const checkSteps = [
            {title:'Address',icon:<MapPin size={16}/>},
            {title:'Payment',icon:<CreditCard size={16}/>},
            {title:'Review',icon:<Check size={16}/>}
        ]
    const {step,updateStep} = useCheckoutStore();

    return(
        <div className="flex items-center gap-2">
            {checkSteps.map((checkStep,index)=>{
                const bgClass = cn(index === step ? 'bg-veg-green text-white' : 'bg-white hover:bg-black/5 text-veg-green')
                return(
                    <button className={` font-semibold text-[0.8rem] flex items-center gap-2 px-3 py-2 rounded-[12px] cursor-pointer ${bgClass}`} key={index} onClick={()=>updateStep(index)}>{checkStep.icon}{checkStep.title}{index < checkSteps.length -1 && <ChevronRight size={16}/>}</button>
                )
            })}
        </div>
    )
}