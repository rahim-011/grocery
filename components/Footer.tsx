'use client'

import { type MouseEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Footer(){

    const pathname = usePathname();

    const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) =>{
        e.preventDefault();
        if (window.location.pathname === pathname){
            window.scrollTo({top:0,behavior:'smooth'})
        }
    }
    const hideFooter = pathname.startsWith('/admin');
    const hideNavBar = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    if (!hideFooter && !hideNavBar){
        return(
            <div className="mt-10 w-full bg-veg-green px-5 pb-6 pt-8 md:px-10">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <h4 className="flex items-center gap-2 text-white"><Image alt='logo' src='/logo.png' width={20} height={20} /> Instacart</h4>
                        <p className="text-[0.75rem] leading-6 text-white/70">Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth&apos;s finest.</p>
                        <div className="flex items-center gap-4 ">
                            <span className="rounded-[5px] bg-white/10 p-2 transition-all duration-150 hover:cursor-pointer hover:bg-white/15"><a href=""><Image alt='instagram logo' src='/ig.png' width={15} height={15} className="invert"/></a></span>
                            <span className="rounded-[5px] bg-white/10 p-2 transition-all duration-150 hover:cursor-pointer hover:bg-white/15"><a href=""><Image alt="X logo" src='/x.png' width={15} height={15} className="invert"/></a></span>
                            <span className="rounded-[5px] bg-white/10 p-2 transition-all duration-150 hover:cursor-pointer hover:bg-white/15"><a href=""><Image alt="facebook logo" src='/fb.png'  width={15} height={15} className="invert"/></a></span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-[0.9rem] text-white">QUICK LINKS</h4>
                        <ul className="flex flex-col gap-4 text-[0.75rem] text-white/70">
                            <li className="hover:text-white/85"><Link href="/products" onClick={(e)=>scrollToTop(e)}>All Products</Link></li>
                            <li className="hover:text-white/85"><Link href="">Flash Deals</Link></li>
                            <li className="hover:text-white/85"><Link href="">Track Order</Link></li>
                            <li className="hover:text-white/85"><Link href="">Delivery Partner</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-[0.9rem] text-white">CUSTOMER SERVICE</h4>
                        <ul className="flex flex-col gap-4 text-[0.75rem] text-white/70">
                            <li className="hover:text-white/85"><Link href="">My Account</Link></li>
                            <li className="hover:text-white/85"><Link href="order-history">Order History</Link></li>
                            <li className="hover:text-white/85"><Link href="/addresses">Addresses</Link></li>
                            <li className="hover:text-white/85"><Link href="/help">Help Center</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-[0.9rem] text-white">CONTACT US</h4>
                        <ul className="flex flex-col gap-4 text-[0.75rem] text-white/70">
                            <li className="flex items-center gap-3"><MapPin size={18}/> 123 Green Valley Rd, Portland</li>
                            <li className="flex items-center gap-3"><Phone size={18}/> +1(111) 123-456</li>
                            <li className="flex items-center gap-3"><Mail size={18}/>hello@example.com</li>
                        </ul>
                    </div>
                </div>
                <hr className="mx-auto mt-7 max-w-[1400px] border-white/20"></hr>
                <div className="mx-auto mt-3 flex max-w-[1400px] flex-col justify-between gap-2 text-center sm:flex-row sm:text-left">
                    <div className="text-[0.65rem] text-white/50">
                        © 2026 Greatstack. All rights reserved.
                    </div>
                    <div className="flex items-center justify-center gap-3 text-[0.65rem] text-white/50 sm:justify-end">
                        <span className="cursor-pointer hover:text-white/70"><a>Privacy Policy</a></span>
                        <span className="cursor-pointer hover:text-white/70"><a>Terms of Service</a></span>
                    </div>
                </div>
            </div>
    )}
   
}