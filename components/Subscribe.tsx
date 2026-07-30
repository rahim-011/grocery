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
            <form className="flex items-center max-w-[400px] gap-2.5 w-full mt-4">
                <input 
                    placeholder="Enter your email address"
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="off"
                    className="placeholder:text-[0.8rem] placeholder:text-black/50 p-3 rounded-[8px] outline-none focus-within:border-veg-green  text-[0.9rem] flex-1 text-black/80 border-white border-[2px]"
                    />
                <button className="text-white bg-veg-green p-3.5 rounded-[8px] text-[0.8rem] cursor-pointer
                scale-100 active:scale-90 transition-all ease-out duration-500" onClick={handleSubscription}>Subscribe</button>
            </form>
        </div>
    )
}