'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Searchbar from './Searchbar';
import { ShoppingCart, User } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import UserIcon from './UserIcon';
import UserProfile from './UserProfile';

export default function Navbar() {
    const pathname = usePathname();
    const hideNavBar = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    const {openCart,calculeTotalQuantity} = useCartStore();
    const total = calculeTotalQuantity();
    const [showProfile,setShowProfile] = useState<boolean>(false);
    const {data:session,isPending} = useSession();
    const name = session?.user?.name ?? "";
    const email = session?.user?.email ?? "";
    return (
        <>
        {!hideNavBar &&  
            <nav className='fixed inset-x-0 top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur-sm shadow-sm'>
                <div className='mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10'>
                    <div className='shrink-0'>
                        <Link className='flex items-center gap-2 text-veg-green' href='/'>
                            <span><Image alt='logo' src='/logo.png' width='30' height='30'></Image></span>
                            <span className='text-base font-[500] sm:text-[1.2rem]'>Instacart</span>
                        </Link>
                    </div>

                    <div className='hidden items-center gap-5 text-[0.8rem] font-normal md:flex'>
                        <Link className={cn(pathname == '/' ? 'text-selected hover:brightness-110' : 'text-text-darker hover:brightness-75')} href='/'>Home</Link>
                        <Link className={cn(pathname == '/products' ? 'text-selected hover:brightness-110' : 'text-text-darker hover:brightness-75')} href='/products'>Products</Link>
                    </div>

                    <div className='hidden flex-1 max-w-[360px] sm:block'>
                        <Searchbar />
                    </div>

                    <div className='flex items-center gap-3 sm:gap-5 shrink-0'>
                        <button type='button' onClick={()=>openCart()} className='relative cursor-pointer rounded-full p-2 text-black/90 transition-transform duration-150 hover:scale-105'>
                            <ShoppingCart size={20} />
                            {total > 0 && <span className='absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[0.55rem] font-semibold text-white'>{total}</span>}
                        </button>
                        
                        {  
                        <> 
                            {isPending ? (
                                <div></div>
                            ) : !session ? (
                                <Link href='/sign-in' className='flex items-center gap-1 rounded-3xl bg-veg-green px-3 py-2 text-[0.7rem] font-medium text-white transition hover:brightness-110 sm:px-4 sm:text-[0.75rem]'>
                                    <User size={16}/> Sign in
                                </Link>
                            ) : ( 
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
                </div>
                <div className='px-4 pb-3 sm:hidden'>
                    <Searchbar />
                </div>
            </nav>}
        </>
    )
}