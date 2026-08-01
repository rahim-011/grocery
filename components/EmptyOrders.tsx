import { PackageSearch } from "lucide-react";

export default function EmptyOrders(){
    return(
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-veg-green/10">
                <PackageSearch className="w-8 h-8 text-veg-green" />
            </div>
            <h3 className="text-lg font-semibold text-black">No orders found</h3>
            <p className="text-sm text-black/55 max-w-xs">
                There are no orders to show right now. Once orders come in, they will appear here.
            </p>
        </div>
    )
}