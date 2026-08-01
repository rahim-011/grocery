import { ArrowRight, Clock, Leaf, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ebGarmond } from "@/app/layout"

export default function Hero(){
    return(
        <div className="flex flex-col gap-6 w-full md:gap-8">
            <div className="relative w-full overflow-hidden rounded-[28px] min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex items-center p-5 sm:p-7 lg:p-10">
                <Image alt="hero-img" fill src='/vegetables.webp' priority className="object-cover z-0"/>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f2414]/90 via-[#0f2414]/75 to-transparent z-10" />
                <div className="relative z-20 flex w-full max-w-[650px] flex-col gap-5 sm:gap-6">
                    <div className="flex items-center gap-2 self-start rounded-3xl bg-orange-300/10 px-2.5 py-1 text-orange-300">
                        <Leaf size={14}/>
                        <span className="text-[0.68rem] font-bold sm:text-[0.75rem]">Farm-Fresh & Organic</span>
                    </div>
                    <h1 className={`max-w-[340px] text-4xl leading-[1.05] text-white sm:max-w-[420px] sm:text-5xl lg:max-w-[580px] lg:text-[5rem] ${ebGarmond.className}`}>
                        Nourish your home with <span className="text-orange-300">Earth&apos;s finest</span>
                    </h1>
                    <p className="max-w-[420px] text-[0.78rem] leading-6 text-white/70 sm:text-[0.85rem] lg:text-[0.95rem]">Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.</p>
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                        <Link href='/products' className="flex items-center justify-center gap-1 rounded-3xl bg-orange-400 px-5 py-3 text-[0.8rem] font-medium text-white transition-all duration-150 hover:bg-orange-400/70 sm:text-[0.9rem]">Shop Now <ArrowRight size={15}/></Link>
                        <Link href='/products' className="flex items-center justify-center rounded-3xl border border-white/15 bg-white/10 px-5 py-3 text-[0.8rem] font-medium text-white transition-all duration-150 hover:bg-white/20 sm:text-[0.9rem]">Browse Categories</Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-black/20 bg-white p-4 text-veg-green sm:grid-cols-2 lg:grid-cols-4">
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