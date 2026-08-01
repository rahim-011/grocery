import NewProductForm from "@/components/NewProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



export default function AddProduct(){
    return(
        <div className="flex flex-col gap-5 border border-black/20 rounded-2xl text-[1.2rem]">
            <div className="flex items-center gap-2.5 border-b border-b-black/20 p-5">
                <Link className="p-2 rounded-[10px] bg-black/5 cursor-pointer hover:bg-black/10 transition-all" href="/admin/products"><ArrowLeft size={18}/></Link>
                <h2 className="font-semibold">New Product</h2>
            </div>
            <div className="p-5">
                 <NewProductForm operation={"add"} product={null}/>
            </div>
        </div>
    )
}