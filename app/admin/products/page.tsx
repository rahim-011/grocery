import { Plus } from "lucide-react"
import Link from "next/link"
import AdminProduct from "@/components/AdminProduct"
import { getProducts } from "@/lib/products"

export default async function AdminProducts():Promise<React.ReactNode>{
    const products = await getProducts(null);
    return(
        <div className="border border-black/20 rounded-2xl">
            <div className="p-5 border-b border-b-black/20 flex justify-between items-center">
                <h2 className="font-semibold text-[1.2rem]">Products</h2>
                <Link href='/admin/products/new' className="text-white font-semibold bg-veg-green rounded-[10px] p-2.5 flex items-center gap-2 text-[0.8rem] hover:brightness-115 transition-all"><Plus size={16}/>Add Product</Link>
            </div>
            <div className="text-black/50 font-semibold text-[0.85rem] p-5 grid grid-cols-[350px_1fr_auto] items-center">
                <div>PRODUCT</div>
                <div className="flex gap-24">
                    <span>PRICE</span>
                    <span>STOCK</span>
                </div>
                <div>ACTIONS</div>
            </div>
            <div>
                <AdminProduct products={products}/>
            </div>
        </div>
    )
}