'use server'


import { prisma } from "./prisma"



export default async function getUserAddresses(id:string){
    try{
        if (!id){
            return []
        }
        return await prisma.address.findMany({
            where:{
                userId:id
            }
        });
    }
    catch(error){
        console.log(error)
    }
}


export  async function getAddressById(id:string|undefined){
    try{
        if (!id){
            return;
        }
        const address = await prisma.address.findUnique({
            where:{
                id:id
            }
        })
        if (!address){
            return
        }
        return address;
    }
    catch(error){
        console.log(error)
    }
}


export async function deleteAddressById(id:string){
    try{
        if (!id){
            return {success:false,error:'Id does not exist'}
        }
        const address = await prisma.address.findUnique({
            where:{id:id}
        })
        if (!address){
            return {success:false,error:'Address does not exist!'}
        }
        await prisma.address.delete({
            where:{id:id}
        })

        return {success:true,message:'Address has been deleted successfuly!'}
    }
    catch(error){
        console.log(error)
    }
}