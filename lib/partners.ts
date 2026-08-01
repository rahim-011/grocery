"use server"


import { prisma } from "./prisma"


export async function getAllPartners(){
    try{
        const partners = await prisma.partner.findMany({
            include:{
                user:{
                    select:{
                        email:true,
                        name:true
                    }
                }
            }
        });
        return partners;
    }
    catch(error){
        console.log(error)
    }
}


export async function createPartnerProfile(phone:string,vehicleType:string,userId:string){
    try{
        await prisma.partner.create({
            data: {
                userId: userId,
                phone: phone,
                vehicleType: vehicleType,
            }
        })

        return {success:true}
    }
    catch(error){
        console.log(error)
    }
}

export async function updatePartnerStatus(partnerId:string){
    try{
        if (!partnerId){
            return {success:false}
        }
        const partner = await prisma.partner.findUnique({
            where:{
                id: partnerId
            }
        })
        if (!partner){
            return {success:false}
        }

        const updatedPartner = await prisma.partner.update({
            where:{
                id:partnerId
            },
            data:{
                isActive: !partner.isActive
            }

        })


        return {success:true,newStatus:updatedPartner.isActive}
    }
    catch(error){
        console.log(error)
        return {success:false}
    }
}