import { JSX } from "react/jsx-runtime";
import ShowProducts from "./ShowProducts";





export default async function PopularProducts():Promise<JSX.Element>{
    return(
        <div className="flex flex-col gap-4 p-3 mb-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-veg-green text-[1.3rem] font-bold">Popular Products</h2>
                <span className="text-black/50 text-[0.75rem]">Top-rated products this season</span>
            </div>
            <ShowProducts limit={10} category={null} mainProductId=""/>
        </div>
    )
}