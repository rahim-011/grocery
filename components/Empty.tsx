import {ShoppingBag} from 'lucide-react'


export default function Empty(){
    return(
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col gap-4 text-veg-green items-center">
                <span className="opacity-30"><ShoppingBag size={55}/></span>
                <span>Your cart is empty</span>
            </div>
        </div>
    )
}