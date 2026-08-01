'use client'

import Overlay from "@/components/Overlay"
import { Field, FieldError } from "@/components/ui/field";
import { admin } from "@/lib/auth-client";
import { partnerSchema } from "@/schemas/partner"
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, X,AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod"
import { Input } from "@/components/ui/input";
import { createPartnerProfile } from "@/lib/partners";

export default function CreatePartner(){
    type CreatePartnerValues = z.input<typeof partnerSchema>;

    const form = useForm<CreatePartnerValues>({
        resolver: zodResolver(partnerSchema),
        defaultValues:{
            fullName: '',
            email: '',
            password: '',
            vehicleType: 'bike',
            phone: ''
        }
    })
    const router = useRouter();
    const vehicleTypes = ['Bike','Scooter','Car'];
    const [showPass, setShowPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | undefined>('');

    const handleClose = () => {
        router.back();
        router.refresh();
    };

    const onSubmit = async (values: CreatePartnerValues) =>{
        const toastId = toast.loading('Adding new partner...');
        setLoading(true);
        try{
            const {error,data} = await admin.createUser({
                password: values.password,
                email: values.email,
                role : 'partner' as any,
                name: values.fullName,
            })
            if (error){
                setError(error.message)
                toast.error('Failed to add the partner!', {id: toastId})
                return
            }
            const result = await createPartnerProfile(values.phone,values.vehicleType ?? "",data?.user.id);
            if (!result?.success){
                return toast.error('User created, but failed to create partner profile')
            }
            toast.success('New partner has been added successfully', {id: toastId});
            handleClose();
        }
        catch(error){
            toast.error('Network error', {id: toastId})
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <>
            <Overlay showConfirm={true} onCloseConfirm={handleClose} />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-xl pointer-events-auto w-full max-w-lg border border-veg-green/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[1.2rem] font-semibold text-veg-green">Onboard Delivery Partner</h2>
                        <X className="cursor-pointer hover:scale-105 text-veg-green" onClick={handleClose}/>
                    </div>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Controller 
                            name="fullName"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="flex flex-col gap-1.5">
                                    <FieldLabel className="text-veg-green text-[0.8rem] font-normal" htmlFor={field.name}>Full Name</FieldLabel>
                                    <Input {...field} type="text" className="ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none border border-veg-green/45 transition-all focus:border-veg-green px-3 py-2 text-veg-green text-[0.8rem] rounded-md shadow-none"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.8rem]"/>}
                                </Field>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Controller 
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field className="flex flex-col gap-1.5">
                                        <FieldLabel className="text-veg-green text-[0.8rem] font-normal" htmlFor={field.name}>Email</FieldLabel>
                                        <Input {...field} type="email" className="ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none border border-veg-green/45 transition-all focus:border-veg-green px-3 py-2 text-veg-green text-[0.8rem] rounded-md shadow-none"/>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.8rem]"/>}
                                    </Field>
                                )}
                            />
                            <Controller 
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field className="flex flex-col gap-1.5">
                                        <FieldLabel className="text-veg-green text-[0.8rem] font-normal" htmlFor={field.name}>Password</FieldLabel>
                                        <div className="relative flex items-center">
                                            <Input {...field} type={showPass ? 'text' : 'password'} className="ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none border border-veg-green/45 transition-all focus:border-veg-green px-3 py-2 pr-9 text-veg-green text-[0.8rem] rounded-md shadow-none w-full"/>
                                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 text-veg-green/60 hover:text-veg-green focus:outline-none">
                                                {showPass ? <Eye size={16}/> : <EyeOff size={16}/>}
                                            </button>
                                        </div>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.8rem]"/>}
                                    </Field>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Controller 
                                name="phone"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field className="flex flex-col gap-1.5">
                                        <FieldLabel className="text-veg-green text-[0.8rem] font-normal" htmlFor={field.name}>Phone</FieldLabel>
                                        <Input {...field} type="text" className="ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none border border-veg-green/45 transition-all focus:border-veg-green px-3 py-2 text-veg-green text-[0.8rem] rounded-md shadow-none"/>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.8rem]"/>}
                                    </Field>
                                )}
                            />
                            <Controller 
                                name="vehicleType"
                                control={form.control}
                                render={({field}) => (
                                    <Field className="flex flex-col gap-1.5">
                                        <FieldLabel className="text-veg-green text-[0.8rem] font-normal">Vehicle Type</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none border border-veg-green/45 transition-all focus:border-veg-green px-3 py-2 text-veg-green text-[0.8rem] rounded-md shadow-none h-9">
                                                <span className="truncate">{field.value || "Select vehicle type"}</span>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-veg-green/20">
                                                {vehicleTypes.map((type, index) => (
                                                    <SelectItem key={index} value={type} className="text-veg-green text-[0.8rem] focus:bg-veg-green/10 focus:text-veg-green">
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )}
                            />
                        </div>
                        <button type="submit" className="flex items-center justify-center font-semibold text-white bg-veg-green hover:bg-green-900 transition-all p-2.5 rounded-[12px] mt-2 cursor-pointer" disabled={loading}>
                            {loading ? <LoaderCircle size={16} className="text-white/75 animate-spin"/> : 'Create Partner'}
                        </button>
                    </form>
                    {error && (
                        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl mt-4">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}