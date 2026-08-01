import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"



export async function PUT(request:Request){
    try{
        const body = await request.json();
        const {orderId,newStatus} = body;
        const existedOrder = await prisma.order.findUnique({
            where:{
                id:orderId
            }
        });
        if (!existedOrder){
            return NextResponse.json({error:'Order does not exist'},{status:400})
        }
        if (existedOrder.status == newStatus){
            return NextResponse.json({error:'No changes made'},{status:400})
        }

        await prisma.order.update({
            where:{
                id: orderId
            },
            data:{
                status: newStatus
            }
        })
        return NextResponse.json({message:'Order status has been updated successfully'},{status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}