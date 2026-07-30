'use client'

import { productSchema } from "@/schemas/product"
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { categories } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, fileToBase64 } from "@/lib/utils";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Products } from "@prisma/client"


export default function NewProductForm({operation,product}:{operation:string,product:Products|null}){
    const router = useRouter();
    const productId = product?.id;
    console.log(productId)
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues:{
            name:product?.title || '',
            category:product?.category || '',
            price:product?.price ||0,
            originalPrice:product?.oldPrice || 0,
            stock:product?.stock || 0,
            unit:product?.unit || '',
            amount:product?.amount || '',
            image:product?.imageSrc || undefined,
            description:product?.description || '',
            organic:product?.organic || false,
        }satisfies z.input<typeof productSchema>,
    })


    

    async function onSubmit(values : z.output<typeof productSchema>){
        let base64Image = "";
        if (values.image && values.image[0] instanceof File){
            base64Image = await fileToBase64(values.image[0]);
        }
        if (operation === 'add'){
            const toastId = toast.loading("Saving product, please wait...");
            try{
                const response = await fetch('/api/routes/add-product',{
                method:'POST',
                body:JSON.stringify({...values,image:base64Image})
                })
                if (!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message ||'Network error!')
                }

                const data = await response.json();
                const {title} = data.product;
                toast.success('Product added successfuly',{
                    id: toastId,
                    description:`${title} Product has been added to the store`
                })
                router.push('/admin/products')
                
            }
            catch(error:any){
                console.error('Something went wrong:',error)
                toast.error('Something went wrong ',{
                    id: toastId,
                    description: error.message ||'Can`\t add this product, Please try again'
                })
            }
        }
        else if (operation === 'edit'){
            const toastId = toast.loading('Editing  your product infos...');
            try{
                const response = await fetch(`/api/routes/edit-product`,{
                    method:'PUT',
                    body:JSON.stringify({
                        ...values,
                        id:productId,
                        image:base64Image || undefined
                    })
                });
                
                if (!response.ok){
                    throw new Error('Network error')
                }

                toast.success('Product infos has been edited successfuly',{
                    id:toastId
                })
                router.push(`/admin/products`)
            }
            catch(error){
                console.log(error);
                toast.error('Something went wrong',{
                    id:toastId,
                    description: 'Cant edit your product infos'
                })
            }
        }
        
    }

    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:items-start">
                <Controller
                    name="name"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Name</FieldLabel>
                            <Input {...field} type="text" id={field.name}  className={`outline-none p-3 border-black/20 h-11  focus-visible:ring-0 focus:border-[2px] text-veg-green ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'}`}/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 "/>}
                        </Field>
                    )}
                />
                <Controller
                    name="category"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-black/70">Cateogry</FieldLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || 'All Categories'}
                            >
                                <SelectTrigger id={field.name}  className={`outline-none p-3 focus-visible:ring-0 focus:border-[2px] py-5 ${
                                fieldState.error 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-black/20 focus:border-veg-green'}`}>
                                <SelectValue placeholder="Select a category" className='text-veg-green text-[1rem]'/>
                                </SelectTrigger>
                                <SelectContent className='bg-white px-1.5 py-2 ring-0 border border-veg-green'>
                                {categories.map((categorie,index)=>{
                                    const selectedItem = cn(categorie === (field.value || 'All Categories') ? 'bg-green-700/30' : 'bg-white')
                                    return(
                                        <SelectItem value={categorie} key={index} className={`text-veg-green ${selectedItem} hover:bg-veg-green/70`}>{categorie}</SelectItem>
                                    )
                                })}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}/>
                <Controller
                    name={"price"}
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Price ($)</FieldLabel>
                            <Input onChange={(e)=>field.onChange(e.target.value)} value={field.value as any} type="number" min={0} id={field.name}  className={`outline-none p-3 border-black/20 h-11  focus-visible:ring-0 focus:border-[2px] text-veg-green ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'}`} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 "/>}
                        </Field>
                    )} />
                <Controller
                name="originalPrice"
                control={form.control}
                render={({field,fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-black/70" htmlFor={field.name}>Original Price ($) - Optional</FieldLabel>
                        <Input id={field.name} type="number" min={0} value={field.value as any} onChange={(e) => field.onChange(e.target.value)} className={`outline-none p-3 border-black/20 h-11  focus-visible:ring-0 focus:border-[2px] text-veg-green ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'}`}/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 "/>}
                    </Field>
                )}/>
                <Controller
                    name="unit"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Unit</FieldLabel>
                            <Input {...field} type="text" id={field.name}  className={`outline-none p-3 ${
                                fieldState.error 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-black/20 focus:border-veg-green'} h-11 focus-visible:ring-0 focus:border-[2px] text-veg-green`} placeholder="e,g., kg, piece; liter"/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 "/>}
                        </Field>
                    )}/>
                <Controller
                    name="stock"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Stock</FieldLabel>
                            <Input value={field.value as any} onChange={(e) => field.onChange(e.target.value)} type="number" min={0} id={field.name} className={`outline-none p-3 border-black/20 h-11  focus-visible:ring-0 focus:border-[2px] text-veg-green ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'}`}/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 "/>}
                        </Field>
                    )}
                />
                <Controller
                    name="image"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Product Image</FieldLabel>
                            <div className={`flex items-center  rounded-lg border w-full h-16 bg-white px-4 transition-all ${
                                fieldState.error 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-black/20 focus:border-veg-green'} mb-5 `}>
                                {field.value && <div className="mr-3 w-24 h-24 relative  p-2 mt-6">
                                    <X size={13} className="absolute top-0 right-0 cursor-pointer" onClick={()=>field.onChange(undefined)}/>
                                    <Image height={60} width={60} alt = {field.name} src={
                                    field.value && field.value[0] instanceof File 
                                    ? URL.createObjectURL(field.value[0]) 
                                    : (product?.imageSrc || "/placeholder.png")
                                    } className="rounded-[10px] w-auto h-auto object-cover"/>
                                </div>}
                                <label htmlFor={field.name} className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-lg cursor-pointer shadow-sm mr-4">
                                    Choose File
                                </label>
                                <span className="text-sm text-gray-500">
                                    {field.value && field.value[0] ? field.value[0].name : "No file chosen"}
                                </span>
                                <input
                                    type="file"
                                    id={field.name}
                                    accept="image/*"
                                    onChange={(e)=>field.onChange(e.target.files)}
                                    className="hidden "
                                />
                            </div> 
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 mb-5"/>}
                        </Field>
                    )}/>
                <Controller 
                    name="amount"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-black/70" >
                                Amount
                            </FieldLabel>
                            <Input  value={field.value as any} id={field.name} onChange={(e)=>field.onChange(e.target.value)} className={`outline-none p-3 border-black/20 h-11  focus-visible:ring-0 focus:border-[2px] text-veg-green ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'}`} type="text"/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 mb-5"/>}
                        </Field>

                    )}/>
            </div>
            <div>
                <Controller
                    name="description"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid} className="mb-5">
                            <FieldLabel className="text-black/70" htmlFor={field.name}>Description</FieldLabel>
                            <Textarea {...field} id={field.name}  className={`outline-none p-3 border-[2px] ${
                            fieldState.error 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-black/20 focus:border-veg-green'} min-h-28  focus-visible:ring-0  text-veg-green`}/>
                            {fieldState.invalid && <FieldError  errors={[fieldState.error]} className="text-red-500 "/>}
                        </Field>
                    )}/>
                <Controller
                    name="organic"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <div className="flex self-start items-center gap-2 mb-3">
                            <Checkbox
                                id={field.name}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5 shrink-0 grow-0 basis-5 rounded-md border-black/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white transition-colors"
                            />
                            <FieldLabel className="text-black/70 shrink-0" htmlFor={field.name}>Organic</FieldLabel>
                        </div>
                    )}/>
            </div>
                <button type="submit" className="text-white font-semibold rounded-[10px] bg-orange-500 px-4 py-3 text-[1.1rem] self-end hover:bg-orange-600 transition-all cursor-pointer">Save Product</button>
        </form>
    )
}