import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export  async function POST(request:Request){
    try{
        const body = await request.json();
        const {label,streetAddress,city,state,zipCode,isDefault,userId} = body;
        const allExisted = label && streetAddress && city && zipCode  && state && userId;
        if (!allExisted){
            return NextResponse.json({error:'All fields are required!'},{status:400});
        }

        await prisma.address.create({
            data:{
                label:label,
                city:city,
                zipCode:zipCode,
                state:state,
                street:streetAddress,
                userId:userId,
                isDefault:isDefault
            }
        })

        return NextResponse.json({message:'Address added successfully!'},{status:201})
    }
    catch(error){
        return NextResponse.json({error:'Internal server error!'},{status:500})
    }
}