import { useCartStore } from "@/store/cartStore";
import {  Trash2 } from "lucide-react";
import Image from "next/image";






export default function CartProducts(){
    
    const {cartProducts,manageCart} = useCartStore();
    return(
        <div className="flex-1 p-3 flex flex-col gap-3 w-full max-h-[320px] overflow-y-auto mb-5">
            {cartProducts.map((cartItem,index)=>{
                const {product} = cartItem;
                const totalProductPrice = (product.price || product.oldPrice || 0) * cartItem.quantity;
                return(
                    <div className="flex justify-between p-3" key={index}>
                        <div className="flex items-center gap-5">
                            <div className="object-contain">
                                <Image alt={product.title} src={product.imageSrc} width={50} height={50}/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-veg-green text-[0.75rem] font-bold">{product.title}</span>
                                <span className="text-black/60 text-[0.65rem]">${product.price || product.oldPrice}</span>
                                <div className="flex items-center gap-2">
                                    <button className=" border border-veg-green/30 cursor-pointer hover:border-veg-green/60 transition  flex px-2 text-center rounded-[10px]" onClick={()=>manageCart('minus',cartItem.product.id)}>-</button>
                                    <span className="text-[0.9rem]">{cartItem.quantity}</span>
                                    <button className=" border border-veg-green/30 cursor-pointer hover:border-veg-green/60 transition  flex px-2 text-center rounded-[10px]" onClick={()=>manageCart('plus',cartItem.product.id)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="self-end flex items-center gap-3">
                            <span className="text-veg-green text-[0.8rem] font-bold">${totalProductPrice.toFixed(2)}</span>
                            <span className="opacity-60 hover:text-red-500 hover:opacity-100  cursor-pointer transition-all"><Trash2 size={15} onClick={()=>manageCart(null,cartItem.product.id)}/></span>
                        </div>
                    </div>
                )})}
        </div>
    )
}