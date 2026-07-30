import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";



export async function PUT(request:Request){
    try{
        const body  = await request.json();
        console.log(body)
        const {name,originalPrice,price,image,category,unit,stock,id,description,organic} = body;
        const ExistedProduct = await prisma.products.findUnique({
            where:{
                id:id
            }
        })
        if (!ExistedProduct){
            return NextResponse.json({message:'Product does not exist'},{status:400})
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })

        let imageSrc = ExistedProduct.imageSrc;
        if (image){
            const upload  = cloudinary.uploader.upload(image,{folder:'Products'})
            imageSrc = (await upload).secure_url
        }

        
        await prisma.products.update({
            where:{
                id:id
            },
            data:{
                title:name,
                category:category,
                unit:unit,
                imageSrc:imageSrc,
                stock:stock,
                organic:organic,
                description:description,
                price:price,
                oldPrice:originalPrice
            }
        })
        return NextResponse.json({message:'Product infos has been updated successfuly'},{status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}