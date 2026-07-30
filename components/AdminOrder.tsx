'use client'


import { Truck } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminOrder(){
    const status = ['Placed','Confirmed','Assigned','Packed','Out for Delivery','Delivered','Cancelled']
    const [order,setOrder ] = useState<string | null>('Placed')

    return(
        <div className="grid grid-cols-[190px_255px_110px_180px_1fr] text-black/50 font-semibold text-[0.85rem] items-center border-t border-t-black/10 p-6 ">
            <div className="flex flex-col">
                <span className="text-black/90">#55b564</span>
                <span className="text-black/50 text-[0.75rem]">7/16/2026, 9:52:43 AM</span>
            </div>
            <div className="flex flex-col">
                <span className="text-black/90">Min Khant</span>
                <span className="text-black/50 text-[0.75rem]">djidhdh2558@gmail.com</span>
            </div>
            <div className="text-veg-green">$297.00</div>
            <div className="flex">
                <span className="flex items-center gap-1 bg-violet-200 p-2 rounded-[10px] self-start text-[0.65rem] text-violet-950"><Truck size={14}/> Assign</span>
            </div>
            <div className="flex flex-col">
                <Select value={order} onValueChange={setOrder}>
                    <SelectTrigger className="w-[145px] bg-blue-100 border-none cursor-pointer">
                        <SelectValue placeholder="Select status"  className='text-[0.8rem] text-blue-600'/>
                    </SelectTrigger>
                    <SelectContent
                        sideOffset={4}
                        className="bg-blue-100 px-1 py-2 !border !border-blue-300 rounded-lg  !ring-0"
                    >
                        {status.map((s,index)=>{
                            const selectedClass = cn(s === order ? 'bg-blue-200' : 'bg-blue-100')
                            return(
                                <SelectItem value={s} key={index}  className={`text-[0.8rem] text-blue-500 hover:bg-blue-200 ${selectedClass}`}>{s}</SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}