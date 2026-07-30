'use client'


import { useOrdersStore } from "@/store/ordersStore";


export default function OrderStates(){
    const orderStates = ['All Orders','Placed','Out for Delivery','Delivered'];
    const {orderState,setOrderState} = useOrdersStore();
    return(
        <div className="flex items-center gap-2">
            {orderStates.map((tab,index)=>{
                const btnClass = tab === orderState ? 'bg-veg-green text-white hover:brightness-115' : 'text-black/55' ;
                return(
                    <button key={index} className={`${btnClass} transition-all cursor-pointer px-3 py-2 font-semibold  text-[0.75rem] rounded-[10px]`} onClick={()=>setOrderState(tab)}>{tab}</button>
                )})}
        </div>
    )
}