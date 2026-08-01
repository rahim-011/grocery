import z, { email } from "zod";



export const partnerSchema = z.object({
    fullName: z.string().min(2,{message:'Full name must be at least 2 characters'}),
    email: z.email({message:'Invalid email address'}),
    password: z.string().min(8,'Password must be more then 8 digits'),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
    vehicleType: z.string().default('bike')
})