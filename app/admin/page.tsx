import Statistics from "@/components/Statistics";
import { getOrders } from "@/lib/orders";
import { ArrowRight } from "lucide-react";
import Link from "next/link";




export default async function Dashboard(){
    
    const allOrders = await getOrders();
    return(
        <div className="flex flex-col gap-4 w-full max-h-screen  overflow-y-auto scrollbar-none">
            <div>
                <Statistics/>
            </div>
            <div className="border border-black/20 rounded-2xl flex flex-col gap-2 w-full">
                <div className="p-4 flex justify-between items-center">
                    <h2 className="font-medium text-[1.2rem]">Recent Orders</h2>
                    <Link href='admin/orders' className="flex items-center gap-2 text-[0.9rem] text-orange-500 hover:text-orange-600 transition-all">
                        View All <ArrowRight size={18}/>
                    </Link>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
                    <div className="w-[120px] shrink-0 text-black/50 text-[0.8rem] font-bold">ORDER ID</div>
                    <div className="w-[220px] shrink-0">
                        <div className="text-[0.8rem] font-bold text-black/50">CUSTOMER</div>
                        <div className="text-[0.8rem] font-bold text-black/50"></div>
                    </div>
                    <div className="w-[90px] shrink-0 text-black/50 text-[0.8rem] font-bold">ITEMS</div>
                    <div className="w-[100px] shrink-0 text-black/50 font-bold text-[0.8rem]">TOTAL</div>
                    <div className="w-[140px] text-black/50 font-bold shrink-0 mr-8">
                        <span className="bg-orange-50 text-black/50 px-3 py-1 rounded-full text-xs font-bold">
                        STATUS
                        </span>
                    </div>
                    <div className="w-[100px] shrink-0 text-black/50 text-[0.8rem] font-bold">DATE</div>
                    </div>
                {/*Map over this div so u cant handle all the rows!!*/}
                {allOrders?.map((order,index)=>{
                    return(
                        <div className="flex items-center gap-4 px-5 py-4 border-t border-black/20" key={index}>
                            <div className="w-[120px] shrink-0 text-black/60 text-[0.75rem]">#{order.orderCode}</div>
                            <div className="w-[220px] shrink-0">
                                <div className="text-black text-[0.8rem]">{order.user.name}</div>
                                <div className="text-black/60 text-[0.75rem]">{order.user.email}</div>
                            </div>
                            <div className="w-[90px] text-black/60 text-[0.8rem]">{order.totalItems} items</div>
                            <div className="w-[100px] shrink-0 text-veg-green text-[0.85rem] font-medium">${order.totalAmount.toFixed(2)}</div>
                            <div className="w-[140px] shrink-0  mr-8">
                                <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                                    {order.status}
                                </span>
                            </div>
                            <div className="w-[100px] shrink-0 text-black/60 text-sm">{order.createdAt.split('T')[0]}</div>
                        </div>   
                    )
                })}
            </div>
        </div>
    )
}