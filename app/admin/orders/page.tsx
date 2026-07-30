import Order from "@/components/AdminOrder";



export default function AdminOrders(){
    return(
        <div className="border border-black/20 rounded-2xl flex flex-col ">
            <h1 className="font-semibold text-[1.3rem] p-5">Orders</h1>
            <div className="border-t border-black/20 flex flex-col">
                <div className="grid grid-cols-[190px_255px_110px_180px_1fr] text-black/50 font-semibold text-[0.85rem] p-6 ">
                    <div>ORDER DETAILS</div>
                    <div>CUSTOMER</div>
                    <div>TOTAL</div>
                    <div>DELIVERY PARTNER</div>
                    <div>STATUS</div>
                </div>
                <Order/>
            </div> 
        </div>        
    )
}