import { MapPin } from "lucide-react";






export default function EmptyAddresses(){
    return(
        <div className="flex flex-col p-4 gap-4 mt-15 items-center">
            <MapPin size={55} className="text-veg-green opacity-20"/>
            <h2 className="text-veg-green text-[1.2rem] font-semibold">No addresses saved</h2>
            <span className="text-black/60 text-[0.8rem]">Add an address for faster checkout</span>
        </div>
    )
}