'use client'

import { Mail } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";


export default function Subscribe(){
  const router = useRouter();

  const handleSubscription = (e :React.BaseSyntheticEvent) =>{
    e.preventDefault();
    
  }


    return(
        <div className="flex flex-col gap-4 items-center justify-center p-5 mb-20">
            <div className="text-veg-green p-3 rounded-2xl shadow-xl mt-4 "><Mail size={30}/></div>
            <h3 className="text-veg-green font-bold text-2xl md:text-3xl">Subscribe to our Newsletter</h3>
            <p className="text-black/60 text-center text-[0.8rem]">Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.</p>
            <form className="mt-4 flex w-full max-w-[400px] flex-col gap-2.5 sm:flex-row sm:items-center">
                <input 
                    placeholder="Enter your email address"
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="off"
                    className="placeholder:text-[0.8rem] placeholder:text-black/50 min-w-0 flex-1 rounded-[8px] border-[2px] border-white p-3 text-[0.9rem] text-black/80 outline-none focus-within:border-veg-green"
                    />
                <button className="w-full rounded-[8px] bg-veg-green p-3.5 text-[0.8rem] text-white transition-all duration-500 ease-out scale-100 active:scale-90 cursor-pointer sm:w-auto" onClick={handleSubscription}>Subscribe</button>
            </form>
        </div>
    )
}