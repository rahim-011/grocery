import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function POST(request:Request){
    try{
        const body = await request.json();
        const {userId,cartProducts,addressId}   = body;
        const allExisted =   userId && cartProducts && addressId ;
        if (!allExisted){
            return NextResponse.json({error:'All fields are required!'},{status:400})
        }
        if (cartProducts.length === 0){
            return NextResponse.json({error:"Looks like your cart is empty! Add some items to continue."},{status:404})
        }
        const productIds = cartProducts.map((item:any) => item.product.id);
        const products = await prisma.products.findMany({
            where:{id:{in:productIds}}
        });

        if (productIds.length !== products.length){
            return NextResponse.json({error:'Some products are missing!'},{status:400})
        }

        const items = cartProducts.map((item:any) => {
            const product = products.find((p:any)=> p.id === item.product.id);
            return {
                productId: item.product.id,
                quantity: item.quantity,
                priceAtTime: product?.price
            }
        })
        const totalAmount = items.reduce((acc: number, item: any)=>{
            return acc + Number(item.priceAtTime) * item.quantity;
        }, 0);

        const totalItems = items.reduce((acc: number, item:any)=>{
            return acc + Number(item.quantity)
        },0)
        await prisma.order.create({
            data:{
                totalItems,
                userId,
                item:{
                    create: items
                },
                totalAmount,
                addressId
            },
            include:{item:true}
        })

        return NextResponse.json({message:'Your order has been placed successfully'},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}