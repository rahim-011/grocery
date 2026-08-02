import Image from "next/image"

export default function Categories(){
    const categories: Array<{ imageSrc: string; title: string }> = [{
        imageSrc:'/fruits_vegetables.png',
        title: 'Fruits &  Vegetables',
    },
    {
        imageSrc:'/personal_care.png',
        title: 'Personal Care',
    },
    {
        imageSrc:'/pantry_staples.png',
        title: 'Pantry Staples',
    },
    {
        imageSrc:'/bakery.png',
        title: 'Bakery',
    },
    {
        imageSrc:'/drinks.png',
        title: 'Beverages',
    },
    {
        imageSrc:'/snacks.png',
        title: 'Snacks',
    },
    {
        imageSrc:'/meat_seafood.png',
        title: 'Meat & Seafood',
    },
    {
        imageSrc:'/frozen_foods.png',
        title: 'Frozen Foods',
    },
    {
        imageSrc:'/baby_care.png',
        title: 'Baby Care',
    }
]
    return(
        <div className="my-8 flex flex-col gap-5 p-4 md:my-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-[1.3rem] font-bold text-veg-green">Browse Categories</h2>
                <span className="text-[0.75rem] text-black/50">Find exactly what you need using</span>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex items-center gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
                    <div className="md:animate-scroll flex min-w-max items-center gap-4 md:gap-5">
                        {[...categories,...categories,...categories].map((categorie,index)=>(
                            <div className="flex shrink-0 flex-col items-center gap-2.5" key={index}>
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50/40 p-3 transition-transform duration-200 hover:scale-105 sm:h-24 sm:w-24">
                                    <Image src={categorie.imageSrc} width='75' height='75' alt={categorie.title} className="object-contain"/>
                                </div>
                                <span className="max-w-[72px] text-center text-[0.62rem] text-black/70 sm:text-[0.65rem]">{categorie.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}