import { Products } from '@prisma/client'
import {create} from 'zustand'


interface CartItem {
    product:Products,
    quantity:number
}

interface StoreCart{
    getTotalPrice: () => number,
    calculeTax: () => number,
    getTotalItems: () => number,
    getSubTotal: () => number,
    calculeTotalQuantity: () => number,
    cartProducts: CartItem[],
    clearCartProducts: () => void,
    isCartOpen:boolean,
    isInCart: (id:string|null) => boolean,
    openCart : () => void,
    closeCart : () => void,
    manageCart: (operation:string | null,id:string) => void,
    addToCart: (product:Products,quantity:number) => void;
}


export const useCartStore = create<StoreCart>((set,get)=>({
    cartProducts:[],
    isCartOpen:false,
    openCart : () => set({isCartOpen:true}),
    closeCart: () => set({isCartOpen:false}),

    manageCart : (operation:string | null,id:string) =>{

        if (operation != 'minus' && operation != 'plus' && operation != ''){
            const updatedCart = get().cartProducts.filter(cartItem => cartItem.product.id != id);
            set({cartProducts:updatedCart});
            return
        }

        const value = operation === 'plus' ? +1 : operation === 'minus' ? -1 : 0;
        const updatedCart = get().cartProducts.map(cartItem =>{
            if(cartItem.product.id == id){
                const newQuantity  = cartItem.quantity + value;
                return {...cartItem,quantity:newQuantity};
            }
            return cartItem;
        })
        .filter(item => item.quantity > 0)
        set({cartProducts:updatedCart}) 
    },
    addToCart : (product:Products,quantity=1) =>{
        const currentCart = get().cartProducts;
        const existingItem = currentCart.find(item => item.product.id === product.id);
        if (!existingItem){
            set({cartProducts:[...currentCart,{product,quantity}]})
        }else {
            set({cartProducts:currentCart.map(item => item.product.id === product.id ? {product,quantity:quantity + item.quantity} : item)})
        }
        
        set({isCartOpen:true})
    },
    isInCart: (id:string|null) =>{
        return get().cartProducts.some(cartProduct => cartProduct.product.id === id);
    },
    calculeTotalQuantity: () =>{
        return get().cartProducts.reduce((total,item)=>
            total + item.quantity ,0)
    },
    getSubTotal : ()=>{
        const currentCartProducts = get().cartProducts;
        let subTotal = 0;
        currentCartProducts.forEach(item => {
            const {product,quantity} = item;
            subTotal += product.price * quantity;
        })
        return subTotal;
    },
    getTotalItems : () =>{
        return get().cartProducts.length;
    },
    calculeTax: ()=>{
        const taxRate = 0.08;
        return get().getSubTotal() * taxRate;
    },
    getTotalPrice: ()=>{
        return get().getSubTotal() + get().calculeTax();
    },
    clearCartProducts: () =>{
        set({cartProducts:[]})
    }
}))