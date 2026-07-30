import { Address } from '@prisma/client';
import {create} from 'zustand'

interface CheckoutStore {
    step:number,
    selectedAddress: Address | null;
    updateSelectedAddress : (address:Address) => void,
    updateStep: (newStep:number) => void,
    paymentMethod: string,
    setPaymentMethod: (method:string) => void,
}


export const useCheckoutStore =create<CheckoutStore>((set,get)=>({
    step:0,
    paymentMethod: 'Credit / Debit Cart',
    selectedAddress:null,
    updateStep : (newStep) => set({step:newStep}),
    updateSelectedAddress : (address) =>{
        set({selectedAddress:address})
    },
    setPaymentMethod: (method:string) =>{
        set({paymentMethod:method})
    }
}))