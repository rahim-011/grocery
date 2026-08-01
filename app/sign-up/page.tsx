
'use client'

import WelcomeSide from "@/components/WelcomeSection"
import { signUpSchema } from "@/schemas/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Lock, Mail, Eye, EyeOff, AlertCircle, LoaderCircle, User } from "lucide-react"
import z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUp() {
    const [showPass, setShowPass] = useState<boolean>(false)
    const [loading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>('')

    const router = useRouter();

    type signUpValues = z.infer<typeof signUpSchema>
    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
        }
    })

    const onSubmit = async (values: signUpValues) => {
        const toastId = toast.loading('Creating your account...');
        setIsLoading(true)
        try{
            const {email,password,name} = values;
            const {error} = await signUp.email({name,email,password});
            if (error){
                toast.dismiss(toastId);
                setError(error.message);
                return
            }
            toast.success('Account created successfully!',{
                id:toastId,
                description:'Welcome to Instacart!'
            })
            router.push('/')
        }
        catch{
            toast.error('An unexpected error occurred',{id:toastId})
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full overflow-hidden md:grid md:grid-cols-2">
        <WelcomeSide />
        <div className="flex flex-col items-center w-full min-h-screen  p-5 md:p-10">
            <div className="lg:p-5 flex flex-col items-center">
            <h1 className="flex items-center gap-2 font-semibold mb-5">
                <Image alt="logo" src="/logo.png" width={30} height={30} />
                <span className="text-veg-green text-[1.4rem] mt-2">Instacart</span>
            </h1>
            <div className="flex flex-col gap-2 items-center">
                <span className="text-veg-green font-semibold text-[1.2rem]">Sign up for an account</span>
                <div className="flex items-center gap-1">
                <span className="text-black/60 text-[0.8rem]">Already have an account?</span>
                <Link href="/sign-in" className="text-orange-500 hover:text-orange-600 transition-all text-[0.8rem] cursor-pointer font-semibold">
                    Sign in
                </Link>
                </div>
            </div>
            </div>

            <div className="flex flex-col mt-5 w-full max-w-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-0.5">
                <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem]">Name</FieldLabel>
                    <div className="relative flex items-center">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-[10px] text-gray-500 pointer-events-none" />
                        <Input {...field} value={field.value} placeholder="Joe" id={field.name} className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green mb-1" />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem]" />}
                    </Field>
                )}
                />

                <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem]">Email Address</FieldLabel>
                    <div className="relative flex items-center">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <Input id={field.name} {...field} value={field.value} placeholder="Joe@example.com" className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green" />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem]" />}
                    </Field>
                )}
                />

                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] mt-3">Password</FieldLabel>
                    <div className="relative flex items-center">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <Input id={field.name} {...field} value={field.value} placeholder="........" className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green placeholder:translate-y-[-2px] placeholder:text-[1rem] mb-1" type={showPass ? 'text' : 'password'} />
                        {showPass ? (
                        <Eye size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={() => setShowPass(false)} />
                        ) : (
                        <EyeOff size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={() => setShowPass(true)} />
                        )}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem]" />}
                    </Field>
                )}
                />

                <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem]">Confirm Password</FieldLabel>
                    <div className="relative flex items-center">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <Input {...field} id={field.name} value={field.value} className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green placeholder:translate-y-[-2px] placeholder:text-[1rem]" placeholder="........" type={showPass ? 'text' : 'password'} />
                        {showPass ? (
                        <Eye size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={() => setShowPass(false)} />
                        ) : (
                        <EyeOff size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={() => setShowPass(true)} />
                        )}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem]" />}
                    </Field>
                )}
                />

                <button disabled={loading} className="rounded-[10px] bg-veg-green hover:bg-green-900 transition-all font-semibold text-white w-full p-3 cursor-pointer text-[0.8rem] mt-5 flex justify-center" type="submit">
                {loading ? <LoaderCircle size={16} className="animate-spin transition-all ease-in text-white/70" /> : 'Sign Up'}
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
        </div>
    )
}

