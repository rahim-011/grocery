import Partner from "@/components/Partner"
import { getAllPartners } from "@/lib/partners"
import { Plus } from "lucide-react"
import Link from "next/link"


export default async function DeliveryPartners(){

    const partners = await getAllPartners();
    return(
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-[1.3rem]">Delivery Partners</h1>
                <Link href='/admin/delivery-partners/create-partner' className="text-white font-semibold bg-veg-green rounded-[10px] p-2.5 flex items-center gap-2 text-[0.8rem] hover:brightness-115 transition-all cursor-pointer"><Plus size={16}/>Add Partner</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Partner partners={partners}/>
            </div>
        </div>
    )
}