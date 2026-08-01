
'use client'

import { signInSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Mail,Eye,EyeOff,AlertCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import WelcomeSide from "@/components/WelcomeSection";
import { useRouter } from "next/navigation";


export default function SignIn() {

  const [showPass,setShowPass] = useState<boolean>(false);
  const [error,setError] = useState<string|undefined>('');
  const [loading,setLoading] = useState<boolean>(false);
  const router = useRouter();

  type  signInValues = z.infer<typeof signInSchema>
  const form = useForm<signInValues>({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })



  const onSubmit = async (values : signInValues) =>{
    setLoading(true);
    const toastId = toast.loading('Signing in...')
    try{
      const {email,password} = values;
      const {error} = await signIn.email({email,password});
      if (error){
        setError(error?.message)
        toast.dismiss(toastId)
        return
      }
      toast.success('Signed in successfully',{
        id:toastId,
        description:'Welcome back!'
      })
      
      router.push('/')
    }
    catch{
      toast.error('An unexpected error occurred',{id:toastId})
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen w-full overflow-hidden md:grid md:grid-cols-2">
      <WelcomeSide/>
      <div className="flex flex-col items-center justify-center lg:p-12 w-full min-h-screen">
            <div className="lg:p-5 flex flex-col items-center">
                <h1 className="flex items-center gap-2 font-semibold mb-5"><Image alt='logo' src='/logo.png' width='30' height='30'></Image><span className="text-veg-green text-[1.4rem] mt-2">Instacart</span></h1>
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-veg-green font-semibold text-[1.2rem]">Sign in to your account</span>
                    <div className="flex items-center gap-1">
                        <span className="text-black/60 text-[0.8rem]">Do not have an account?</span>
                        <Link href='/sign-up' className="text-orange-500 hover:text-orange-600 transition-all text-[0.8rem] cursor-pointer font-semiboldl">Create one</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5 md:w-[70%] w-[80%]">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller 
                name="email"
                control={form.control}
                render={({field,fieldState})=>(
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem]">Email Address</FieldLabel>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      <Input
                        id={field.name}
                        {...field}
                        value={field.value}
                        placeholder="Joe@example.com"
                        className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green"
                      />
                  </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem]"/>}
                  </Field>
                )}/>
                <Controller 
                name="password"
                control={form.control}
                render={({field,fieldState})=>(
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-veg-green text-[0.8rem] mt-3">Password</FieldLabel>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      <Input
                        id={field.name}
                        {...field}
                        value={field.value}
                        placeholder="........"
                        className="pl-9 pr-4 py-5 border-veg-green/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-veg-green rounded-xl text-veg-green  placeholder:translate-y-[-2px] placeholder:text-[1rem]"
                        type={showPass ? 'text' : 'password'}
                      />
                      {showPass ? <Eye size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={()=>setShowPass(false)}/> : <EyeOff size={15} className="absolute cursor-pointer text-black/60 right-4" onClick={()=>setShowPass(true)}/>}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-[0.7rem] "/>}
                  </Field>
                )}/>
                <button className="rounded-[10px] bg-veg-green hover:bg-green-900 transition-all font-semibold text-white w-full p-3 cursor-pointer text-[0.8rem] mt-5 flex justify-center" type="submit">{loading ?  <LoaderCircle size={16} className="animate-spin transition-all ease-in  text-white/70"/> : 'Sign In'}</button>
              </form>
              {error && <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl mt-4">
                          <AlertCircle size={16} className="shrink-0" />
                          <span>{error}</span>
                        </div>}
            </div>
      </div>
    </div>
  );
}