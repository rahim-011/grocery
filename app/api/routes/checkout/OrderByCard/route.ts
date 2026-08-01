import client from "@/lib/chargily";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request:Request){
    try{
        const body = await request.json();
        const {addressId,userId,cartProducts} = body;
        const allExisted = addressId && userId && cartProducts;
        if (!allExisted){
            return NextResponse.json({error:'All fields are required!'},{status:400});
        }
        if (cartProducts.length === 0){
            return NextResponse.json({error:"Looks like your cart is empty! Add some items to continue."})
        }

        const productIds = cartProducts.map((item:any) => item.product.id);
        const products = await prisma.products.findMany({
            where:{id:{in:productIds}}
        })

        if (productIds.length !== products.length){
            return NextResponse.json({error:'Some products are missing!'},{status:400})
        }

        const items = cartProducts.map((item:any) => {
            const product = products.find((p:any) => p.id === item.product.id);
            return {
                priceAtTime: product?.price,
                productId: item.product.id,
                quantity: item.quantity
            }
        })

        const totalAmount = items.reduce((acc:number,item:any) => {
            return acc + Number(item.quantity) * Number(item.priceAtTime)
        },0)

        const totalItems = items.reduce((acc:number,item:any) =>{
            return acc + Number(item.quantity)
        },0)

        const newOrder = await prisma.order.create({
            data:{
                totalAmount,
                totalItems,
                addressId,
                item:{
                    create:items
                },
                userId
            },
            include:{item:true}
        })
        const appBaseUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/+$/, '')
        const checkout = await client.createCheckout({
            amount:totalAmount,
            currency: 'dzd',
            webhook_endpoint: new URL('/api/routes/checkout/webhook', appBaseUrl).toString(),
            success_url: new URL('/checkout/success', appBaseUrl).toString(),
            failure_url: new URL('/checkout/failed', appBaseUrl).toString(),
            metadata:{orderId:newOrder.id}
        })

        return NextResponse.json({checkoutUrl: checkout.checkout_url})

    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}