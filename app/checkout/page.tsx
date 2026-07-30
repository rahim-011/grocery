
import AddressStep from "@/components/AddressStep";
import OrderSummary from "@/components/OrderSummary";
import PaymentStep from "@/components/PaymentStep";
import ReviewStep from "@/components/ReviewStep";
import Steps from "@/components/Steps";
import getUserAddresses from "@/lib/addresses";
import { auth } from "@/lib/auth";
import { ArrowLeft} from "lucide-react";
import { headers } from "next/headers";



export default async function Checkout(){

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const id = session?.user.id;
    const userAddresses = await getUserAddresses(id ?? "");
    return(
        <div className="flex flex-col min-h-screen gap-4 md:p-6 lg:p-10">
            <div className="flex flex-col gap-4 w-full mb-3">
                <button className="flex items-center gap-2 text-black/60 text-[0.8rem] hover:text-black/85 transition-all cursor-pointer"><ArrowLeft size={14}/>Back</button>
                <h1 className="text-veg-green text-[1.4rem] font-semibold">Checkout</h1>
                <Steps/>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_400px] gap-7">
                <ReviewStep/>
                <AddressStep userAddresses={userAddresses ?? null}/>
                <PaymentStep/>
                <div><OrderSummary/></div>
            </div>
            
        </div>
    )
}
