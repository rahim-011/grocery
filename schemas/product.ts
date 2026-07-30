import *  as z from 'zod'


export const productSchema = z.object({
    name : z.string().min(2,'Product name is required'),
    category: z.string().min(1,'Please select a category'),
    price: z.coerce.number().positive('Price must be greater then 0'),
    originalPrice: z.coerce.number().nonnegative().optional().or(z.literal(0)),
    unit: z.string().min(1,'Unit is required'),
    stock: z.coerce.number().int().nonnegative('Stock cannot be negative!'),
    amount: z.string().min(1,'Amount is required!'),
    image: z.any().refine((file)=> file && file.length > 0,'Product image is required'),
    description: z.string().min(10,'Description should be at least 10 characters').optional(),
    organic: z.boolean().default(false)
})