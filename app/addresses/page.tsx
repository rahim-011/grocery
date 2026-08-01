
import AddressModel from "@/components/AddressModel";
import EmptyAddresses from "@/components/EmptyAddresses";
import getUserAddresses from "@/lib/addresses";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { Address } from "@prisma/client";
import { Check, Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";




export default async function Addresses({searchParams}:{searchParams:Promise<{operation?:'edit-address' | 'add-address' | 'delete-address',addressId?:string | undefined}>}){

    const operation = (await searchParams).operation;
    const addressId = (await searchParams).addressId;
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const id = session?.user.id;
    const addresses = await getUserAddresses(id ?? "");
    return(
        <>
            <div className="flex flex-col gap-5 p-3 mt-5 min-h-screen">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-veg-green text-2xl font-semibold">My Addresses</h1>
                    <Link href='?operation=add-address' className="flex items-center gap-2 text-white font-semibold bg-veg-green p-2 rounded-[10px] cursor-pointer text-[0.8rem] hover:bg-green-900 transition-all"><Plus size={15}/>Add Address</Link>
                </div>
                {
                addresses && addresses?.length > 0 ? (<div className="flex flex-col gap-3 md:w-[70%]">
                    {addresses?.map((address:Address,index)=>(
                        <div className="flex justify-between border border-black/20 rounded-2xl p-8" key={index}>
                            <div className="flex items-center gap-5">
                                <div className="text-veg-green mb-3"><MapPin size={24}/></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-veg-green text-[0.75rem] font-semibold">{address.label}</span>
                                        {address.isDefault && <span className="flex items-center gap-1 text-white font-semibold text-[0.55rem] bg-veg-green px-1.5 py-0.5 rounded-2xl"><Check size={10}/>Default</span>}
                                    </div>
                                    <span className="text-black/60 text-[0.8rem]">{address.street}, {address.city}</span>
                                    <span className="text-black/60 text-[0.8rem]">{address.state},{address.zipCode}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-black/60">
                                <Link href={`?operation=edit-address&addressId=${address.id}`} className="cursor-pointer hover:text-black transition-all" ><Edit size={16}/></Link>
                                <Link href={`?operation=delete-address&addressId=${address.id}`} className="cursor-pointer transition-all hover:text-red-500" ><Trash2 size={16}/></Link>
                            </div>
                        </div>
                    ))}  
                </div>): (<EmptyAddresses/>)}
            </div> 
            
            {operation &&   
                <AddressModel operation={operation} addressId={addressId}/>    
            }
        </>
    )
}