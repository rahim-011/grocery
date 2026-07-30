import { Categorie } from "@/.next/types/definitons"
import Image from "next/image"

export default function Categories(){
    const categories : Categorie[] = [{
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
        <div className="flex flex-col gap-6 my-10 p-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-veg-green text-[1.3rem] font-bold">Browse Categories</h2>
                <span className="text-black/50 text-[0.75rem]">Find exactly what you need using</span>
            </div>
            <div className="relative overflow-hidden w-full p-3">
                <div className="flex items-center gap-5 w-full scrollbar-none animate-scroll ">
                    {[...categories,...categories,...categories].map((categorie,index)=>(
                        <div className="flex flex-col items-center gap-2.5 flex-shrink-0" key={index}>
                            <div className="p-3 rounded-3xl bg-emerald-50/40 hover:scale-105 cursor-pointer transition-transform duration-200 w-24 h-24 flex">
                                <Image src={categorie.imageSrc} width='75' height='75' alt={categorie.title} className="object-contain"/>
                            </div>
                            <span className="text-[0.65rem] text-black/70">{categorie.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}