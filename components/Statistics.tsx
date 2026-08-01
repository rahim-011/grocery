import { getStatistics } from "@/lib/dashboard"
import { ShoppingBag,Users,Package,TriangleAlert } from "lucide-react"



export default async function Statistics(){
    interface StatisticsInfos {
        title:string,
        value: number,
        icon:React.ReactNode
    }

    const {success,totalUsers,totalProducts,totalOrders,outOfStock} =  await getStatistics() || {};
    if (!success){
        return
    }
    const statisticInfos:StatisticsInfos[] = [
        {
        title: 'Total Orders',
        value: totalOrders || 0,
        icon:<ShoppingBag size={22}/>
        },
        {
        title: 'Total Users',
        value: totalUsers || 0,
        icon:<Users size={22}/>
        },
        {
        title: 'Total Products',
        value: totalProducts || 0,
        icon:<Package size={22}/>
        },
        {
        title: 'Out of Stock',
        value: outOfStock || 0,
        icon:<TriangleAlert size={22}/>
        }
] 
    return(
        <div className="flex items-center gap-4">
            {statisticInfos.map((info,index)=>(
                <div className="flex flex-1 items-center justify-between border border-black/20 p-4 rounded-2xl" key={index}>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-black text-[1.5rem]">{info.value}</span>
                        <span className="text-black/50 text-[0.85rem]">{info.title}</span>
                    </div>
                    <div className="text-orange-500">{info.icon}</div>
                </div>
            ))}
        </div>
    )
}