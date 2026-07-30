'use client'

import { useCheckoutStore } from "@/store/checkoutStore";
import { Address } from "@prisma/client";
import {  ChevronRight, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";




export default function AddressStep({userAddresses}:{userAddresses:Address[] | null}){
    const {step,updateStep,updateSelectedAddress}=useCheckoutStore();
    const [currentAddress,setCurrentAddress] = useState('');
    useEffect(()=>{
        if (userAddresses && userAddresses.length > 0){
            const defaultAddress = userAddresses.find(address => address.isDefault);
            if (defaultAddress){
                setCurrentAddress(defaultAddress.id)
                updateSelectedAddress(defaultAddress)
            }else {
                setCurrentAddress(userAddresses[0]?.id)
                updateSelectedAddress(userAddresses[0])
            }
        }
    },[userAddresses])
    return(
        <>
        {step === 0 && <div className="flex flex-col gap-3 p-4 animate-in slide-in-from-bottom-10 transition-all duration-300">
            <h2 className="flex items-center gap-2 text-[1.1rem] text-veg-green font-semibold"><MapPin size={18}/>Delivery Address</h2>
            <div className="flex flex-col gap-4">
                <h3 className="text-[0.8rem] text-veg-green">Saved Addresses</h3>
                <div className="grid grid-cols-2 p-2 gap-2">
                    {userAddresses?.map((address,index)=>(
                        <div className={`cursor-pointer transition-all border ${currentAddress === address.id ? 'border-veg-green' : 'border-black/20 hover:border-black/65'} rounded-[12px] p-3 flex flex-col gap-1`} key={index} onClick={()=>{setCurrentAddress(address.id);updateSelectedAddress(address)}}>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-2 text-[0.75rem] font-semibold text-veg-green"><MapPin size={14}/>{address.label}</span>
                                {address.isDefault && <span className="text-[0.65rem] text-orange-500 ml-1">DEFAULT</span>}
                            </div>
                            <span className="text-[0.7rem] text-black/75">{address.street}</span>
                            <span className="text-[0.65rem] text-black/60">{address.city},{address.state} {address.zipCode}</span>
                        </div>
                    ))}
                </div>
                <Link href='/addresses' className="flex items-center justify-center border border-black/60 hover:border-black text-black/60 hover:text-black p-2 rounded-[12px] transition-all">Add New Address <Plus size={18}/></Link>
            </div>
            <button className="text-white font-semibold rounded-[10px] p-3 cursor-pointer hover:bg-green-900 transition-all bg-veg-green flex items-center gap-2 justify-center text-[0.9rem]" onClick={()=>updateStep(step + 1)}>Continue to Payment <ChevronRight size={16}/></button>
        </div>}
        </>
    )
}