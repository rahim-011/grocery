import z from "zod";




export const addressSchema = z.object({
    label: z.string().min(1,'Label is required'),
    streetAddress: z.string().min(1,'StreetAddress is required'),
    city: z.string().min(1,{message:'City is required'}),
    state: z.string().min(1,{message:'State is required!'}),
    zipCode: z.string().min(1,{message:'ZIP Code is required'}),
    isDefault: z.boolean().default(false)
})