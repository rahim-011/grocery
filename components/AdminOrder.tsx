'use client'


import { LoaderCircle, Truck } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Order } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface UserProps {
    email: string,
    name: string
}
interface AdminOrderProps extends UserProps {
    orders: Order[]  | undefined
}

type OrderStatus = 'Placed' | 'Confirmed' | 'Assigned' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';



export default function AdminOrder({orders}:AdminOrderProps){
    const status = ['Placed','Confirmed','Assigned','Packed','Out for Delivery','Delivered','Cancelled'];
    const statusStyles: Record<OrderStatus, string> = {
    'Placed': 'bg-blue-100 text-blue-600',
    'Confirmed': 'bg-cyan-100 text-cyan-600',
    'Assigned': 'bg-violet-100 text-violet-600',
    'Packed': 'bg-amber-100 text-amber-600',
    'Out for Delivery': 'bg-orange-100 text-orange-600',
    'Delivered': 'bg-green-100 text-green-600',
    'Cancelled': 'bg-red-100 text-red-500',
    };

    const [currentStatus,setCurrentStatus] = useState<string>('placed');
    const [loading,setLoading] = useState<boolean>(false);
    const [updatedId,setUpdatedId] = useState<string>('');
    const handleUpComingStatus = async (status:OrderStatus,orderId:string) =>{
        setLoading(true);
        setUpdatedId(orderId);
        const toastId = toast.loading('Updating order status...');
        try{
            const response = await fetch('/api/routes/order-status',{
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({status,orderId}),
                method: 'PUT'
            })
            const result = await response.json();
            if (!response.ok){
                toast.error(result.error,{
                    id: toastId
                }),
                toast.dismiss(toastId)
            }
            setCurrentStatus(status);
            toast.success(result.message,{id:toastId});
        }
        catch(error){
            console.log(error);
            toast.error('Network error',{id:toastId})
        }
        finally{
            setLoading(false)
        }  

    }
    return(
        <>
        {orders?.map((order,index)=>{
            const date = order.createdAt.toString().split('T')[0];
            const time = new Date(order.createdAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            });
            return(
                <div className="grid grid-cols-[190px_255px_110px_180px_1fr] text-black/50 font-semibold text-[0.85rem] items-center border-t border-t-black/10 p-6 " key={index}>
                    <div className="flex flex-col">
                        <span className="text-black/90">#{order.orderCode}</span>
                        <span className="text-black/50 text-[0.75rem]">{date}, {time}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-black/90">{order.user.name}</span>
                        <span className="text-black/50 text-[0.75rem]">{order.user.email}</span>
                    </div>
                    <div className="text-veg-green">${order.totalAmount.toFixed(2)}</div>
                    <div className="flex">
                        <span className="flex items-center gap-1 bg-violet-200 p-2 rounded-[10px] self-start text-[0.65rem] text-violet-950"><Truck size={14}/> Assign</span>
                    </div>
                    <div className="flex flex-col">
                        <Select value={order.id === updatedId ? currentStatus : order.status} onValueChange={(value) => handleUpComingStatus(value,order.id)}>
                            <SelectTrigger className="w-[145px] bg-blue-100 border-none cursor-pointer flex items-center justify-center">
                                {!loading && order.id === updatedId  ? (<SelectValue placeholder="Select status"  className='text-[0.8rem] text-blue-600'/> ):( order.id == updatedId ? 
                                <LoaderCircle className="animate-spin"/> : <SelectValue placeholder="Select status"  className='text-[0.8rem] text-blue-600'/>)}
                            </SelectTrigger>
                            <SelectContent
                                sideOffset={4}
                                className="bg-blue-100 px-1 py-2 !border !border-blue-300 rounded-lg  !ring-0"
                            >
                                {status.map((s,index)=>{
                                     const selectedClass = cn(
                                        s === order.status ? statusStyles[s] : 'bg-blue-100 text-blue-500'
                                    );
                                    return(
                                        <SelectItem value={s} key={index}  className={`text-[0.8rem] hover:bg-blue-200 ${selectedClass}`}>{s}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )
        })}
        </>
    )
}