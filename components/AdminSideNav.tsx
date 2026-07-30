'use client'


import { cn } from "@/lib/utils"
import { LayoutDashboard,Plus,PackageSearch,ShoppingBag,Truck,SquareArrowRightExit, Shield} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"


export default function AdminSideNav(){
    interface NavLinks {
        title: string,
        link:string,
        icon:React.ReactNode
    }
    const navLinks: NavLinks[] = [
        { title: 'Dashboard', link: '/admin', icon: <LayoutDashboard size={17} /> },
        { title: 'Add Product', link: '/admin/products/new', icon: <Plus size={17} /> },
        { title: 'Products', link: '/admin/products', icon: <PackageSearch size={17} /> },
        { title: 'Orders', link: '/admin/orders', icon: <ShoppingBag size={17} /> },
        { title: 'Delivery Partners', link: '/admin/delivery-partners', icon: <Truck size={17} /> },
        { title: 'Exit', link: '/', icon: <SquareArrowRightExit size={17} /> }, 
];

    const pathname = usePathname();
     
    return(
        <div className="flex flex-col gap-4 border-black/15 rounded-2xl w-[25%] border max-h-90 sticky top-24">
            <div className="flex items-center gap-2 p-5 border-b border-black/20">
                <span className="text-green-900 "><Shield size={20}/></span>
                <h1 className="text-veg-green font-bold">Admin Panel</h1>
            </div>
            
            <div className="p-3">
                <nav>
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((navLink,index)=>{
                            const selectedClass = cn(navLink.link === pathname ? 'bg-veg-green text-white': 'bg-white text-black/50 hover:text-black/75')
                            return(
                                <Link key={index} className={`flex items-center gap-3 text-black/50 p-2 rounded-[10px] text-[0.85rem]  transition-all ${selectedClass}`} href={navLink.link}>
                                <span>{navLink.icon}</span>
                                <span>{navLink.title}</span>
                                    </Link>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}