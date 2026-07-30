import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary'

export  async function POST(request:Request){
    try{
        const body = await request.json();
        const {name,category,price,originalPrice,unit,stock,image,description,organic} = body;
        const existedProduct= await prisma.products.findFirst({
            where:{
                title:{
                    equals:name.toLowerCase(),
                    mode:'insensitive'
                }
            }
        })
        if (existedProduct){
            return NextResponse.json({message:'Product already existed!'},{status:400})
        }
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        let imageSrc = "";
        if (body.image){
            const upload  = await cloudinary.uploader.upload(image,{folder:'Products'})
            imageSrc = upload.secure_url;
        }

        const randomId = crypto.randomUUID();
        const newProduct = await prisma.products.create({
            data:
                {title:name,category:category,price:price,organic:organic,oldPrice:originalPrice,imageSrc:imageSrc,description:description,unit:unit,stock:stock,id:randomId}
        })

        return NextResponse.json({message:'Product created successfuly!',product:newProduct},{status:201})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}