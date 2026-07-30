'use client'

import { addressSchema } from "@/schemas/addressSchmas"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Field, FieldLabel, FieldError } from "./ui/field"
import { Input } from "@base-ui/react/input"
import {  useRouter } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { useState } from "react"
import { Address } from "@prisma/client"


export default function AddressForm({ operation,editedAddress }: { operation: 'edit-address' | 'add-address' | 'delete-address',editedAddress:Address | undefined }) {
    const title = operation === 'edit-address' ? 'Edit Address' : operation === 'add-address' ? 'Add New Address' : operation === 'delete-address' ? 'Delete Address' : '';
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const addressId = editedAddress?.id;
    const [loading,setLoading] = useState<boolean>(false);

    type AddressValues = z.input<typeof addressSchema>

    const form = useForm<AddressValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            label: editedAddress?.label || '',
            streetAddress: editedAddress?.street || '',
            city: editedAddress?.city || '',
            state: editedAddress?.state || '',
            zipCode: editedAddress?.zipCode || '',
            isDefault: editedAddress?.isDefault || false
        }
    })

    const onSubmit = async (values: AddressValues) => {

        const loadingMsg = operation === 'add-address' ? 'Adding new address...' : operation === 'edit-address' ? 'Editing your address...' : '';
        const targetRoute = operation === 'add-address' ? 'add-address' : operation === 'edit-address' ? 'edit-address' : '';
        const data = operation === 'add-address' ? {...values,userId} : operation === 'edit-address' ? {...values,userId,addressId} : '';
        const method = operation === 'add-address' ? 'POST' : operation === 'edit-address' ? 'PUT' : '';
        const operationMsg = operation === 'add-address' ?'add' : operation === 'edit-address' ? 'edit' : '';

        const toastId = toast.loading(loadingMsg);

        if (operation === 'add-address' || 'edit-address'){
            try{
                setLoading(true)
                const response = await fetch(`/api/routes/${targetRoute}`,{
                    body:JSON.stringify(data),
                    method: method,
                    headers: {'Content-Type': 'application/json'} 
                })
                if (!response.ok){
                    toast.error(`Failed to ${operationMsg} this address!`,{
                        id:toastId
                    })
                    setTimeout(()=>{
                        toast.dismiss(toastId)
                    },1000)
                    return;
                }
                const result = await response.json();
                toast.success(result.message,{
                    id:toastId
                })
                router.push('/addresses');
                router.refresh();
            }
            catch(error){
                toast.error('Someting went wrong',{
                    id:toastId
                })
                toast.dismiss(toastId)
            }
            finally{
                setLoading(false)
                setTimeout(()=>{
                        toast.dismiss(toastId)
                    },1000)
            }
        }
    }

    return (
        <div className="flex flex-col bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <h2 className="text-veg-green font-semibold text-[1.3rem]">{title}</h2>
                <X size={20} onClick={() => router.push('/addresses')} className="cursor-pointer text-black/70 hover:text-black transition-all" />
            </div>
            <div className="flex flex-col px-8 pb-8 pt-2">
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <Controller
                        name="label"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] font-medium">Label</FieldLabel>
                                <Input value={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} className='w-full px-4 py-2.5 rounded-xl border border-black/20 focus:outline-none focus:border-veg-green transition-all placeholder:text-black/30 text-[0.9rem] text-black' placeholder='Home, Work, etc..' />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[0.75rem] text-red-500" />}
                            </Field>
                        )} />
                    <Controller
                        name="streetAddress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] font-medium">Street Address</FieldLabel>
                                <Input value={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} className='w-full px-4 py-2.5 rounded-xl border border-black/20 focus:outline-none focus:border-veg-green transition-all placeholder:text-black/30 text-[0.9rem] text-black' />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[0.75rem] text-red-500" />}
                            </Field>
                        )} />
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="flex flex-col gap-1.5">
                                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] font-medium">City</FieldLabel>
                                    <Input value={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} className='w-full px-4 py-2.5 rounded-xl border border-black/20 focus:outline-none focus:border-veg-green transition-all placeholder:text-black/30 text-[0.9rem] text-black' />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[0.75rem] text-red-500" />}
                                </Field>
                            )} />
                        <Controller
                            name="state"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="flex flex-col gap-1.5">
                                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] font-medium">State</FieldLabel>
                                    <Input value={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} className='w-full px-4 py-2.5 rounded-xl border border-black/20 focus:outline-none focus:border-veg-green transition-all placeholder:text-black/30 text-[0.9rem] text-black' />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[0.75rem] text-red-500" />}
                                </Field>
                            )} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                        name="zipCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field className="flex flex-col gap-1.5">
                                <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] font-medium">ZIP Code</FieldLabel>
                                <Input value={field.value} onChange={field.onChange} onBlur={field.onBlur} name={field.name} className='w-full px-4 py-2.5 rounded-xl border border-black/20 focus:outline-none focus:border-veg-green transition-all placeholder:text-black/30 text-[0.9rem] text-black' />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[0.75rem] text-red-500" />}
                            </Field>
                        )} />
                        <div className="self-end mb-3">
                        <Controller
                        name="isDefault"
                        control={form.control}
                        render={({ field }) => (
                            <Field className="flex items-center gap-2 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="!w-4 !h-4 shrink-0 rounded border border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
                                        style={{ width: '16px', height: '16px', flex: 'none' }}
                                    />
                                    <FieldLabel
                                        htmlFor={field.name}
                                        className="text-veg-green text-[0.8rem] font-medium"
                                    >
                                        Set as default
                                    </FieldLabel>
                                </div>
                            </Field>
                        )}
                    />
                    </div>
                    </div>                
                    <button type="submit" className={`w-full mt-4 py-3.5 bg-veg-green hover:${loading ? 'bg-veg-green' : 'bg-green-900'} text-white font-semibold rounded-2xl transition-all cursor-pointer text-base shadow-md flex justify-center`} disabled={loading}>
                        {loading ? <LoaderCircle size={16} className="opacity-80 animate-spin transition-all ease-in-out"/> : 'Save Address'}
                    </button>
                </form>
            </div>
        </div>
    )
}