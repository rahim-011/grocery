'use client'

import { calculateDiscount, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Products } from "@prisma/client";
import { Check, X, Minus, Plus, ShoppingCart, Star,ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowProduct({ mainProduct }: { mainProduct: Products | null }) {
    const discount = calculateDiscount(mainProduct?.oldPrice, mainProduct?.price);
    const isInStock = mainProduct?.stock > 0 ;
    const stockClass = cn( isInStock ? 'text-green-500' : 'text-red-500');
    const stockString = isInStock ? ` In Stock (${mainProduct?.stock} available)` : "Out of Stock";

    const [isExist, setIsExist] = useState<boolean>(false);
    const { openCart, isInCart, addToCart, cartProducts, manageCart } = useCartStore();
    const [q,setQ] = useState(1);
    
    const currentCartItem = cartProducts.find(item => item.product.id === mainProduct?.id);
    let cartQuantity = currentCartItem ? currentCartItem.quantity : 1;


    useEffect(() => {
        if (mainProduct?.id) {
            setIsExist(isInCart(mainProduct.id));
        }
        if(currentCartItem){
            setQ(cartQuantity)
        }
    }, [isInCart, cartProducts, mainProduct?.id,currentCartItem]);

    const addToCartClass = (isExist && isInStock ) ? 'bg-white border border-veg-green text-veg-green' : isInStock ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'opacity-60 disabled';

    const handlePlus = () =>{
        if (isExist){
            manageCart('plus',mainProduct?.id)
        }else{
            setQ(prev => prev + 1)
        }
    }
    const handleMinus =  () =>{
        if (isExist){
            manageCart('minus',mainProduct?.id)
        }else{
            setQ(prev => prev == 1 ? 1 : prev - 1)
        }
    }
    const handleCart = () => {
        openCart();
        if (!isExist && mainProduct) {
            addToCart(mainProduct,q);
        }
    }

    const router = useRouter();

    return (
        <>
        <button onClick={()=>router.back()} className="flex items-center gap-1.5 cursor-pointer text-black/55 hover:text-black/75 text-[0.8rem] transition-all"><ArrowLeft size={16}/>Back</button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-2xl border border-black/10 shadow-2xs">
            <div className="flex flex-col gap-3 p-3">
                <div className="self-start rounded-2xl bg-amber-700 font-semibold py-1 px-2 text-[0.65rem] text-white ">{discount}% OFF</div>
                <div className="self-center justify-self-center w-auto h-auto">
                    <Image src={mainProduct?.imageSrc || '/undefined.png'} width={300} height={300} alt={mainProduct?.title || 'product'} className="object-cover w-auto h-auto" loading="eager"/>
                </div>
            </div>
            <div className="flex flex-col gap-2 self-center font-semibold">
                <span className="text-black/50 text-[0.65rem]">Beverages</span>
                <h1 className="text-veg-green text-2xl">{mainProduct?.title} {mainProduct?.amount}</h1>
                <div className="flex items-center gap-3">
                    <Star className="fill-current text-yellow-600" size={16} />
                    <span className="text-veg-green text-[0.8rem]">{mainProduct?.rating}</span>
                </div>
                <div className="flex items-baseline mt-4 gap-3">
                    <span className="text-veg-green text-3xl">${mainProduct?.price}</span>
                    {mainProduct?.oldPrice && <span className="text-black/50 line-through">${mainProduct?.oldPrice}</span>}
                </div>
                <p className="text-[0.8rem] my-5 text-black/60">{mainProduct?.description}</p>
                <span className={`${stockClass} text-[0.82rem] flex items-center gap-1`}>
                    {mainProduct && mainProduct?.stock > 0 ? <Check size={16} /> : <X size={16} />}
                    {stockString}
                </span>
                
                <div className="w-full flex items-center gap-3 p-3">
                    <div className="flex items-center justify-between w-32 px-4 py-2 bg-white border border-gray-200 rounded-xl">
                        <button 
                            className="flex items-center justify-center text-gray-800 transition-colors cursor-pointer hover:text-black" 
                            onClick={handleMinus}
                        >
                            <Minus size={16} />
                        </button>

                        <span className="text-sm font-semibold text-gray-900">{q}</span>

                        <button 
                            className="flex items-center justify-center text-gray-800 transition-colors cursor-pointer hover:text-black" 
                            onClick={handlePlus}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button 
                        className={`text-[0.8rem] py-3 rounded-[10px] cursor-pointer flex items-center flex-1 justify-center px-2 gap-3 transition-all ${addToCartClass}`} 
                        onClick={handleCart} disabled={isExist}
                    >
                        <ShoppingCart size={15} /> {isExist ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}