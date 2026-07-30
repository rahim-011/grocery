import Link from "next/link"
import NewProductForm from "@/components/NewProductForm"
import { ArrowLeft } from "lucide-react"
import { getProductById } from "@/lib/products";
import { Products } from "@prisma/client";

export default async function EditProduct({params}:{params:Promise<{id:string}>})
{
    const {id} = await params;
    const product:Products|null = await getProductById(id);
    return(
        <div className="flex flex-col gap-5 border border-black/20 rounded-2xl text-[1.2rem]">
            <div className="flex items-center gap-2.5 border-b border-b-black/20 p-5">
                <Link className="p-2 rounded-[10px] bg-black/5 cursor-pointer hover:bg-black/10 transition-all" href="/admin/products"><ArrowLeft size={18}/></Link>
                <h2 className="font-semibold">Edit Product</h2>
            </div>
            <div className="p-5">
                    <NewProductForm operation={'edit'} product={product}/>
            </div>
    </div>

    )
}