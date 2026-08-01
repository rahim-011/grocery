'use client'

import { updatePartnerStatus } from "@/lib/partners";
import { cn } from "@/lib/utils";
import { LoaderCircle, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";




export default function Partner({partners}:{partners:any}){
    const [loading,setLoading] = useState<boolean>(false);
    const [currentStatus,setCurrentStatus] = useState<boolean | null | undefined>(null);
    
    useEffect(()=>{
        setCurrentStatus((prev)=> !prev)
    },[partners])

    const changePartnerStatus = async (partnerId:string) =>{
        setLoading(true);
        const toastId = toast.loading(' partner...');
        try{
            const result = await updatePartnerStatus(partnerId);
            const {success,newStatus} = result;
            if (!success){
                toast.error('Failed to update partner status',{id:toastId})
                toast.dismiss(toastId)
            }

            toast.success('Partner status has been updated successfully',{id:toastId})
            setCurrentStatus(newStatus);
        }
        catch(error){
            toast.error('Network error',{id:toastId});
            toast.dismiss(toastId)
        }
        finally{
            setLoading(false);
        }
    }


    return(
        <>
        {partners?.map((partner,index)=>{
            const activeClass = cn(currentStatus ? 'bg-green-500/30 text-green-500' : 'bg-red-500/40 text-red-500')
            const btnClass = cn(currentStatus ? 'bg-red-500' : 'bg-green-700')
            return(
                <div className="flex flex-col gap-2.5 border border-black/20 rounded-2xl p-4 max-w-[300px]" key={index}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div></div>
                            <div className="flex flex-col">
                                <span className="text-[0.9rem] font-semibold">{partner.user.name}</span>
                                <span className="text-black/50 text-[0.7rem]">{partner.vehicleType}</span>
                            </div>
                        </div>
                        <div className={`${activeClass} self-center text-[0.7rem] py-1 px-2 rounded-2xl bg-green-200`}>{currentStatus ? 'active' : 'disabled'}</div>
                    </div>
                    <div className="text-black/70 flex items-center gap-2.5 mt-3">
                        <Mail size={15}/><span className="text-[0.8rem]">{partner.user.email}</span>
                    </div>
                    <div className="text-black/70 flex items-center gap-2.5"><Phone size={16}/><span className="text-[0.8rem]">{partner.phone}</span></div>
                    <button className={`text-white p-2.5 rounded-[10px]  text-[0.8rem] mt-2 transition-all ${btnClass}  cursor-pointer  hover:brightness-115 flex items-center justify-center`} onClick={()=>changePartnerStatus(partner.id)}>{!loading ? `${currentStatus ? 'Desactivate' : 'Activate'}` : <LoaderCircle size={16} className="text-white/70 animate-spin transition-all"/>}</button>
                </div>
            )
        })}
        </>
    )
}