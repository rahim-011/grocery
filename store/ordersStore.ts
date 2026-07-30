import {create} from 'zustand'


interface OrdersStoreType {
    orderState: string,
    setOrderState : (state:string) => void,
}

export const useOrdersStore = create<OrdersStoreType>((set,get)=>({
    orderState : 'All Orders',
    setOrderState: (newOrderState:string) =>{
        set({orderState:newOrderState})
    }
}))