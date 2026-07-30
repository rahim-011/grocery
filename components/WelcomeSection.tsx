import Image from "next/image"

export default function WelcomeSide(){
    return(
        <div className="relative min-h-screen w-full p-4 flex flex-col items-center justify-center text-center text-white hidden md:flex">
            <Image
            src="/vegetables.webp"
            alt="Fresh organic vegetables background"
            fill
            priority
            sizes="(max-width: 768px)"
            className="object-cover "
            />
            <div className="absolute inset-0 bg-emerald-950/80 bg-blend-multiply" />
            <div className="relative z-10 max-w-2xl space-y-3">
            <h1 className="font-bold text-[1.8rem]">
                Welcome back to Instacart
            </h1>
            <p className="text-lg sm:text-xl font-serif text-white/60">
                Fresh groceries and organic produce,<br className="hidden sm:inline" />
                delivered to your doorstep.
            </p>
            </div>
        </div>
    )
}