import { prisma } from "./prisma"




export async function getStatistics() {
    try{
        const [totalUsers,totalOrders,totalProducts,outOfStock] = await Promise.all([
            prisma.user.count({
                where:{
                    role:'user'
                }
            }),
            prisma.products.count(),
            prisma.order.count(),
            prisma.products.count({
                where:{
                    stock: 0
                }
            })
        ]);

        return {success:true,totalOrders,totalProducts,totalUsers,outOfStock}
    }
    catch(error){
        console.log(error)
    }
}