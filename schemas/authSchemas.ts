import {  z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});



export const signUpSchema = z.object({
  email: z.email({message:'Invalid email address'}),
  name: z.string().min(2,{message:'Name must be at least 2 characters'}),
  password: z.string().min(8,{message:'Password must be at least 8 characters'}),
  confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword ,{
  path:['confirmPassword'],
  message:"Passwords do not match"
})