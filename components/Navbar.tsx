'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Searchbar from './Searchbar';
import { ShoppingCart, User } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import UserIcon from './UserIcon';
import UserProfile from './UserProfile';

export default function Navbar() {
    const pathname = usePathname();
    const hideNavBar = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    const {openCart,calculeTotalQuantity} = useCartStore();
    const total = calculeTotalQuantity();
    const router = useRouter();


    const [showProfile,setShowProfile] = useState<boolean>(false);
    const {data:session,isPending} = useSession();
    const user = session?.user;
    const name = session?.user?.name ?? "";
    const email = session?.user?.email ?? "";
    return (
        <>
        {!hideNavBar &&  
            <nav className='flex items-center justify-between h-16 shadow-sm px-10 fixed w-full bg-white  z-30  gap-8 mb-20'>
            <div className='shrink-0'>
                <Link className='flex items-center gap-2 text-veg-green' href='/'>
                    <span><Image alt='logo' src='/logo.png' width='30' height='30'></Image></span>
                    <span className='text-[1.2rem] font-[500]'>Instacart</span>
                </Link>
            </div>
            <div className='flex flex-1 justify-center gap-3'>
                <div className='hidden md:flex items-center text-[0.8rem] font-normal gap-5 transition-all duration-100 ease-in shrink-0'>
                    <Link className={cn(pathname == '/' ? 'text-selected hover:brightness-110' : 'text-text-darker hover:brightness-75')} href='/'>Home</Link>
                    <Link className={cn(pathname == '/products' ? 'text-selected hover:brightness-110' : 'text-text-darker hover:brightness-75')} href='/products'>Products</Link>
                </div>

                <div className='w-full max-w-[350px] hidden sm:block mx-4 '>
                    <Searchbar />
                </div>
            </div>

            <div className='flex items-center gap-5 shrink-0'>
                <div onClick={()=>openCart()} className='cursor-pointer'>
                    <ShoppingCart className='relative text-black/90 hover:cursor-pointer hover:scale-105 transition-transform ease-in duration-150' size={20}/>
                    {total > 0 && <span className='absolute right-36 top-3 bg-orange-500 text-white px-1  rounded-full text-[0.6rem]'>{total}</span>}
                </div>
                
                {  
                <> 
                    {isPending ? (
                        <div>

                        </div>
                    ) : !session ? (
                        <div className='sm:block'>
                            <Link href='/sign-in' className='bg-veg-green rounded-3xl text-white font-medium px-4 py-2 text-[0.75rem] flex gap-1 items-center hover:brightness-110'>
                                <User size={16}/> Sign in
                            </Link>
                        </div>) : ( 
                        <div className='relative'>
                            <UserIcon letter={name.charAt(0).toUpperCase()} onShowProfile={()=>setShowProfile((prev) => !prev)}/>
                            {showProfile && 
                                <>
                                    <div className="fixed inset-0 z-40"onClick={() => setShowProfile(false)}/>
                                    <div className='absolute right-0 top-12 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200'>
                                        <UserProfile name={name} email={email} onShowProfile={()=>setShowProfile(prev => !prev)}/>
                                    </div>
                                </>
                            }
                        </div> 
                        )}
                </>}
            </div>
            
        </nav>}
        </>
    )
}