

import ShowOrders from "@/components/ShowOrders";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OrderStates from "@/components/SwitchOrderStates";
import { getUserOrders } from "@/lib/orders";


export default async function Orders(){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user.id;
    const userOrders = await getUserOrders(userId ?? "");

    return(
        <div className="p-3 md:p-6 lg:p-10 flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <h1 className="text-veg-green font-semibold text-2xl">My Orders</h1>
                <OrderStates/>
            </div>
            {<ShowOrders userOrders={userOrders}/>}
        </div>
    )
}