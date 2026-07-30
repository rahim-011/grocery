'use client'


import { deleteAddressById } from "@/lib/addresses";
import { deleteProduct } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ArrowLeft, X,LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


type ConfirmType = {
    productId?:string,
    onCloseConfirm? : () => void,
    type:string,
    addressId?:string,
}

export default function Confirm({productId,onCloseConfirm,type,addressId}:ConfirmType) {

    const router = useRouter();
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const cleanQuery = () =>{
        router.push('?',{scroll:false})
    }
    const handleDelete = async () =>{
        if (!addressId && !productId) {
            toast.error("Missing ID for deletion.");
            return;
        }
        const toastId = toast.loading(`Deleting ${type}...`)
        setIsDeleting(true);
        try{
            let result;
            if (addressId){
                result = await deleteAddressById(addressId)
            }else if (productId){
                result = await deleteProduct(productId);
            }
            if (result?.success){
                toast.success(result.message,{
                        id:toastId
                })
                if (addressId){
                    router.push('/addresses')
                }
                router.refresh(); 
                cleanQuery();
                onCloseConfirm && onCloseConfirm();
            }
            else{
                toast.error(result?.error,{
                    id:toastId
                })
            }
        }
        catch(error){
            toast.error('Something went wrong',{id:toastId})
        }
        finally{
            setIsDeleting(false)
        }
       
    }

    const deleteClass = cn(isDeleting ?  'opacity-60' : '')
    return (
        <div className="bg-veg-green rounded-2xl flex flex-col gap-4 p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] shadow-2xl border border-white/10">
            <div className="flex justify-between items-center text-white mb-10">
                <span className="cursor-pointer hover:bg-white/10 p-1.5 rounded-lg transition-colors" onClick={()=>router.back()}><ArrowLeft /></span>
                <span className="cursor-pointer hover:bg-white/10 p-1.5 rounded-lg transition-colors" onClick={()=>{onCloseConfirm && onCloseConfirm();cleanQuery()}}><X /></span>
            </div>
            <div className="flex flex-col gap-8">
                <p className="text-white text-[1.2rem] max-w-[350px] text-center font-medium leading-relaxed">
                    Are you sure you want to delete this {type}?
                </p>
                <div className="flex justify-around items-center">
                    <button onClick={()=> {onCloseConfirm && onCloseConfirm();cleanQuery()}} className="text-white bg-white/10 hover:bg-white/20 px-8 py-2.5 rounded-xl font-semibold transition-all cursor-pointer">
                        No
                    </button>
                    <button className={`text-white bg-red-500 hover:bg-red-600 px-8 py-2.5 rounded-xl font-semibold transition-all shadow-lg cursor-pointer ${deleteClass}`} onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting  ? <LoaderCircle className="animate-spin"/> : 'Yes'}
                    </button>
                </div>
            </div>
        </div>
    )
}