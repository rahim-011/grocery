import { ArrowBigRight, ArrowRight, Clock, Leaf, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ebGarmond } from "@/app/layout"

export default function Hero(){
    return(
        <div className="flex flex-col gap-8 w-full">
            <div className="relative w-full rounded-3xl overflow-hidden min-h-[480px] flex items-center lg:p-10 md:p-7 p-5">
                <Image alt="hero-img" fill src='/vegetables.webp' priority className="object-cover z-0"/>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f2414]/90 via-[#0f2414]/75 to-transparent z-10" />
                <div className="flex flex-col gap-6 p-8 md:w-2/3 relative  z-20">
                    <div className="text-orange-300 bg-orange-300/10 px-2.5 py-1 rounded-3xl flex items-center gap-2 self-start">
                        <Leaf size={14}/>
                        <span className="text-[0.7rem] font-bold">Farm-Fresh & Organic</span>
                    </div>
                    <h1 className={`text-white md:text-5xl text-4xl leading-10 md:leading-14 ${ebGarmond.className}`}>Nourish your home with <span className="text-orange-300">Earth's finest</span></h1>
                    <p className="text-white/70 max-w-[450px] text-[0.8rem] md:text-[0.9rem] leading-6">Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.</p>
                    <div className="flex items-center gap-2 text-white text-[0.8rem] md:text-[0.9rem] whitespace-nowrap ">
                        <Link href='/products' className="flex items-center gap-1 bg-orange-400 rounded-3xl py-3 px-5 transition-all ease-in duration-150 hover:bg-orange-400/70">Shop Now <ArrowRight size={15}/></Link>
                        <Link href='/products' className="border border-white/15 py-3 px-5 rounded-3xl bg-white/10 hover:bg-white/20 transition-all ease-in duration-150">Browse Categories</Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 text-veg-green p-5 border border-black/20 rounded-2xl gap-3">
                <div className="flex items-center gap-4" >
                    <div><Truck size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-[0.8rem] font-medium">Free Delivery</span>
                        <span className="text-[0.65rem] text-black/50">Orders over $20</span>
                    </div>
                </div>
                <div className="flex items-center gap-4" >
                    <div><Clock size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-[0.8rem] font-medium">Same Day</span>
                        <span className="text-[0.65rem] text-black/50">Express delivery</span>
                    </div>
                </div>
                <div className="flex items-center gap-4" >
                    <div><ShieldCheck size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-[0.8rem] font-medium">Secure Pay</span>
                        <span className="text-[0.65rem] text-black/50">Safe checkout</span>
                    </div>
                </div>
                <div className="flex items-center gap-4" >
                    <div><Leaf size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-[0.8rem] font-medium">100% Organic</span>
                        <span className="text-[0.65rem] text-black/50">Certified products</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}