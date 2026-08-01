"use client"

import { useOrdersStore } from "@/store/ordersStore";
import { OrderItem } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmptyOrders from "./EmptyOrders";
import { UserOrder } from "@/lib/types";



interface userOrdersProps {
    userOrders: UserOrder[]
}


export default function ShowOrders({userOrders}:userOrdersProps){
    
    const router = useRouter();
    const {orderState} = useOrdersStore();
    const filtredOrders = userOrders.filter(order => {
        if (orderState === 'All Orders'){
            return userOrders
        }else {
            return order.status.toLowerCase().startsWith(orderState.toLowerCase())
        }
    })
    return(
        <>
            {filtredOrders.length > 0 ? (filtredOrders.map((order,index)=>{
                const items = order.item ?? [];
                return(
                    <div className="rounded-2xl border border-black/15 p-4 flex justify-between w-[80%] hover:cursor-pointer" key={index} onClick={()=>router.push(`/orders/${order.id}`)}>
                        <div className="flex flex-col gap-2">
                            <span className="text-veg-green">Order {order.orderCode}</span>
                            <span className="flex items-center gap-2 text-[0.7rem] text-black/50"><Calendar size={12}/> {order.createdAt.split('T')[0]}</span>
                            <div className="flex items-center gap-3 w-full">
                                {items.map((item,index:number)=>(
                                    <div className="w-auto h-auto border border-black/10 rounded-[10px] px-1" key={index}>
                                    <Image alt={item.product.title} src={item.product.imageSrc} width={60} height={60} className="object-cover w-auto h-auto" loading="eager" priority />
                                </div>
                                ))}
                            </div>
                            <span className="text-black/70 text-[0.8rem] mt-4">{items.length} items</span>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-500 px-2 py-1 bg-blue-200 rounded-[10px] text-[0.7rem]">{order.status}</span>
                                <span className="text-[1rem] text-black/50">&gt;</span>
                            </div>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                )
            })) : (
                <EmptyOrders/>
            )}
        </>
    )
}