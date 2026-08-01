import { NextResponse } from "next/server";
import crypto from 'crypto'
import { ChargilyWebhookEvent } from "@/lib/chargily";
import { prisma } from "@/lib/prisma";

export async function POST(request:Request){
    try{
        const rawBody = await request.text();
        const signature = request.headers.get('signature');
        const secret = process.env.CHARGILY_SECRET_KEY;

        const cumputedSignature = crypto.createHmac('sha256',secret??'').update(rawBody).digest('hex');
        if (cumputedSignature !== signature){
            return NextResponse.json({error:'Invalid signature'},{status:401})
        }

        const event:ChargilyWebhookEvent = JSON.parse(rawBody);
        const orderId = event.data.metadata?.orderId;
        if (!orderId){
            return NextResponse.json({error:'orderId is not found in the metadata!'},{status:400})
        }
        switch (event.type) {
            case 'checkout.paid' : {
                await prisma.$transaction(async (tx) =>{
                    const existingOrder = await tx.order.findUnique({
                        where:{ id: orderId }
                    });
                    if (!existingOrder){
                        throw new Error('Order not found')
                    }
                    const orderItems = await tx.orderItem.findMany({
                        where: { orderId: orderId },
                        select: {
                            quantity: true,
                            productId: true
                        }
                    });

                    await tx.order.update({
                        where:{
                            id: orderId
                        },
                        data:{
                            status: 'confirmed'
                        }
                    });

                    for (const item of orderItems){
                        await tx.products.update({
                            where:{
                                id: item.productId
                            },
                            data:{
                                stock:{
                                    decrement:item.quantity
                                }
                            }
                        })
                    }
                })
                

                break;
            }
            case 'checkout.failed':{
                break;
            }
        }
        return NextResponse.json({received:true},{status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}