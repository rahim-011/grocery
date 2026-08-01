import { prisma } from "./prisma"
import { AdminOrderRecord, UserOrder } from "./types"

export async function getUserOrders(id:string): Promise<UserOrder[]>{
    try{
        if (!id){
            return []
        }
        const userOrders = await prisma.order.findMany({
            where:{
                userId:id,
            },
            include:{
                item: {
                    include:{
                        product:{
                            select:{
                                imageSrc:true,
                                title:true
                            }
                        }
                    }
                }
            },
            orderBy: {createdAt:'desc'}
        })
        if (!userOrders){
            return []
        }
        const formattedOrders: UserOrder[] = userOrders.map(order =>({
            ...order,
            createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : '',
            updatedAt: order.updatedAt ? new Date(order.updatedAt).toISOString() : '',
            totalAmount: order.totalAmount ? Number(order.totalAmount) : 0,
            totalItems: order.totalItems ? Number(order.totalItems) : 0,
            item: order.item.map(i => ({
                ...i,
                priceAtTime : i.priceAtTime ? Number(i.priceAtTime) : 0
            }))
        }))
        return formattedOrders;
    }
    catch(error){
        console.log(error)
        return []
    }
}


export async function getOrderById(orderId:string){
    try{
        if (!orderId){
            return []
        }

        const order = await prisma.order.findUnique({
            where:{
                id:orderId
            },
            include:{
                item:{
                    include:{
                        product:true
                    }
                }
            }
        })
        if (!order){
            return []
        }

       

        return {...order,
                createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : '',
                status : order.status ?  String(order.status) : ''
            }
    }
    catch(error){
        console.log(error)
        return []
    }
}




export async function getOrders(): Promise<AdminOrderRecord[]>{
    try{
        const orders  = await prisma.order.findMany({
            include:{
                user:{
                    select:{
                        email:true,
                        name:true,
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        if (!orders){
            return []
        }
        const formattedOrders: AdminOrderRecord[] = orders.map(order => ({
            ...order,
            createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : '',
            updatedAt: order.updatedAt ? new Date(order.updatedAt).toISOString() : '',
            status : order.status ? String(order.status) : '',
            totalAmount: order.totalAmount ? Number(order.totalAmount)  : 0,
            totalItems: order.totalItems ? Number(order.totalItems) : 0,
            name: order.user.name,
            email: order.user.email,
            user: order.user,
            item: [],
        }))
        return formattedOrders
    }
    catch(error){
        console.log(error);
        return []
    }
}

