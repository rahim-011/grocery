'use server'

import { Products } from "@prisma/client";
import { prisma } from "./prisma";



export  async function getProducts(limit:number|null,category:string|null) : Promise<Products[]>{
    try{
        const products = await prisma.products.findMany({
            ...(limit !== null ? {take:limit} : {} ),
            orderBy:{createdAt:'desc'},
            where:{
                isPopular : limit === null ? undefined : true,
                category:{
                    equals: category?.toLowerCase(),
                    mode:'insensitive'
                } 
            },
        })
        if (!products){
            return [];
        }
        return products; 
    }
    catch(error){
        console.log('Failed to fetch the products!',error)
        return [];
    }
}


export async function getProductById(productId:string):Promise<Products |null>{
    try{
        const product = await prisma.products.findUnique({
            where:{
                id:productId
            }
        })
        if (!product){
            return null
        }
        return product;
    }   
    catch(error){
        console.log('Failed to fetch the products!',error);
        return null
    }
}


export async function deleteProduct(productId:string){
    try{
        const ExistedProduct = await prisma.products.findUnique({
            where:{
                id:productId
            }
        })
        if (!ExistedProduct){
            return {error:'Product does not exist!',success:false}
        }
        await prisma.products.delete({
            where:{
                id:productId
            }
        })
        return {message:'Product has been deleted successfuly!',success:true}
    }
    catch(error){
        console.log(error);
        return {success:false,error:'Failed to delete the product!'}
    }
}