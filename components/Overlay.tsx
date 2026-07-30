'use client'

import { useCartStore } from "@/store/cartStore"
import { useFilterStore } from "@/store/filterStore";
import { useRouter } from "next/navigation";

type OverlayProps = {
    showConfirm?: boolean,
    onCloseConfirm?: ()=>void,
}


export default function Overlay({showConfirm,onCloseConfirm} : OverlayProps){
    const {closeCart,isCartOpen} = useCartStore();
    const {closeFilter,isFilterOpen} = useFilterStore();
    const router = useRouter();
    return(
        <>
        {(isFilterOpen || isCartOpen || showConfirm) &&
            <div className="inset-0 bg-black/30  w-full h-full fixed top-0 left-0" onClick={()=>{router.push('?');router.refresh();closeCart();closeFilter();onCloseConfirm && onCloseConfirm()}}></div> 
        }
        </>
    )
}