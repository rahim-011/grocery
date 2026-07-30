'use client'


import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Footer(){

    const pathname = usePathname();

    const scrollToTop = (e:any) =>{
        e.preventDefault();
        if (window.location.pathname === pathname){
            window.scrollTo({top:0,behavior:'smooth'})
        }
    }
    const hideFooter = pathname.startsWith('/admin');
    const hideNavBar = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    if (!hideFooter && !hideNavBar){
        return(
            <div className="flex flex-col gap-4 bg-veg-green relative bottom-0 md:p-10 p-5 w-full mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white  flex gap-2 items-center"><Image alt='logo' src='/logo.png' width={20} height={20} /> Instacart</h4>
                        <p className="text-white/70 text-[0.75rem]">Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth's finest.</p>
                        <div className="flex items-center gap-4 ">
                            <span className="bg-white/10 p-2 rounded-[5px] hover:bg-white/2 transition-all ease-in hover:cursor-pointer duration-150"><a href=""><Image alt='instagram logo' src='/ig.png' width={15} height={15} className="invert"/></a></span>
                            <span className="bg-white/10 p-2 rounded-[5px] hover:bg-white/2 transition-all ease-in hover:cursor-pointer duration-150"><a href=""><Image alt="X logo" src='/x.png' width={15} height={15} className="invert"/></a></span>
                            <span className="bg-white/10 p-2 rounded-[5px] hover:bg-white/2 transition-all ease-in hover:cursor-pointer duration-150"><a href=""><Image alt="facebook logo" src='/fb.png'  width={15} height={15} className="invert"/></a></span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-white text-[0.9rem]">QUICK LINKS</h4>
                        <ul className="flex flex-col gap-4 text-white/70 text-[0.75rem]">
                            <li className="hover:text-white/85"><Link href="/products" onClick={(e)=>scrollToTop(e)}>All Products</Link></li>
                            <li className="hover:text-white/85"><Link href="">Flash Deals</Link></li>
                            <li className="hover:text-white/85"><Link href="">Track Order</Link></li>
                            <li className="hover:text-white/85"><Link href="">Delivery Partner</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-white text-[0.9rem]">CUSTOMER SERVICE</h4>
                        <ul className="flex flex-col gap-4 text-white/70 text-[0.75rem]">
                            <li className="hover:text-white/85"><Link href="">My Account</Link></li>
                            <li className="hover:text-white/85"><Link href="order-history">Order History</Link></li>
                            <li className="hover:text-white/85"><Link href="/addresses">Addresses</Link></li>
                            <li className="hover:text-white/85"><Link href="/help">Help Center</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h4 className="text-white text-[0.9rem]">CONTACT US</h4>
                        <ul className="flex flex-col gap-4 text-white/70 text-[0.75rem]">
                            <li className="flex items-center gap-3"><MapPin size={18}/> 123 Green Valley Rd, Portland</li>
                            <li className="flex items-center gap-3"><Phone size={18}/> +1(111) 123-456</li>
                            <li className="flex items-center gap-3"><Mail size={18}/>hello@example.com</li>
                        </ul>
                    </div>
                </div>
                <hr className="text-white/20 mt-7"></hr>
                <div className="flex justify-between items-center mt-3">
                    <div className="text-white/50 text-[0.65rem]">
                        © 2026 Greatstack. All rights reserved.
                    </div>
                    <div className="text-white/50 text-[0.65rem] flex items-center gap-3">
                        <span className="hover:text-white/70 cursor-pointer"><a>Privacy Policy</a></span>
                        <span className="hover:text-white/70 cursor-pointer"><a>Terms of Service</a></span>
                    </div>
                </div>
            </div>
    )}
   
}