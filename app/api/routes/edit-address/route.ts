import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";





export async function PUT(request:Request){
    try{
        const body = await request.json();
        const {city,label,state,zipCode,streetAddress,isDefault,userId,addressId} = body;

        const existedAddress = await prisma.address.findUnique({
            where:{
                id:addressId
            }
        })
        if (!existedAddress){
            return NextResponse.json({error:'Address does not exist!'},{status:400})
        }

        const isSame = 
            existedAddress.label === label && 
            existedAddress.city  === city  && 
            existedAddress.state  === state  && 
            existedAddress.zipCode  === zipCode  && 
            existedAddress.street  === streetAddress  && 
            existedAddress.isDefault === isDefault;
        if (isSame){
            return NextResponse.json({message:'No changes were made.'},{status:200})
        }

        await prisma.address.update({
            where:{id:addressId},
            data:{
                label:label,
                city:city,
                zipCode:zipCode,
                state:state,
                street:streetAddress,
                isDefault:isDefault,
            }
        })

        return NextResponse.json({message:'Address has been updated successfuly'},{status:200})
    }
    catch(error){
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}